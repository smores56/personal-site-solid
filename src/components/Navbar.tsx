import { For, createEffect, createSignal } from "solid-js";
import { A, useIsRouting } from "solid-start";

import BurgerIcon from "~/components/icons/BurgerIcon";

export default function Navbar() {
  const isRouting = useIsRouting();
  const [menuOpen, setMenuOpen] = createSignal(false);

  const links: [string, string][] = [
    ["Keyboards", "/keyboards"],
    ["Sudoku", "/sudoku"],
    ["Recipes", "/recipes"]
  ];

  // Close burger on navigation
  createEffect(() => {
    if (isRouting()) {
      console.log("Routing!");
      setMenuOpen(false);
    }
  });

  return (
    <div class="navbar">
      <div class="flex-1">
        <A href="/" class="btn btn-ghost normal-case text-xl">
          Sam Mohr
        </A>
      </div>
      <div class="flex-none">
        <div
          class="dropdown dropdown-end bg-base-100 md:hidden"
          classList={{ "dropdown-open": menuOpen() }}
        >
          <label
            class="btn btn-ghost m-1"
            onclick={() => setMenuOpen(open => !open)}
            onfocusout={() => setMenuOpen(false)}
          >
            <BurgerIcon />
          </label>
          <ul
            onfocusout={() => setMenuOpen(false)}
            onmouseleave={() => setMenuOpen(false)}
            class="dropdown-content bg-base-100 menu p-2 shadow rounded-box w-52"
          >
            <For each={links}>
              {([name, path]) => (
                <li><A href={path}>{name}</A></li>
              )}
            </For>
          </ul>
        </div>

        <ul class="menu menu-horizontal px-1 max-md:hidden">
          <For each={links}>
            {([name, path]) => (
              <li><A href={path}>{name}</A></li>
            )}
          </For>
        </ul>
      </div>
    </div >
  );
}
