export interface Recipe {
  id: string;
  title: string;
  name?: string;
  description: string;
  ingredients: { [key: string]: string };
  instructions: string[] | { [key: string]: string };
  day?: string;
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

export enum Days {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday'
}

export interface Schedule {
  [Days.Monday]: Recipe[];
  [Days.Tuesday]: Recipe[];
  [Days.Wednesday]: Recipe[];
  [Days.Thursday]: Recipe[];
  [Days.Friday]: Recipe[];
  [Days.Saturday]: Recipe[];
  [Days.Sunday]: Recipe[];
}
