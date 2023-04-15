import { Keyboard } from "~/models";
import GitHubIcon from "~/components/icons/GitHubIcon";
import ExternalLink from "~/components/ExternalLink";

export default function KeyboardCard(props: { keyboard: Keyboard }) {
  return (
    <div class="card lg:card-side bg-neutral shadow-xl m-4">
      <figure class="lg:basis-2/3">
        <img src={props.keyboard.imageUrl} alt={props.keyboard.name} />
      </figure>
      <div class="card-body lg:basis-1/3">
        <h1 class="card-title">{props.keyboard.name}</h1>

        <p>{props.keyboard.description}</p>
        <div class="card-actions justify-end">
          <ExternalLink
            href={props.keyboard.link}
            class="btn btn-primary"
          >
            <span class="mr-2">On GitHub</span>
            <GitHubIcon />
          </ExternalLink>
        </div>
      </div>
    </div>
  );
}
