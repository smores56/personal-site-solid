import { For, createMemo } from "solid-js";
import { zipBoardWithCoords } from "~/utils";
import { Coordinates, SudokuSquareState } from "~/models";

import SudokuSquare from "~/components/sudoku/SudokuSquare";

export interface SudokuBoardProps {
  squares: SudokuSquareState[];
  selected: Coordinates | null;
  showMistakes: boolean;
  clickSquare: (coords: Coordinates) => void;
}

export default function SudokuBoard(props: SudokuBoardProps) {
  const oneToNine = Array.from({ length: 9 }, (_, index) => index);
  const coordSquarePairs = createMemo(() => zipBoardWithCoords(props.squares));
  const rows = createMemo(() => oneToNine.map((rowIndex) =>
    coordSquarePairs().slice(rowIndex * 9, rowIndex * 9 + 9)
  ));

  return (
    <div class="w-full items-center border-collapse align-middle relative">
      <For each={rows()}>
        {row => (
          <div
            class="flex flex-row justify-around border-t border-b
                   first:border-t-4 last:border-b-4 border-primary
                   [&:nth-child(4)]:border-t-2 [&:nth-child(7)]:border-t-2
                   [&:nth-child(3)]:border-b-2 [&:nth-child(6)]:border-b-2"
          >
            <For each={row}>
              {sq => (
                <SudokuSquare
                  square={sq.square}
                  coords={sq.coords}
                  selected={props.selected}
                  showMistakes={props.showMistakes}
                  clickSquare={props.clickSquare}
                />
              )}
            </For>
          </div>
        )}
      </For>
    </div>
  );
}
