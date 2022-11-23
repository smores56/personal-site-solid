import { For, Show } from "solid-js"
import { Recipe } from "~/models";
import { z } from "zod";
import TagList from "../TagList";
import IngredientList from "./IngredientList";
import NutritionInfo from "./NutritionInfo";

interface RecipeCardProps {
  recipe: z.infer<typeof Recipe>;
  selectedTags: string[];
  toggleTag: (tag: string) => void;
  expanded: boolean;
  toggleExpanded: () => void;
}

export default function RecipeCard(props: RecipeCardProps) {
  return (
    <details open={props.expanded}>
      <summary>
        {props.recipe.name}
        
        <span style={{"padding-left": "10px"}}>
          <TagList
            rightAlign={true}
            tags={props.recipe.tags}
            selected={props.selectedTags}
            toggle={props.toggleTag}
          />
        </span>
      </summary>

      <div class="panel-body align-left">
        <Show when={props.recipe.image} keyed>
          {(image) => (
            <section class="recipe-image">
              <img src={image} alt="preview of the dish" />
            </section>
          )}
        </Show>

        <h4>Ingredients:</h4>
        <IngredientList ingredients={props.recipe.ingredients} />

        <h4>Steps:</h4>
        <ol>
          <For each={props.recipe.steps || []}>
            {step => <li>{step}</li>}
          </For>
        </ol>

        <Show when={props.recipe.nutrition} keyed>
          {nutrition => <NutritionInfo nutrition={nutrition} />}
        </Show>

        <Show when={props.recipe.links?.length}>
          <h4>Links:</h4>
          <ul>
            <For each={props.recipe.links || []}>
              {link => <li>
                <a href={link}>{link}</a>
              </li>}
            </For>
          </ul>
        </Show>
      </div>
    </details>
  );
}
