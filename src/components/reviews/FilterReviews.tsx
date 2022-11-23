import { ReviewParams } from "~/models";

interface FilterReviewsProps {
  params: ReviewParams;
  setParams: (update: Partial<ReviewParams>) => void;
}

export default function FilterReviews(props: FilterReviewsProps) {
  return (
    <fieldset>
      <legend>Filter Reviews</legend>
      <div class="form-control-group">
        <div class="form-control grow-3x">
          <label>By Title
            <input
              type="text"
              placeholder="Shrek"
              value={props.params.title || ""}
              onInput={(event) => props.setParams({title: event.currentTarget.value})} />
          </label>
        </div>
        <div class="form-control">
          <label>Reviewed?</label>
          { props.params.reviewed === undefined ? (
            <button onClick={() => props.setParams({ reviewed: true })}>All Movies</button>
          ) : props.params.reviewed ? (
            <button onClick={() => props.setParams({ reviewed: false })}>Only Reviewed</button>
          ) : (
            <button onClick={() => props.setParams({ reviewed: undefined })}>Only Unreviewed</button>
          )}
        </div>
      </div>
      <div class="form-control-group">
        <div class="form-control">
          <label>By Release Year
            <input
              type="number"
              placeholder="2099"
              value={props.params.year}
              onInput={(event) => props.setParams({year: parseInt(event.currentTarget.value) || null})} />
          </label>
        </div>
        <div class="form-control">
          <label>By Minimum Rating
            <input
              type="number"
              min="0"
              max="10"
              placeholder="6/10"
              value={props.params.minRating}
              onInput={(event) => props.setParams({minRating: parseInt(event.currentTarget.value) || undefined})} />
          </label>
        </div>
      </div>
    </fieldset>
  );
}
