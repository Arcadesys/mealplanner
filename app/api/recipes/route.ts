import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { Recipe } from '@/app/types/mealPlanner';

const SYSTEM_USER_ID = '11111111-1111-1111-1111-111111111111';

export async function GET() {
  try {
    // Using proper Vercel SQL JSON handling
    const { rows } = await sql`
      SELECT 
        id,
        title,
        description,
        ingredients,
        instructions,
        user_id,
        day
      FROM recipes`;
    
    // Transform the rows to ensure proper JSON parsing
    const recipes = rows.map(row => ({
      ...row,
      ingredients: typeof row.ingredients === 'string' ? JSON.parse(row.ingredients) : row.ingredients,
    }));
    console.log('recipes', recipes);
    return NextResponse.json(recipes as Recipe[]);
  } catch (error) {
    console.log('Recipe GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch recipes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const recipe: Partial<Recipe> = await request.json();
    
    const { rows } = await sql`
      INSERT INTO recipes (
        title, 
        ingredients, 
        instructions, 
        user_id, 
        description
      )
      VALUES (
        ${recipe.title}, 
        ${JSON.stringify(recipe.ingredients)}::jsonb, 
        ${JSON.stringify(recipe.instructions)},
        ${SYSTEM_USER_ID}, 
        ${recipe.description || recipe.title}
      )
      RETURNING 
        id,
        title,
        description,
        ingredients,
        instructions,
        user_id,
        day
    `;
    
    return NextResponse.json(rows[0] as Recipe);
  } catch (error) {
    console.log('Recipe POST error:', error);
    return NextResponse.json({ error: 'Failed to create recipe' }, { status: 500 });
  }
}
