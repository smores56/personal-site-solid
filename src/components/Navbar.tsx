import { A } from "@solidjs/router";

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <A href="/">
            <strong>Sam Mohr</strong>
          </A>
        </li>
      </ul>
      <ul>
        <li><A href="/keyboards">Keyboards</A></li>
        <li><A href="/reviews">Reviews</A></li>
        <li><A href="/recipes">Recipes</A></li>
      </ul>
    </nav>
  );
}
