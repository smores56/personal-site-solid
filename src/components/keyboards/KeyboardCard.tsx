import { Keyboard } from "~/models";

export default function KeyboardCard(props: { keyboard: Keyboard }) {
  return (
    <article>
      <header>
        <a href={props.keyboard.link}>{props.keyboard.name}</a>
      </header>

      <img class="img-responsive" src={props.keyboard.imageUrl} alt="macOS Sierra" />
      <p>{props.keyboard.description}</p>
    </article>
  );
}
