import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

let recipes: any[] = [];

export async function GET() {
  return NextResponse.json(recipes);
}

export async function POST(request: Request) {
  const newRecipe = await request.json();
  const recipeWithId = {
    ...newRecipe,
    id: uuidv4()
  };
  
  recipes.push(recipeWithId);
  
  return NextResponse.json(recipeWithId);
}
