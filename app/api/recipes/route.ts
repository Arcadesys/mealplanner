import { NextResponse } from 'next/server';
import { Recipe } from '../../types/recipe';

const LOCAL_STORAGE_KEY = 'recipes';

// Demo recipes
const demoRecipes: Recipe[] = [
  {
    id: '1',
    title: "Veggie-Loaded Frittata",
    description: "A versatile egg dish that uses up leftover vegetables.",
    ingredients: {
      "eggs": "6 large",
      "milk": "1/4 cup",
      "mixed vegetables": "2 cups, chopped (use leftovers from stir-fry)",
      "cheese": "1/2 cup, shredded (leftover from other recipes)",
      "salt and pepper": "to taste",
      "olive oil": "1 tablespoon"
    },
    instructions: [
      "Whisk eggs with milk, salt, and pepper.",
      "Sauté vegetables in an oven-safe skillet with olive oil.",
      "Pour egg mixture over vegetables and sprinkle with cheese.",
      "Cook on stovetop for 5 minutes, then finish in the oven at 375°F for 10-15 minutes."
    ]
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
  },
  {
    id: '3',
    title: "Kitchen Sink Soup",
    description: "A hearty soup that utilizes various leftover ingredients.",
    ingredients: {
      "vegetable or chicken broth": "4 cups",
      "mixed vegetables": "2 cups (fresh or leftover)",
      "leftover protein": "1 cup (optional)",
      "canned tomatoes": "1 can",
      "pasta or rice": "1/2 cup",
      "herbs and spices": "to taste"
    },
    instructions: [
      "Bring broth to a simmer in a large pot.",
      "Add vegetables, protein, tomatoes, and pasta or rice.",
      "Simmer until pasta/rice is cooked and vegetables are tender.",
      "Season with herbs and spices as desired."
    ]
  },
  {
    id: '4',
    title: "One-Pan Roasted Chicken and Vegetables",
    description: "An easy, customizable sheet pan dinner.",
    ingredients: {
      "chicken pieces": "4 (legs, thighs, or breasts)",
      "mixed vegetables": "4 cups, chopped (potatoes, carrots, onions, etc.)",
      "olive oil": "2 tablespoons",
      "garlic": "3 cloves, minced",
      "herbs": "2 teaspoons (rosemary, thyme, or any available)",
      "salt and pepper": "to taste"
    },
    instructions: [
      "Preheat oven to 425°F.",
      "Toss chicken and vegetables with oil, garlic, herbs, salt, and pepper.",
      "Spread on a baking sheet and roast for 30-40 minutes, until chicken is cooked through.",
      "Use leftover vegetables in frittata or grain bowls."
    ]
  },
  {
    id: '5',
    title: "Flexible Stir-Fry",
    description: "A quick dinner that adapts to what's in your fridge.",
    ingredients: {
      "protein": "1 lb (chicken, tofu, shrimp, or beef)",
      "mixed vegetables": "4 cups (any combination)",
      "garlic": "2 cloves, minced",
      "ginger": "1 tablespoon, grated",
      "soy sauce": "3 tablespoons",
      "oil": "2 tablespoons"
    },
    instructions: [
      "Heat oil in a wok or large skillet.",
      "Cook protein until nearly done, then remove from pan.",
      "Stir-fry vegetables, starting with the firmest ones.",
      "Add garlic and ginger, then return protein to the pan.",
      "Stir in soy sauce and cook until everything is hot.",
      "Serve over rice or noodles, use leftovers in frittata or soup."
    ]
  },
  {
    id: '6',
    title: "Reheat Veggie-Loaded Frittata",
    description: "Leftover frittata for a quick breakfast.",
    ingredients: {
      "leftover frittata": "1 serving"
    },
    instructions: [
      "Reheat in the microwave for 1-2 minutes until warmed through."
    ]
  },
  {
    id: '7',
    title: "Reheat Kitchen Sink Soup",
    description: "Leftover hearty soup.",
    ingredients: {
      "leftover soup": "1 serving"
    },
    instructions: [
      "Reheat in a saucepan over medium heat until hot, or microwave for 2-3 minutes. Stir halfway through."
    ]
  },
  {
    id: '8',
    title: "Reheat One-Pan Roasted Chicken and Vegetables",
    description: "Leftover roasted chicken and vegetables.",
    ingredients: {
      "leftover chicken and vegetables": "1 serving"
    },
    instructions: [
      "Reheat on a baking sheet at 350°F for 10-12 minutes or in the microwave for 2-3 minutes until warmed through."
    ]
  },
  {
    id: '9',
    title: "Reheat Leftover Remix Grain Bowl",
    description: "A reheated grain bowl with leftover grains, protein, and vegetables.",
    ingredients: {
      "leftover grain bowl ingredients": "1 serving"
    },
    instructions: [
      "Reheat grains and protein in the microwave for 1-2 minutes. Serve with fresh leafy greens and dressing."
    ]
  },
  {
    id: '10',
    title: "Reheat Flexible Stir-Fry",
    description: "Leftover stir-fry for a quick dinner.",
    ingredients: {
      "leftover stir-fry": "1 serving"
    },
    instructions: [
      "Reheat stir-fry in a skillet over medium heat for 4-5 minutes, or microwave for 1-2 minutes until hot."
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
