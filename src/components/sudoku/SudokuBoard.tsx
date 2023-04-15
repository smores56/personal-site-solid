import { For, createMemo } from "solid-js";
import { zipBoardWithCoords } from "~/utils";
import { Coordinates, SudokuSquareState } from "~/models";

import SudokuSquare from "~/components/sudoku/SudokuSquare";

// .sudoku-row:nth-child(4),
//   .sudoku-row:nth-child(7) {
//   border-top: 2px solid black;
// }

// .sudoku-row:nth-child(3),
//   .sudoku-row:nth-child(6) {
//   border-bottom: 2px solid black;
// }

// .sudoku-row:nth-child(1) {
//   border-top: 4px solid black;
// }

// .sudoku-row:nth-child(9) {
//   border-bottom: 4px solid black;
// }

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
                   first:border-t-4 last:border-b-4"
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
