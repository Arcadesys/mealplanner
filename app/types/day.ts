import { Recipe } from './mealPlanner';

export enum Days {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday'
}

export interface DayColumnProps {
  day: string;
  recipes: Recipe[];
}

export interface Schedule {
  [Days.Monday]: Recipe[];
  [Days.Tuesday]: Recipe[];
  [Days.Wednesday]: Recipe[];
  [Days.Thursday]: Recipe[];
  [Days.Friday]: Recipe[];
  [Days.Saturday]: Recipe[];
  [Days.Sunday]: Recipe[];
  [key: string]: Recipe[];  // Add this line
}
