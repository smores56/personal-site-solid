import { For } from "solid-js";
import { Title } from "solid-start";
import KeyboardCard from "~/components/keyboards/KeyboardCard";
import { ALL_KEYBOARDS } from "~/data";

export default function Home() {
  return (
    <>
      <Title>S'mores Boards</Title>
      <h1 class="text-center">S'mores Boards</h1>
      <div class="grid">
        <div>
          <For each={ALL_KEYBOARDS.slice(0, ALL_KEYBOARDS.length / 2)}>
            {(keyboard) => <KeyboardCard keyboard={keyboard} />}
          </For>
        </div>
        <div>
          <For each={ALL_KEYBOARDS.slice(ALL_KEYBOARDS.length / 2)}>
            {(keyboard) => <KeyboardCard keyboard={keyboard} />}
          </For>
        </div>
      </div>
    </>
  );
}
