import { NextResponse } from 'next/server';
import { Recipe } from '../../types/recipe';

const LOCAL_STORAGE_KEY = 'recipes';

// Demo recipes
const demoRecipes: Recipe[] = [
  {
    id: '1',
    title: "Tuna Casserole",
    description: "A simple and delicious tuna casserole.",
    ingredients: {
      "canned tuna": "2 cans",
      "pasta": "2 cups",
      "cheese": "1 cup"
    },
    instructions: [
      "Mix all ingredients in a casserole dish.",
      "Bake at 350°F for 20 minutes."
    ]
  },
  {
    id: '2',
    title: "Spaghetti Carbonara",
    description: "Classic Italian pasta dish with eggs, cheese, and bacon.",
    ingredients: {
      "spaghetti": "1 pound",
      "bacon": "8 slices",
      "eggs": "4 large",
      "Parmesan cheese": "1 cup grated"
    },
    instructions: [
      "Cook spaghetti according to package instructions.",
      "Fry bacon until crispy, then crumble.",
      "Beat eggs with grated cheese.",
      "Toss hot pasta with egg mixture and bacon."
    ]
  },
  {
    id: '3',
    title: "Vegetable Stir Fry",
    description: "Quick and healthy vegetable stir fry with soy sauce.",
    ingredients: {
      "mixed vegetables": "4 cups",
      "soy sauce": "2 tablespoons",
      "vegetable oil": "1 tablespoon",
      "garlic": "2 cloves, minced"
    },
    instructions: [
      "Heat oil in a wok or large skillet.",
      "Add garlic and stir-fry for 30 seconds.",
      "Add vegetables and cook for 5-7 minutes.",
      "Stir in soy sauce and serve hot."
    ]
  }
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
