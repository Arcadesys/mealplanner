import { Recipe } from './recipe';
import { Days } from './day';

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
}
