import TagList from "~/components/recipes/TagList";

interface FilterRecipeProps {
  allTags: string[];
  toggleTag: (tag: string) => void;
  params: {
    name: string;
    tags: string[];
  };
}

export default function FilterRecipe(props: FilterRecipeProps) {
  return (
    <fieldset>
      <div class="form-control w-full">
        <label class="input-group text-center">
          <span class="bg-primary text-base-100">Name</span>
          <input
            type="text"
            placeholder="Meatball Mania"
            class="input input-bordered w-full"
            value={props.params.name || ""}
            onInput={(event) => props.params.name = event.currentTarget.value}
          />
        </label>
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text w-full">Filter By Tag</span>
        </label>
        <TagList
          tags={props.allTags}
          selected={props.params.tags}
          toggleTag={props.toggleTag}
        />
      </div>
    </fieldset>
  );
}
