import { For } from "solid-js";

export interface TagListProps {
  tags: string[];
  selected: string[];
  toggleTag: (tag: string) => void;
  rightAlign?: boolean;
}

export default function TagList(props: TagListProps) {
  return (
    <div classList={{ "flex-end": props.rightAlign }}>
      <For each={props.tags}>
        {tag => (
          <button
            onclick={() => props.toggleTag(tag)}
            class={`btn btn-xs m-1 z-10
                   ${props.selected.includes(tag) ? "btn-primary" : "btn-outline"}`}
          >
            {tag}
          </button>

        )}
      </For>
    </div>
  );
}
