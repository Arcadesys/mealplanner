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
  try {
    const { name, ingredients, instructions } = await request.json();
    const result = await sql`
      INSERT INTO recipes (name, ingredients, instructions)
      VALUES (${name}, ${ingredients}, ${instructions})
      RETURNING *
    `;
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error adding recipe:', error);
    return NextResponse.json({ error: 'Failed to add recipe' }, { status: 500 });
  }
}
