import { z } from "zod";

export const Ingredient = z.object({
  item: z.string(),
  quantity: z.optional(z.string()),
  notes: z.optional(z.string()),
  optional: z.optional(z.boolean()),
  substitutes: z.optional(z.array(z.string()))
})

export const Ingredients = z.array(Ingredient).or(z.map(z.string(), z.array(Ingredient)));

export const Nutrition = z.object({
  servings: z.optional(z.number()),
  servingSize: z.optional(z.string()),
  calories: z.optional(z.number()),
  fat: z.optional(z.number()),
  netCarbs: z.optional(z.number()),
  protein: z.optional(z.number()),
  carbs: z.optional(z.number()),
  fiber: z.optional(z.number())
})

export const Recipe = z.object({
  name: z.string(),
  notes: z.optional(z.string()),
  tags: z.array(z.string()),
  image: z.optional(z.string()),
  links: z.optional(z.array(z.string())),
  steps: z.array(z.string()),
  ingredients: Ingredients,
  nutrition: z.optional(Nutrition)
})

export const Review = z.object({
  title: z.string(),
  year: z.number(),
  link: z.string(),
  rating: z.optional(z.number()),
  review: z.optional(z.string())
})

export const Reviews = z.array(Review).or(Review);

export interface Keyboard {
  name: string;
  link: string;
  imageUrl: string;
  description: string;
}

export interface ReviewParams {
  title?: string;
  year?: number;
  minRating?: number;
  reviewed?: boolean;
  pageNumber?: number;
}

export interface RecipeParams {
  name?: string;
  tags?: string[];
}

export interface SudokuSquareState {
  expected: number;
  current: SudokuSquareValue;
}

export type SudokuSquareValue =
  | { type: "pre-filled" }
  | { type: "empty" }
  | { type: "filled"; value: number };

export interface Coordinates {
  x: number;
  y: number;
}

export interface Timing {
  started: Date | null;
  finished: Date | null;
}
