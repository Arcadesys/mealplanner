import { NextResponse } from 'next/server';

import { sql } from '@vercel/postgres';

async function createTables() {
  try {
    // Create users table first
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('Users table created successfully');

    // Modified recipes table with user_id
    await sql`
      CREATE TABLE IF NOT EXISTS recipes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        description TEXT NOT NULL,
        ingredients JSONB NOT NULL,
        instructions JSONB NOT NULL,
        day VARCHAR(10),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('Recipes table created successfully');

    // Modified meal_plan_requests table with user_id
    await sql`
      CREATE TABLE IF NOT EXISTS meal_plan_requests (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        breakfasts INTEGER NOT NULL,
        lunches INTEGER NOT NULL,
        dinners INTEGER NOT NULL,
        snacks INTEGER NOT NULL,
        leftovers BOOLEAN NOT NULL,
        ingredients_to_use TEXT,
        ingredients_to_avoid TEXT,
        dietary_restrictions TEXT,
        recipes TEXT,
        available_ingredients TEXT,
        cooking_tools TEXT,
        other_cooking_tools TEXT,
        cooking_mood TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('MealPlanRequest table created successfully');

    console.log('All tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
}

export default createTables;


export async function GET(request: Request) {
  try {
    await createTables();
    return NextResponse.json({ message: 'Database setup complete' });
  } catch (error) {
    console.error('Error setting up database:', error);
    return NextResponse.json({ error: 'Failed to set up database' }, { status: 500 });
  }
}
