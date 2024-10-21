import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

let recipes: any[] = [];

export async function GET() {
  return NextResponse.json(recipes);
}

export async function POST(request: Request) {
  const newRecipe = await request.json();
  
  // Add new recipe with a UUID
  const recipeWithId = {
    ...newRecipe,
    id: uuidv4(),
    title: newRecipe.title || 'Untitled Recipe',
    ingredients: Array.isArray(newRecipe.ingredients) 
      ? newRecipe.ingredients 
      : typeof newRecipe.ingredients === 'object' 
        ? Object.entries(newRecipe.ingredients).map(([name, amount]) => ({ name, amount }))
        : [],
    instructions: Array.isArray(newRecipe.instructions)
      ? newRecipe.instructions
      : typeof newRecipe.instructions === 'string'
        ? newRecipe.instructions.split('\n')
        : []
  };
  
  recipes.push(recipeWithId);
  
  return NextResponse.json(recipeWithId);
}
