import { Title } from "solid-start";
import Hero from "~/components/Hero";

import SudokuGame from "~/components/sudoku/SudokuGame";

export default function Sudoku() {
  return (
    <main>
      <Title>S'moresdoku</Title>
      <Hero title="Sudoku">
        <p class="pt-6">
          I think that Sudoku needs no explanation. It was fun to implement this
          all by myself, and writing it in TypeScript made my life pretty easy
          There are 100 random puzzles of varying difficulty, so just hit the
          "New Game" button and have at it!
        </p>
      </Hero>

      <SudokuGame />
    </main >
  );
}
