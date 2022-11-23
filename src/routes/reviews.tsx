import { z } from "zod";
import glob from "fast-glob";
import * as yaml from "js-yaml";
import { readFile } from "fs/promises";
import { Title, useRouteData, useSearchParams } from "solid-start";
import { Accessor, createMemo, For, Show } from "solid-js";
import { createServerData$ } from "solid-start/server";

import { parseBool } from "~/utils";
import { Review, Reviews, ReviewParams } from "~/models";
import { PAGE_SIZE, REVIEWS_DIR } from "~/data";

import ProgressBar from "~/components/ProgressBar";
import ReviewCard from "~/components/reviews/ReviewCard";
import PageControls from "~/components/reviews/PageControls";
import FilterReviews from "~/components/reviews/FilterReviews";

async function getAllReviews(): Promise<z.infer<typeof Review>[]> {
  const paths = await glob(`${REVIEWS_DIR}/**/*.yml`);
  const all_reviews = [] as z.infer<typeof Review>[];

  for (const path of paths) {
    try {
      const yamlData = await readFile(path, "utf8");
      const data = yaml.load(yamlData);
      const reviews = Reviews.parse(data);

      if ('length' in reviews) {
        all_reviews.push(...reviews);
      } else {
        all_reviews.push(reviews);
      }
    } catch (error) {
      console.log(`Failed to read data at ${path}: ${error}`);
    }
  }

  return all_reviews.sort((r1, r2) => {
    if (r1.year !== r2.year) {
      return (r2.year || 0) - (r1.year || 0);
    }

    return (r1.title || '').localeCompare(r2.title || '');
  });
}

export function routeData() {
  return {
    reviews: createServerData$(async () => await getAllReviews())
  };
}

function filterReview(review: z.infer<typeof Review>, params: ReviewParams): boolean {
  const reviewed = 
        (params.reviewed !== undefined
          ? params.reviewed === (review.rating !== null)
          : true);
  const minRating = true;
        (params.minRating !== undefined
          ? (review.rating !== null || review.review !== null) &&
            params.minRating <= review.rating
          : true);
  const title = (review.title || '').includes(params.title || '');
  const year = (params.year ? review.year === params.year : true);
  
  return reviewed && minRating && title && year;
}

export default function ReviewsPage() {
  const { reviews } = useRouteData<typeof routeData>();
  const [searchParams, setSearchParams] = useSearchParams();

  const params: Accessor<ReviewParams> = createMemo(() => ({
    title: searchParams?.title,
    year: parseInt(searchParams?.year) || undefined,
    pageNumber: parseInt(searchParams?.year) || undefined,
    minRating: parseInt(searchParams?.minRating) || undefined,
    reviewed: parseBool(searchParams?.reviewed)
  }))

  function setParams(update: Partial<ReviewParams>) {
    const updatedParams = { ...params(), ...update };
    setSearchParams({
      title: updatedParams.title,
      year: updatedParams.year?.toString(),
      minRating: updatedParams.minRating?.toString(),
      reviewed: updatedParams.reviewed?.toString()
    })
  }

  const noResults = createMemo(() => params().title || params().reviewed !== undefined || params().year || params().minRating);
  const visibleReviews = createMemo(() => (reviews() || []).filter(review => filterReview(review, params())));

  const pageCount = createMemo(() => Math.ceil(visibleReviews().length / PAGE_SIZE));
  const pageNumber = createMemo(() => Math.min(pageCount(), Math.max(1, params().pageNumber || 1)));
  const shownReviews = createMemo(() => visibleReviews().slice((pageNumber() - 1) * PAGE_SIZE, pageNumber() * PAGE_SIZE));

  function goToPage(page: number) {
    setParams({ pageNumber: page > 1 ? page : undefined })
  }

  return (
    <main>
      <Title>S'mores Boards</Title>
      <div class="container">
        <div class="col align-center">
          <h1>Reviews</h1>
          <section>
            <Show when={reviews()} fallback={<ProgressBar />}>
              <p>
                What GeoCities page would be complete without brash public opinions?
                Here you'll find a rolling list of (mostly) everything I've watched
                and remembered well enough to opine on, as well as (mostly)
                everything that I haven't seen but would like to at some point. If
                there's something missing from here, {" "}
                <a href="mailto:sam@mohr.codes">let me know</a>
                {" "} that you wanna know what I think and I can throw a dart at the
                proverbial board, so to say.
              </p>
              <FilterReviews params={params()} setParams={setParams} />

              {visibleReviews().length ? (
                <div>
                  <strong>
                    <Show when={pageCount() > 1}>
                      showing reviews
                      {(pageNumber() - 1) * PAGE_SIZE + 1}
                      to
                      {Math.min(pageNumber() * PAGE_SIZE, visibleReviews().length)}
                      of
                    </Show>
                    {`${visibleReviews().length} review${visibleReviews().length === 1 ? '' : 's'} `}
                    found:
                  </strong>
                  <br />
                  <br />

                  <Show when={pageCount() > 1}>
                    <PageControls
                      pageCount={pageCount()}
                      pageNumber={pageNumber()}
                      goToPage={goToPage}
                    />
                  </Show>
                  <For each={shownReviews()}>
                    {review => <ReviewCard review={review} />}
                  </For>
                  <Show when={pageCount() > 1}>
                    <div style={{"margin-top": "25px"}}>
                      <PageControls
                        pageCount={pageCount()}
                        pageNumber={pageNumber()}
                        goToPage={(page) => {
                          goToPage(page);
                          setTimeout(() => {
                            window.scrollTo(0, document.body.scrollHeight);
                          }, 10);
                        }} />
                    </div>
                  </Show>
                </div>
              ) : (
                <p>
                  <i>
                    <Show when={noResults()} fallback="No reviews available.">
                      No reviews found for the given query.
                    </Show>
                  </i>
                </p>
              )}
            </Show>
          </section>
        </div>
      </div>
    </main>
  );
}
