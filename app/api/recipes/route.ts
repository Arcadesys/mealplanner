import { NextResponse } from 'next/server';

export async function GET() {
  // Retrieve recipes from local storage
  const recipes = JSON.parse(localStorage.getItem('recipes') || '[]');
  return NextResponse.json(recipes);
}

export async function POST(request: Request) {
  const newRecipe = await request.json();
  
  // Get existing recipes
  const recipes = JSON.parse(localStorage.getItem('recipes') || '[]');
  
  // Add new recipe
  recipes.push(newRecipe);
  
  // Save updated recipes
  localStorage.setItem('recipes', JSON.stringify(recipes));
  
  return NextResponse.json({ message: 'Recipe added successfully' });
}

