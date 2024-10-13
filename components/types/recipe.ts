// Parent interface for a recipe
export interface Recipe {
  id: string;
  name: string;
  title: string;
  description: string;
  ingredients: Ingredient[];
  instructions: { instruction: string }[];
  prepTime: number;
  cookTime: number;
  servings: number;
}

// Individual ingredients in the recipe
export interface Ingredient {
  name: string;
  quantity: number;
  measure: string;
}

