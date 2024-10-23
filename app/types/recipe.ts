// Parent interface for a recipe
export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string | { [key: string]: string };  // Allow both string and object format
  instructions: string | string[];
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

