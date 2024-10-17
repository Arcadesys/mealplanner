import { NextResponse } from 'next/server';

const LOCAL_STORAGE_KEY = 'recipes';

// Demo recipes
const demoRecipes = [
  {
    id: '1',
    title: "Tuna Casserole",
    description: "A simple and delicious tuna casserole.",
    ingredients: [
      { name: "canned tuna", quantity: 2, measure: "cans" },
      { name: "pasta", quantity: 2, measure: "cups" },
      { name: "cheese", quantity: 1, measure: "cup" }
    ],
    instructions: [
      { order: 1, instruction: "Mix all ingredients in a casserole dish." },
      { order: 2, instruction: "Bake at 350°F for 20 minutes." }
    ],
    prepTime: 10,
    cookTime: 20,
    servings: 4
  },
  // ... add more demo recipes here
];

let recipes = demoRecipes;

export async function GET() {
  try {
    
    return NextResponse.json(recipes);
  } catch (error) {
    console.error('Error in GET /api/recipes:', error);
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
