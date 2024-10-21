import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

let recipes: any[] = [];

export async function GET() {
  return NextResponse.json(recipes);
}

export async function POST(request: Request) {
  const newRecipe = await request.json();
  
  // Add new recipe with a UUID
  recipes.push({
    ...newRecipe,
    id: uuidv4()
  });
  
  return NextResponse.json({ message: 'Recipe added successfully' });
}
