import { For } from "solid-js";

interface TagListProps {
  tags: string[];
  selected: string[];
  toggleTag: (tag: string) => void;
  // rightAlign?: boolean; TODO
}

// ul.tags li {
//   margin-top: 2px;
//   margin-bottom: 2px;
// }

// ul.tags li:hover {
//   cursor: pointer;
//   background: #aeaeae;
// }

// ul.tags li.tag-green:hover {
//   cursor: pointer;
//   background: #6ccf70;
// }

// ul.tags.right {
//   justify-content: end;
// }

export default function TagList(props: TagListProps) {
  return (
    <span style={{"line-height": 2}}>
      <For each={props.tags}>
        {tag => (
          <kbd
            classList={{primary: props.selected.includes(tag)}}
            style={{"margin-right": "5px"}}
            onClick={event => {
              event.stopPropagation();
              props.toggleTag(tag);
            }}
          >
            {tag}
          </kbd>
        )}
      </For>
    </span>
  );
}
