import { Title, useRouteData, useSearchParams } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { createMemo, createSignal, For, Show } from "solid-js";
import { createMutable } from "solid-js/store";
import { z } from "zod";

import { Recipe } from "~/models";
import { toggleInList } from "~/utils";
import { getAllRecipes } from "~/lib/recipes";

import RemoteData from "~/components/RemoteData";
import RecipeCard from "~/components/recipes/RecipeCard";
import FilterRecipes from "~/components/recipes/FilterRecipes";
import Hero from "~/components/Hero";

export function routeData() {
  return createServerData$(getAllRecipes);
}

export default function Recipes() {
  const recipes = useRouteData<typeof routeData>();

  const [searchParams, setSearchParams] = useSearchParams();
  const params = createMutable({
    get name(): string {
      return searchParams?.name || "";
    },
    set name(name: string) {
      setSearchParams({ ...searchParams, name: name || undefined });
    },
    get tags() {
      return searchParams?.tags?.split(",") || [] as string[];
    },
    set tags(tags: string[]) {
      setSearchParams({ ...searchParams, tags: tags.length > 0 ? tags.join(",") : undefined });
    },
  })

  const allTags = createMemo(() => [
    ...new Set((recipes() || [])
      .flatMap(recipe => recipe.tags || [] as string[]))
  ].sort((t1, t2) => t1.localeCompare(t2)));

  function toggleTag(tag: string) {
    params.tags = toggleInList(params.tags, tag);
  }

  return (
    <main>
      <Title>S'mores Recipes</Title>
      <Hero title="My Recipes">
        <p class="py-6">
          Between a book full of family recipes and my ever-growing rotation
          of Keto-friendly recipes, I needed somewhere to keep these that I
          could access from anywhere. With the power of YAML files and
          my home server, I can now check the ingredients on my phone at
          Trader Joe's before I check out, and you can, too!
        </p>

        <FilterRecipes
          allTags={allTags()}
          params={params}
          toggleTag={toggleTag}
        />
      </Hero>

      <div class="container max-w-2xl mx-auto">
        <RemoteData data={recipes}>
          {(recipes) => (
            <LoadedRecipes
              recipes={recipes}
              allTags={allTags()}
              params={params}
              toggleTag={toggleTag}
            />
          )}
        </RemoteData>
      </div>
    </main>
  );
}

interface LoadedRecipesProps {
  recipes: z.infer<typeof Recipe>[];
  allTags: string[];
  toggleTag: (tag: string) => void;
  params: {
    name: string;
    tags: string[];
  }
}

function LoadedRecipes(props: LoadedRecipesProps) {
  const [expandedRecipes, setExpandedRecipes] = createSignal([] as string[]);
  function toggleRecipeExpanded(recipeName: string) {
    setExpandedRecipes(expanded => toggleInList(expanded, recipeName));
  }

  const visibleRecipes = createMemo(() =>
    (props.recipes || []).filter(
      (recipe) => recipe.name.toLowerCase().includes(props.params.name?.toLowerCase() || '') &&
        props.params.tags.every((t) => recipe.tags.includes(t))
    )
  );

  return (
    <Show
      when={visibleRecipes().length > 0}
      fallback={<NoRecipes queryFilled={!!props.params.name || props.params.tags.length > 0} />}
    >
      <h3 class="text-center font-bold">
        {`${visibleRecipes().length} recipe${visibleRecipes().length === 1 ? '' : 's'} `}
        found:
      </h3>

      <div class="m-4">
        <For each={visibleRecipes()}>
          {(recipe, index) =>
            <RecipeCard
              recipe={recipe}
              recipeIndex={index()}
              toggleTag={props.toggleTag}
              selectedTags={props.params.tags}
              expanded={expandedRecipes().includes(recipe.name)}
              toggleExpanded={() => toggleRecipeExpanded(recipe.name)}
            />
          }
        </For>
      </div>
    </Show >
  );
}

function NoRecipes(props: { queryFilled: boolean }) {
  return (
    <p class="text-center">
      <i>
        <Show when={props.queryFilled} fallback={"No recipes available."}>
          No recipes found for the given query.
        </Show>
      </i>
    </p>
  );
}
