// Parent interface for a recipe
export interface Recipe {
  id: string;
  name: string;
  title: string;
  description: string;
  ingredients: Ingredient[];
  instructions: Step[];
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

// Instructions, broken out into steps so we can style it fancy later
export interface Step {
  order: number;
  instruction: string;
}