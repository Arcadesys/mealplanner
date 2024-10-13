import { Recipe } from './recipe';
  
  export interface DayColumnProps {
    day: string;
    recipes: Recipe[];
  }
  
  export interface Schedule {
    Monday: Recipe[];
    Tuesday: Recipe[];
    Wednesday: Recipe[];
    Thursday: Recipe[];
    Friday: Recipe[];
    Saturday: Recipe[];
    Sunday: Recipe[];
  }