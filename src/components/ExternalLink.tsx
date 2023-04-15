import { ParentProps } from "solid-js";

export interface ExternalLinkProps {
  href: string;
  class?: string;
}

export default function ExternalLink(props: ParentProps<ExternalLinkProps>) {
  return (
    <a
      href={props.href}
      class={props.class}
      target="_blank"
      rel="noreferrer noopener"
    >
      {props.children}
    </a>
  );
}