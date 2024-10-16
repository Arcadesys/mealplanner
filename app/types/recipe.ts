// Parent interface for a recipe
export interface Recipe {
  id: string;
  name: string;
  title: string;
  description: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  prepTime: number;
  cookTime: number;
  servings: number;
  helpings?: number; // New property
}

// Individual instructions in the recipe
export interface Instruction {
  instruction: string;
  order: number; // Add this line
}

// Individual ingredients in the recipe
export interface Ingredient {
  name: string;
  quantity: number;
  measure: string;
}

