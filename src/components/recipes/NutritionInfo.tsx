import { Show } from "solid-js";
import { z } from "zod";
import { Nutrition } from "~/models";

export default function NutritionInfo(props: { nutrition: z.infer<typeof Nutrition> }) {
  return (
    <>
      <h4>Nutrition:</h4>
      <table style:line-height={0.5}>
        <tbody>
          <Show when={props.nutrition.servings} keyed>
            {servings => (
              <tr>
                <td>Servings</td>
                <td>{servings}</td>
              </tr>
            )}
          </Show>
          <Show when={props.nutrition.servingSize} keyed>
            {servingSize => (
              <tr>
                <td>Serving Size</td>
                <td>{servingSize}</td>
              </tr>
            )}
          </Show>
          <Show when={props.nutrition.calories} keyed>
            {calories => (
              <tr>
                <td>Calories</td>
                <td>{calories} cal</td>
              </tr>
            )}
          </Show>
          <Show when={props.nutrition.carbs} keyed>
            {carbs => (
              <tr>
                <td>Carbs</td>
                <td>{carbs} g</td>
              </tr>
            )}
          </Show>
          <Show when={props.nutrition.fiber} keyed>
            {fiber => (
              <tr>
                <td>Fiber</td>
                <td>{fiber} g</td>
              </tr>
            )}
          </Show>
          <Show when={props.nutrition.netCarbs} keyed>
            {netCarbs => (
              <tr>
                <td>Net Carbs</td>
                <td>{netCarbs} g</td>
              </tr>
            )}
          </Show>
          <Show when={props.nutrition.fat} keyed>
            {fat => (
              <tr>
                <td>Fat</td>
                <td>{fat} g</td>
              </tr>
            )}
          </Show>
          <Show when={props.nutrition.protein} keyed>
            {protein => (
              <tr>
                <td>Protein</td>
                <td>{protein} g</td>
              </tr>
            )}
          </Show>
        </tbody>
      </table>
    </>
  );
}
