import { NextResponse } from 'next/server';

let recipes: any[] = [];

export async function GET() {
  return NextResponse.json(recipes);
}

export async function POST(request: Request) {
  const newRecipe = await request.json();
  
  // Add new recipe
  recipes.push(newRecipe);
  
  return NextResponse.json({ message: 'Recipe added successfully' });
}
