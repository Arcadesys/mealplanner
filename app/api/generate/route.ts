import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai-edge';
import { Recipe, MealPlanRequest } from '../../types/mealPlanner';

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(config);

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { formData, recipes } = await req.json();
    console.log(formData);
    console.log(recipes);

    const formattedRecipes = recipes
      .map((recipe: Recipe) => `${recipe.name} (${recipe.category})`)
      .join(', ');
    
    const prompt = `Generate a meal plan based on the following preferences:
      Breakfasts: ${formData.breakfasts}
      Lunches: ${formData.lunches}
      Dinners: ${formData.dinners}
      Snacks: ${formData.snacks}
      Leftovers: ${formData.leftovers ? 'Yes' : 'No'}
      Ingredients to use: ${formData.ingredientsToUse}
      Ingredients to avoid: ${formData.ingredientsToAvoid}
      Dietary restrictions: ${formData.dietaryRestrictions}
      Preferred recipes: ${formData.recipes} (NEVER change the ID when returning the recipe)
      Available ingredients: ${formData.availableIngredients}
      Cooking tools: ${formData.cookingTools}
      Cooking mood: ${formData.cookingMood}
      
      Return the response as a JSON array of recipes. Each recipe should follow this exact structure:
      {
        "id": "generated-uuid",
        "title": "Recipe Name",
        "description": "Brief description",
        "ingredients": {
          "ingredient1": "amount1",
          "ingredient2": "amount2"
        },
        "instructions": ["step1", "step2", "step3"]
      }`;

    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a helpful meal planning assistant. Always return responses in valid JSON format."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1500
    });

    const result = await completion.json();
    const mealPlan = JSON.parse(result.choices[0].message.content);
    return NextResponse.json({ success: true, plan: mealPlan });
    
  } catch (error) {
    console.error('Error in generate route:', error);
    return NextResponse.json(
      { error: 'Failed to generate meal plan' },
      { status: 500 }
    );
  }
}
