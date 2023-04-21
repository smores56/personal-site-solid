import { randomPuzzle } from "~/lib/starters";
import { mapSquareAtCoords, coordsAreEqual, emptyBoard } from "~/utils";
import { createEffect, createMemo, createSignal, onCleanup } from "solid-js";

import type {
  SudokuSquareState,
  Coordinates,
  Timing,
} from "~/models";

import SudokuControls from "~/components/sudoku/SudokuControls";
import InputNumbers from "~/components/sudoku/InputNumbers";
import SudokuBoard from "~/components/sudoku/SudokuBoard";

export default function SudokuGame() {
  const [squares, setSquares] = createSignal<SudokuSquareState[] | null>(randomPuzzle());
  const [selected, setSelected] = createSignal<Coordinates | null>(null);
  const [showMistakes, setShowMistakes] = createSignal(false);
  const [timing, setTiming] = createSignal<Timing>({ started: new Date(), finished: null });
  const [now, setNow] = createSignal(new Date());

  createEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    onCleanup(() => clearInterval(interval));
  });

  const elapsedTime = createMemo(() => {
    const t = timing();
    if (!t.started) return "0:00";

    const ending = t.finished || now();
    const seconds = Math.floor(
      (ending.getTime() - t.started.getTime()) / 1000
    );
    return `${Math.floor(seconds / 60)}:${(seconds % 60)
      .toString()
      .padStart(2, "0")}`;
  });

  function handleKeydown(event: KeyboardEvent) {
    const num = parseInt(event.key);
    if (num && num >= 1 && num <= 9) {
      inputNumber(num);
    } else if (event.key === "r") {
      setSelected(null);
    } else if (event.key === "c") {
      clearSquare();
    } else if (event.key === "m") {
      setShowMistakes(show => !show);
    }
  }

  createEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    onCleanup(() => document.removeEventListener("keydown", handleKeydown));
  });

  const gameIsBeat = createMemo(() => {
    const sqs = squares();
    if (!sqs) return false;

    return sqs.every(sq => {
      return sq.current.type === "pre-filled" ||
        (sq.current.type === "filled" && sq.current.value === sq.expected);
    });
  });

  function pickNewPuzzle() {
    setSquares(randomPuzzle());
    setTiming({ started: now(), finished: null });
  }

  function clickSquare(coords: Coordinates) {
    if (!squares() || gameIsBeat()) return;

    const sel = selected();
    if (sel && coordsAreEqual(sel, coords)) {
      setSelected(null);
    } else {
      setSelected(coords);
    }
  }

  function clearSquare() {
    const sel = selected();
    const sqs = squares();
    if (!sel || !sqs) return;

    setSquares(mapSquareAtCoords(sel, sqs, (square) =>
      square.current.type === "filled" ?
        { ...square, current: { type: "empty" } } :
        square
    ));
    setSelected(null);
  }

  function inputNumber(num: number) {
    const sel = selected();
    const sqs = squares();
    if (!sel || !sqs || gameIsBeat()) return;

    setSquares(mapSquareAtCoords(sel, sqs, (square) =>
      square.current.type !== "pre-filled"
        ? { ...square, current: { type: "filled", value: num } }
        : square
    ));
    setSelected(null);

    if (gameIsBeat()) {
      setTiming(t => ({ ...t, finished: now() }));
    }
  }

  return (
    <div class="container mx-auto max-w-lg px-2 pt-2">
      <div>
        <SudokuBoard
          squares={squares() || emptyBoard}
          selected={selected()}
          showMistakes={showMistakes()}
          clickSquare={clickSquare}
        />
        <br />
        <InputNumbers clickNumber={inputNumber} clearSquare={clearSquare} />
      </div>
      <div class="flex flex-row justify-evenly w-full p-6">
        <div class="align-center basis-4/12 space-between h-full flex flex-col">
          <p class="text-center text-5xl" classList={{ "text-success": !!timing().finished }}>
            {elapsedTime()}
          </p>
          <div class="form-control py-4">
            <label class="label cursor-pointer">
              <span class="label-text">Show Mistakes</span>
              <input
                type="checkbox"
                class="toggle"
                checked={showMistakes()}
                oninput={() => setShowMistakes(sm => !sm)}
              />
            </label>
          </div>
          <div class="form-control">
            <button class="btn align-right" onclick={pickNewPuzzle}>
              New Game
            </button>
          </div>
        </div>
        <div class="flex-end">
          <SudokuControls />
        </div>
      </div>
    </div>
  );
}
