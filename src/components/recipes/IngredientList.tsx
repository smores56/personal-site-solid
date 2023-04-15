import { For } from "solid-js";
import { z } from "zod";
import { Ingredients } from "~/models";
import IngredientListItem from "./IngredientListItem";

export default function IngredientList(props: { ingredients: z.infer<typeof Ingredients> }) {
  const ingredients = props.ingredients;

  return ingredients instanceof Map ? (
    <For each={[...ingredients.entries()]}>
      {([group, ingredients]) => (
        <>
          <h5>For the {group}:</h5>
          <For each={ingredients}>
            {ingredient => <IngredientListItem ingredient={ingredient} />}
          </For>
        </>
      )}
    </For>
  ) : (
    <ul>
      <For each={ingredients}>
        {ingredient => <IngredientListItem ingredient={ingredient} />}
      </For>
    </ul>
  );
}
