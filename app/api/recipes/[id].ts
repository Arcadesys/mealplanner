import { NextResponse } from 'next/server';
import { Recipe } from '../../types/recipe';

const LOCAL_STORAGE_KEY = 'recipes';

// Remove demoRecipes and initialize recipes as an empty array
let recipes: Recipe[] = [];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Recipe ID is required' }, { status: 400 });
    }

    const recipe = recipes.find(recipe => recipe.id === id);

    if (!recipe) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }

    return NextResponse.json(recipe);
  } catch (error) {
    console.error('Error in GET /api/recipes/[id]:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Recipe ID is required' }, { status: 400 });
    }

    recipes = recipes.filter(recipe => recipe.id !== id);

    return NextResponse.json({ message: `Recipe with ID ${id} deleted` }, { status: 200 });
  } catch (error) {
    console.error('Error in DELETE /api/recipes/[id]:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newRecipe = await request.json();
    
    // Add new recipe
    recipes.push(newRecipe);
    
    return NextResponse.json(newRecipe, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/recipes:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
