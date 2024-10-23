import { NextResponse } from 'next/server';
import { Recipe } from '../../../types/recipe';

let recipes: Recipe[] = [
  {
    id: '1',
    title: "Veggie-Loaded Frittata",
    description: "A versatile egg dish that uses up leftover vegetables.",
    ingredients: "6 large eggs\n1/4 cup milk\n2 cups mixed vegetables, chopped\n1/2 cup cheese, shredded\nsalt and pepper to taste\n1 tablespoon olive oil",
    instructions: "1. Whisk eggs with milk, salt, and pepper\n2. Sauté vegetables in an oven-safe skillet with olive oil\n3. Pour egg mixture over vegetables and sprinkle with cheese\n4. Cook on stovetop for 5 minutes, then finish in the oven at 375°F for 10-15 minutes"
  },
  {
    id: '2',
    title: "Overnight Oats with Fruit Compote",
    description: "Easy breakfast using leftover fruits.",
    ingredients: {
      "rolled oats": "1/2 cup",
      "milk": "1/2 cup",
      "yogurt": "1/4 cup",
      "chia seeds": "1 tablespoon",
      "honey": "1 tablespoon",
      "mixed fruits": "1/2 cup (use any leftover fruits)"
    },
    instructions: [
      "Mix oats, milk, yogurt, chia seeds, and honey in a jar.",
      "Refrigerate overnight.",
      "Simmer chopped fruits with a splash of water until soft.",
      "Top oats with fruit compote before serving."
    ]
  }
];

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
    const id = params.id;
    console.log('DELETE request received for ID:', id);

    // Filter out the recipe with the given ID
    recipes = recipes.filter(recipe => recipe.id !== id);
    console.log('Remaining recipes:', recipes);

    return NextResponse.json({ message: `Recipe with ID ${id} deleted` }, { status: 200 });
  } catch (error) {
    console.error('Error in DELETE /api/recipes:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PUT /api/recipes/[id]
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const updatedRecipe = await request.json();
    
    const index = recipes.findIndex(recipe => recipe.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }

    recipes[index] = { ...recipes[index], ...updatedRecipe };
    
    return NextResponse.json(recipes[index]);
  } catch (error) {
    console.error('Error updating recipe:', error);
    return NextResponse.json({ error: 'Failed to update recipe' }, { status: 500 });
  }
}
