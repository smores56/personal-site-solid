import CopyIcon from "./icons/CopyIcon";

type CopyButtonProps = {
  content: string
}

export default function CopyButton(props: CopyButtonProps) {
  return (
    <button
      class="btn btn-square btn-sm"
      onclick={() => navigator.clipboard.writeText(props.content)}
    >
      <div data-tip="copy" class="tooltip tooltip-left tooltip-accent">
        <CopyIcon />
      </div >
    </button>
  );
}
