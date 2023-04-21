import { For, Show } from "solid-js"
import { Recipe } from "~/models";
import { z } from "zod";

import TagList from "~/components/recipes/TagList";
import IngredientList from "~/components/recipes/IngredientList";
import NutritionInfo from "~/components/recipes/NutritionInfo";

interface RecipeCardProps {
  recipe: z.infer<typeof Recipe>;
  recipeIndex: number;
  selectedTags: string[];
  toggleTag: (tag: string) => void;
  expanded: boolean;
  toggleExpanded: () => void;
}

export default function RecipeCard(props: RecipeCardProps) {
  // <div class="accordion" classList={{active: props.expanded}}>
  return (
    <div class="collapse border-2 border-primary border-b-0 first:rounded-t-lg last:rounded-b-lg last:border-b-2">
      <input type="checkbox" />
      <div class="collapse-title text-xl w-full font-medium flex content-between pr-2">
        <div class="flex-1">
          {props.recipe.name}
        </div>

        <TagList
          tags={props.recipe.tags}
          selected={props.selectedTags}
          toggleTag={props.toggleTag}
        />
      </div>

      <div class="collapse-content prose">
        <h4>Ingredients:</h4>
        <IngredientList ingredients={props.recipe.ingredients} />

        <h4>Steps:</h4>
        <ol class="list-decimal">
          <For each={props.recipe.steps || []}>
            {step => <li>{step}</li>}
          </For>
        </ol>

        <Show when={props.recipe.links?.length}>
          <h4>Links:</h4>
          <ul class="list-disc">
            <For each={props.recipe.links || []}>
              {link => <li>
                <a href={link}>{link}</a>
              </li>}
            </For>
          </ul>
        </Show>

        <Show when={props.recipe.nutrition} keyed>
          {nutrition => <NutritionInfo nutrition={nutrition} />}
        </Show>
      </div>
    </div>
  );
}
