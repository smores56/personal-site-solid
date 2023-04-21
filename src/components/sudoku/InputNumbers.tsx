import { For, ParentProps } from "solid-js";
import EraseIcon from "../icons/EraseIcon";

export interface InputNumbersProps {
  clickNumber: (num: number) => void;
  clearSquare: () => void;
}

export default function InputNumbers(props: InputNumbersProps) {
  const oneToNine = Array.from({ length: 9 }, (_, index) => index + 1);

  return (
    <div class="sudoku-board">
      <div class="flex flex-row place-content-around">
        <For each={oneToNine}>
          {num => (
            <InputSquare onclick={() => props.clickNumber(num)}>
              {num}
            </InputSquare>
          )}
        </For>
        <InputSquare onclick={props.clearSquare}>
          <EraseIcon />
        </InputSquare>
      </div>
    </div>
  );
}

interface InputSquareProps {
  onclick: () => void;
}

function InputSquare(props: ParentProps<InputSquareProps>) {
  return (
    <div
      onclick={props.onclick}
      class="flex-1 font-bold text-center align-middle border-2 border-t-4 border-b-4
             first:border-l-4 last:border-r-4 text-5xl border-primary"
    >
      <b>{props.children}</b>
    </div>
  )
}
