import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

const SYSTEM_USER_ID = '11111111-1111-1111-1111-111111111111';

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

    const { rows } = await sql`
      SELECT 
        id,
        title,
        description,
        ingredients,
        instructions,
        created_at,
        CASE 
          WHEN user_id = ${SYSTEM_USER_ID}::uuid THEN true 
          ELSE false 
        END as is_system_recipe
      FROM recipes 
      ORDER BY created_at DESC
    `;
    console.log('Fetched recipes:', rows);
    
    // Transform the data if needed
    const formattedRecipes = rows.map(recipe => ({
      ...recipe,
      ingredients: recipe.ingredients || [],
      instructions: recipe.instructions || []
    }));

    return NextResponse.json(formattedRecipes);
  } catch (error) {
    console.error('Detailed error:', {
      message: error.message,
      code: error.code,
      detail: error.detail,
      hint: error.hint
    });
    return NextResponse.json({ 
      error: 'Failed to fetch recipes', 
      details: error.message 
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    console.log('Starting POST request...');
    
    // First, verify our system user exists
    const userCheck = await sql`
      SELECT id FROM users WHERE id = ${SYSTEM_USER_ID}::uuid;
    `;
    console.log('System user check:', userCheck.rows[0]);

    if (!userCheck.rows[0]) {
      return NextResponse.json({ 
        error: 'System user not found' 
      }, { status: 500 });
    }

    const body = await request.json();
    console.log('Received body:', body);
    
    const { title } = body;
    
    if (!title?.trim()) {
      return NextResponse.json({ 
        error: 'Title is required' 
      }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO recipes (
        user_id,
        title,
        description,
        ingredients,
        instructions
      )
      VALUES (
        ${SYSTEM_USER_ID}::uuid,
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
