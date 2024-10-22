import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

let recipes: any[] = [];

export async function GET() {
  try {
    // Add debug logging
    console.log('Attempting to fetch recipes...');
    
    // First, let's check if the table exists
    const tableCheck = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'recipes'
      );
    `;
    console.log('Table check result:', tableCheck.rows[0]);

    const { rows } = await sql`SELECT * FROM recipes`;
    console.log('Fetched recipes:', rows);
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Detailed error:', {
      message: error.message,
      code: error.code,
      detail: error.detail,
      hint: error.hint
    });
    return NextResponse.json({ error: 'Failed to fetch recipes', details: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    console.log('Starting POST request...');
    const body = await request.json();
    console.log('Received body:', body);
    
    const { title } = body;
    
    // Validate only the title
    if (!title?.trim()) {
      return NextResponse.json({ 
        error: 'Title is required' 
      }, { status: 400 });
    }

    const tempUserId = '00000000-0000-0000-0000-000000000000';
    
    // Set empty defaults for all other fields
    const result = await sql`
      INSERT INTO recipes (
        user_id,
        title,
        description,
        ingredients,
        instructions
      )
      VALUES (
        ${tempUserId}::uuid,
        ${title.trim()},
        ${'No description yet'},
        ${'[]'}::jsonb,
        ${'[]'}::jsonb
      )
      RETURNING *
    `;
    
    console.log('Inserted recipe:', result.rows[0]);
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Failed to add recipe:', {
      error: error.message,
      details: error.detail,
      hint: error.hint,
      code: error.code
    });
    return NextResponse.json({ 
      error: 'Failed to add recipe', 
      details: error.message,
      code: error.code 
    }, { status: 500 });
  }
}
