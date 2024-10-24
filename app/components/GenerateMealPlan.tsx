import React, { useState } from 'react';

import { Recipe, MealPlanRequest } from '../types/mealPlanner';

interface GenerateMealPlanProps {
  formData: MealPlanRequest;
  onGenerate: () => Promise<void>;
  allRecipes: Recipe[];
}

const GenerateMealPlan: React.FC<GenerateMealPlanProps> = ({ formData, onGenerate, allRecipes }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateMealPlan = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const formattedRecipes = allRecipes
        .map(recipe => `${recipe.name} (${recipe.category})`)
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
        Preferred recipes: ${formData.recipes}
        Available ingredients: ${formData.availableIngredients}
        Cooking tools: ${formData.cookingTools}
        Cooking mood: ${formData.cookingMood}
        
        Additonally the user has requested the following recipes. Return a completed recipe for each one. Do not change the ID:${formattedRecipes}`;

      // Send the prompt to your API
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate meal plan');
      }

      // Now call onGenerate with the response data
      await onGenerate();
      
    } catch (error) {
      console.error('Error generating meal plan:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleGenerateMealPlan}
      disabled={isLoading}
      className={`bg-green-500 text-white px-6 py-3 text-lg font-bold rounded transition-colors duration-200 
        ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'}`}
    >
      {isLoading ? 'Generating...' : 'Generate My Meal Plan'}
    </button>
  );
};

export default GenerateMealPlan;
