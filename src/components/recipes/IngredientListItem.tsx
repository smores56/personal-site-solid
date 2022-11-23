import { Ingredient } from "~/models";
import { z } from "zod";
import { Show } from "solid-js";

export default function IngredientListItem(props: { ingredient: z.infer<typeof Ingredient> }) {
  return (
    <li>
      {props.ingredient.item}
      <Show when={props.ingredient.quantity} keyed>
        {quantity => `- ${quantity}`}
      </Show>
      <Show when={props.ingredient.optional}>
        <i> (optional) </i>
      </Show>
      <Show when={props.ingredient.notes} keyed>
        {notes => (
          <i> ({notes}) </i>
        )}
      </Show>
      <Show when={props.ingredient.substitutes} keyed>
        {substitutes => (
          <i> [can substitute with {substitutes.join(' / ')}] </i>
        )}
      </Show>
    </li>
  );
}

