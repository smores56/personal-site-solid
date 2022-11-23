import { createMemo, For, Show } from "solid-js";
import { z } from "zod";
import { Review } from "~/models";


export default function ReviewCard(props: { review: z.infer<typeof Review> }) {
  const starsClass = createMemo(() => `stars-container tooltip stars-${
    Math.round(props.review.rating * 2) * 5
  }`);

  return (
    <article>
      <header>
        <Show when={props.review.link} keyed fallback={props.review.title}>
          {link => (
            <a class="title-link" href={link}>
              {props.review.title}
            </a>
          )}
        </Show>

        <Show when={props.review.year} keyed>
          {year => ` (${year})`}
        </Show>

        <Show when={props.review.rating} keyed>
          {rating => (
            <span class={starsClass()} data-tooltip={`${rating} out of 10`} style={{"float": "right"}}>
              ★★★★★★★★★★
            </span>
          )}
        </Show>
      </header>
      
      <Show
        when={props.review.rating !== null || props.review.review}
        fallback={<i>Not yet rated</i>}
      >
        <Show when={props.review.review} keyed>
          {review => (
            <For each={review.split(/\n/).filter(line => line)}>
              {line => <p>{line}</p>}
            </For>
          )}
        </Show>
      </Show>
    </article>
  );
}
