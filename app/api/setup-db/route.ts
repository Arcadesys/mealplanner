import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; // Assuming you have a db connection setup
import { Recipe, Ingredient, MealPlanRequest, Days, Schedule } from '@/app/types/mealPlanner';

export async function GET() {
  try {
    console.log('Starting database setup...');
    await createTables();
    console.log('Database setup completed successfully');
    return NextResponse.json({ message: 'Database setup complete' });
  } catch (error) {
    console.error('Error setting up database:', error);
    return NextResponse.json({ error: 'Failed to set up database' }, { status: 500 });
  }
}

async function createTables() {
  await db.schema
    .createTable('recipes')
    .ifNotExists()
    .addColumn('id', 'string', (col) => col.primaryKey())
    .addColumn('title', 'string')
    .addColumn('name', 'string', (col) => col.nullable())
    .addColumn('description', 'text')
    .addColumn('ingredients', 'json')
    .addColumn('instructions', 'json')
    .addColumn('day', 'string', (col) => col.nullable())
    .execute();

  await db.schema
    .createTable('meal_plan_requests')
    .ifNotExists()
    .addColumn('id', 'increments', (col) => col.primaryKey())
    .addColumn('breakfasts', 'integer')
    .addColumn('lunches', 'integer')
    .addColumn('dinners', 'integer')
    .addColumn('snacks', 'integer')
    .addColumn('leftovers', 'boolean')
    .addColumn('ingredientsToUse', 'text')
    .addColumn('ingredientsToAvoid', 'text')
    .addColumn('dietaryRestrictions', 'text')
    .addColumn('recipes', 'text')
    .addColumn('availableIngredients', 'text')
    .addColumn('cookingTools', 'text')
    .addColumn('otherCookingTools', 'text', (col) => col.nullable())
    .addColumn('cookingMood', 'string')
    .execute();

  // You might want to add more tables for other types if needed

  console.log('Tables created successfully');
}
