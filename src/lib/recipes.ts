import { z } from "zod";
import yaml from "js-yaml";
import glob from "fast-glob";
import { readFile } from "fs/promises";

import { RECIPES_DIR } from "~/data";
import { Recipe } from "~/models";

export async function getAllRecipes(): Promise<z.infer<typeof Recipe>[]> {
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
      console.log(`Failed to read data at ${path}`);
    }
  }
  
  return recipes.sort((r1, r2) => (r1.name || '').localeCompare(r2.name || ''));
}
