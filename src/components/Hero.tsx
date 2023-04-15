import { ParentProps } from "solid-js";

export interface HeroProps {
  title: string;
}

export default function Hero(props: ParentProps<HeroProps>) {
  return (
    <div class="hero">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">{props.title}</h1>
          {props.children}
        </div>
      </div>
    </div>
  );
}
