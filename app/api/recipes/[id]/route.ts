import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

// GET /api/recipes
export async function GET() {
  try {
    return NextResponse.json(recipes);
  } catch (error) {
    console.error('Error in GET /api/recipes:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE /api/recipes/[id]
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    console.log('DELETE API route hit for recipe:', params.id);
    
    const result = await sql`
      DELETE FROM recipes 
      WHERE id = ${params.id}
      RETURNING id;
    `;
    
    if (result.rowCount === 0) {
      console.log('No recipe found with ID:', params.id);
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }

    console.log('Successfully deleted recipe:', params.id);
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Error in DELETE API route:', error);
    return NextResponse.json({ error: 'Failed to delete recipe' }, { status: 500 });
  }
}

// PUT /api/recipes/[id]
// PUT /api/recipes/[id]
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const updatedRecipe = await request.json();
    console.log('PUT request received for ID:', id, 'with data:', updatedRecipe);
    
    const index = recipes.findIndex(recipe => recipe.id === id);
    if (index === -1) {
      // If recipe doesn't exist, create it
      const newRecipe = {
        id,
        ...updatedRecipe
      };
      recipes.push(newRecipe);
      return NextResponse.json(newRecipe);
    }

    // If recipe exists, update it
    recipes[index] = { ...recipes[index], ...updatedRecipe };
    return NextResponse.json(recipes[index]);
  } catch (error) {
    console.error('Error updating recipe:', error);
    return NextResponse.json({ error: 'Failed to update recipe' }, { status: 500 });
  }
}
