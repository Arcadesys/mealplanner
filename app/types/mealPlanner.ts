export interface Recipe {
  id: string;
  title: string;
  name?: string;
  description?: string;
  ingredients?: { [key: string]: string };
  instructions?: string[];
  user_id?: string;
}

export interface Ingredient {
  name: string;
  quantity: number;
  measure: string;
}

export interface MealPlanRequest {
  breakfasts: number;
  lunches: number;
  dinners: number;
  snacks: number;
  leftovers: boolean;
  ingredientsToUse: string;
  ingredientsToAvoid: string;
  dietaryRestrictions: string;
  recipes: string;
  availableIngredients: string;
  cookingTools: string;
  otherCookingTools?: string;
  cookingMood: string;
}
