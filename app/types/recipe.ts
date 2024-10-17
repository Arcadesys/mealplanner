// Parent interface for a recipe
export interface Recipe {
  id: string;
  title: string;
  name?: string; // Optional quick add name
  description: string;
  ingredients: { [key: string]: string };
  instructions: string[] | { [key: string]: string };
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

