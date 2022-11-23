import { z } from "zod";
import glob from "fast-glob";
import * as yaml from "js-yaml";
import { readFile } from "fs/promises";
import { createServerData$ } from "solid-start/server";
import { Title, useRouteData, useSearchParams } from "solid-start";
import { Accessor, createMemo, createSignal, For, Show } from "solid-js";

import { RECIPES_DIR } from "~/data";
import { toggleInList } from "~/utils";
import { Recipe, RecipeParams } from "~/models";

import ProgressBar from "~/components/ProgressBar";
import RecipeCard from "~/components/recipes/RecipeCard";
import FilterRecipes from "~/components/recipes/FilterRecipes";

async function getAllRecipes(): Promise<z.infer<typeof Recipe>[]> {
  const paths = await glob(`${RECIPES_DIR}/**/*.yml`);
  const recipes = [] as z.infer<typeof Recipe>[];

  for (const path of paths) {
    try {
      const yamlData = await readFile(path, "utf8");
      const data = yaml.load(yamlData);
      const recipe = Recipe.parse(data);
      recipes.push(recipe);
    } catch (error) {
      // console.log(`Failed to read data at ${path}: ${error}`);
    }
  }
  
  return recipes.sort((r1, r2) => (r1.name || '').localeCompare(r2.name || ''));
}

export function routeData() {
  return {
    recipes: createServerData$(async () => await getAllRecipes())
  };
}

export default function Recipes() {
  const { recipes } = useRouteData<typeof routeData>()
  const [searchParams, setSearchParams] = useSearchParams();
  const [expandedRecipes, setExpandedRecipes] = createSignal([] as string[]);

  const params: Accessor<RecipeParams> = createMemo(() => ({
    name: searchParams?.name,
    tags: searchParams?.tags?.split(',')
  }))

  function setParams(update: Partial<RecipeParams>) {
    const updatedParams = { ...params(), ...update };
    setSearchParams({
      name: updatedParams.name,
      tags: updatedParams.tags?.join(',')
    })
  }

  const selectedTags = createMemo(() => params().tags || [] as string[]);
  const queryFilled = createMemo(() => !!(params().name || params().tags));
  const allTags = createMemo(() => [
    ...new Set((recipes() || []).flatMap(recipe => recipe.tags || [] as string[]))
  ].sort((t1, t2) => t1.localeCompare(t2)));
  const visibleRecipes = createMemo(() => (recipes() || []).filter(
    (recipe) => recipe.name.toLowerCase().includes(params().name?.toLowerCase() || '') &&
      selectedTags().every((t) => recipe.tags.includes(t))));

  function toggleTag(tag: string) {
    setParams({ tags: toggleInList(selectedTags(), tag) })
  }

  function toggleRecipeExpanded(recipeName: string) {
    setExpandedRecipes(expanded => toggleInList(expanded, recipeName));
  }

  return (
    <main>
      <Title>My Recipes</Title>
      <div class="container">
        <h1 class="text-center">Recipes</h1>
        <div class="row">
          <div class="col align-center">
            <h1>Recipes</h1>
            <section>
              <Show when={recipes()} fallback={<ProgressBar />}>
                <p>
                  Between a book full of family recipes and my ever-growing rotation
                  of Keto-friendly recipes, I needed somewhere to keep these that I
                  could access from anywhere. With the power of YAML files and
                  GraphQL, I can now check the ingredients on my phone at Trader Joe's
                  before I check out, and you can, too!
                </p>
                <FilterRecipes
                  allTags={allTags()}
                  params={params()}
                  setParams={setParams}
                  toggleTag={toggleTag}
                />
                {visibleRecipes().length > 0 ? (
                  <div>
                    <strong>
                      {`${visibleRecipes().length} recipe${visibleRecipes().length === 1 ? '' : 's'} `}
                      found:
                    </strong>
                    <For each={visibleRecipes()}>
                      {recipe => 
                        <RecipeCard
                          recipe={recipe}
                          toggleTag={toggleTag}
                          selectedTags={selectedTags()}
                          expanded={expandedRecipes().includes(recipe.name)}
                          toggleExpanded={() => toggleRecipeExpanded(recipe.name)}
                        />
                      }
                    </For>
                  </div>
                ) : (
                  <p>
                    <i>
                      {queryFilled() ? "No recipes found for the given query." : "No recipes available."}
                    </i>
                  </p>
                )}
              </Show>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
