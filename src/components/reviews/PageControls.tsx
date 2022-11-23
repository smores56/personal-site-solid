import { Show } from "solid-js";

interface PageControlsProps {
  pageNumber: number;
  pageCount: number;
  goToPage: (page: number) => void;
}

export default function PageControls(props: PageControlsProps) {
  return (
    <nav aria-label="breadcrumb">
      <ul>
        <li>
          <a
            class={props.pageNumber === 1 ? 'active' : ''}
            onClick={() => props.goToPage(1)}>First</a>
        </li>
        <Show when={props.pageNumber > 1}>
          <li>
            <a onClick={() => props.goToPage(props.pageNumber - 1)}>
              {props.pageNumber - 1}
            </a>
          </li>
        </Show>
        <li><a class="active">{props.pageNumber}</a></li>
        <Show when={props.pageNumber < props.pageCount}>
          <li>
            <a onClick={() => props.goToPage(props.pageNumber + 1)}>
              {props.pageNumber + 1}
            </a>
          </li>
        </Show>
        <li>
          <a
            class={props.pageNumber === props.pageCount ? 'active' : ''}
            onClick={() => props.goToPage(props.pageCount)}>Last</a>
        </li>
      </ul>
    </nav>
  );
}
