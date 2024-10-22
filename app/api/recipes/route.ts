import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

let recipes: any[] = [];

export async function GET() {
  try {
    const { rows } = await sql`SELECT * FROM recipes`;
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json({ error: 'Failed to fetch recipes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const newRecipe = await request.json();
  
  const recipeWithDefaults = {
    title: newRecipe.title || 'Untitled Recipe',
    ingredients: JSON.stringify(Array.isArray(newRecipe.ingredients) 
      ? newRecipe.ingredients 
      : typeof newRecipe.ingredients === 'object' 
        ? Object.entries(newRecipe.ingredients).map(([name, amount]) => ({ name, amount }))
        : []),
    instructions: JSON.stringify(Array.isArray(newRecipe.instructions)
      ? newRecipe.instructions
      : typeof newRecipe.instructions === 'string'
        ? newRecipe.instructions.split('\n')
        : [])
  };
  
  const { rows } = await sql`
    INSERT INTO recipes (title, ingredients, instructions)
    VALUES (${recipeWithDefaults.title}, ${recipeWithDefaults.ingredients}, ${recipeWithDefaults.instructions})
    RETURNING *
  `;
  
  return NextResponse.json(rows[0]);
}
