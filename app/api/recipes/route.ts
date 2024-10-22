import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

let recipes: any[] = [];

export async function GET() {
  try {
    const { rows } = await sql`SELECT * FROM recipes`;
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Detailed error:', error);
    return NextResponse.json({ error: 'Failed to fetch recipes', details: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, ingredients, instructions } = await request.json();
    
    // Convert ingredients to string if it's an array/object
    const ingredientsString = Array.isArray(ingredients) ? JSON.stringify(ingredients) : ingredients;
    
    const result = await sql`
      INSERT INTO recipes (name, ingredients, instructions)
      VALUES (${name}, ${ingredientsString}, ${instructions})
      RETURNING *
    `;
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    // Make the error more helpful
    console.error('Detailed error:', error);
    return NextResponse.json({ error: 'Failed to add recipe', details: error.message }, { status: 500 });
  }
}
