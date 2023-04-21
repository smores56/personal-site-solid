import { createMemo } from "solid-js";
import { coordsAreEqual } from "~/utils";
import type { SudokuSquareState, Coordinates } from "~/models";

export interface SudokuSquareProps {
  square: SudokuSquareState;
  coords: Coordinates;
  selected: Coordinates | null;
  showMistakes: boolean;
  clickSquare: (coords: Coordinates) => void;
}

export default function SudokuSquare(props: SudokuSquareProps) {
  const visiblyWrong = createMemo(() =>
    props.square.current.type === "filled" &&
    props.square.current.value !== props.square.expected &&
    props.showMistakes
  );
  const isSelected = createMemo(() =>
    props.selected &&
    coordsAreEqual(props.selected, props.coords)
  );
  const backgroundColor = createMemo(() =>
    props.square.current.type === "pre-filled"
      ? "bg-neutral"
      : visiblyWrong()
        ? isSelected()
          ? "bg-secondary"
          : "bg-error"
        : isSelected()
          ? "bg-base-200"
          : undefined
  );

  return (
    <div
      onclick={() => props.clickSquare(props.coords)}
      class={
        `flex-1 font-bold text-5xl text-center align-middle border-x border-primary
         [&:nth-child(4)]:border-l-2 [&:nth-child(7)]:border-l-2
         [&:nth-child(3)]:border-r-2 [&:nth-child(6)]:border-r-2
         first:border-l-4 last:border-r-4 ${backgroundColor()}`
      }
    >
      {props.square.current.type === "pre-filled" ? (
        props.square.expected
      ) : props.square.current.type === "filled" ? (
        props.square.current.value
      ) : ""}
    </div>
  );
}
