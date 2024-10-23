import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

const SYSTEM_USER_ID = '11111111-1111-1111-1111-111111111111';

export async function GET() {
  try {
    const { rows } = await sql`SELECT * FROM recipes`;
    return NextResponse.json(rows);
  } catch (error) {
    console.log('Recipe GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch recipes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, ingredients, instructions } = await request.json();
    
    const { rows } = await sql`
      INSERT INTO recipes (title, ingredients, instructions)
      VALUES (${title}, ${ingredients}, ${instructions})
      RETURNING *
    `;
    
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.log('Recipe POST error:', error);
    return NextResponse.json({ error: 'Failed to create recipe' }, { status: 500 });
  }
}
