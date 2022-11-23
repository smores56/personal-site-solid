import { RecipeParams } from "~/models";
import TagList from "../TagList";

interface FilterRecipeProps {
  allTags: string[];
  params: RecipeParams;
  setParams: (update: Partial<RecipeParams>) => void;
  toggleTag: (tag: string) => void;
}

export default function FilterRecipe(props: FilterRecipeProps) {
  return (
    <fieldset>
      <legend>Filter Recipes</legend>
      <div class="form-control">
        <label>By Name
          <input
            type="text"
            placeholder="Meatball Mania"
            value={props.params.name || ""}
            onInput={(event) => props.setParams({ name: event.currentTarget.value })}
          />
        </label>
      </div>
      <div class="form-control">
        <label>By Tag</label>
        <TagList tags={props.allTags} selected={props.params.tags || []} toggleTag={props.toggleTag} />
      </div>
    </fieldset>
  );
}
