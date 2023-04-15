import { JSX, Match, Resource, Signal, Switch } from "solid-js";
import ProgressBar from "./ProgressBar";
import ErrorHero from "./ErrorHero";

export interface RemoteDataProps<T> {
  data: Resource<T>;
  loading?: Signal<Element>;
  error?: Signal<Element>;
  children: (data: NonNullable<T>) => JSX.Element;
}

export default function RemoteData<T>(props: RemoteDataProps<T>) {
  return (
    <Switch>
      <Match when={props.data.loading}>
        <ProgressBar />
      </Match>
      <Match when={props.data.error}>
        <ErrorHero />
      </Match>
      <Match when={props.data()} keyed>
        {(data) => props.children(data)}
      </Match>
    </Switch>
  )
}