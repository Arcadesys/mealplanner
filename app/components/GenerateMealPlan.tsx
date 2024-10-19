import React from 'react';

interface GenerateMealPlanProps {
  formData: {
    breakfasts: number;
    lunches: number;
    dinners: number;
    snacks: number;
    leftovers: boolean;
    ingredientsToUse: string;
    ingredientsToAvoid: string;
    dietaryRestrictions: string;
    recipes: string;
    availableIngredients: string;
    cookingTools: string;
    cookingMood: string;
  };
}

const GenerateMealPlan: React.FC<GenerateMealPlanProps> = ({ formData }) => {
  const handleGenerateMealPlan = async () => {
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
      Cooking mood: ${formData.cookingMood}`;

    // Here you would typically call your API to generate the meal plan
    console.log('Generating meal plan with prompt:', prompt);
    // For now, we'll just log the prompt
    // In a real application, you'd send this to your API and handle the response
  };

  return (
    <button
      onClick={handleGenerateMealPlan}
      className="bg-green-500 text-white px-6 py-3 text-lg font-bold rounded hover:bg-green-600 transition-colors duration-200"
    >
      Generate My Meal Plan
    </button>
  );
};

export default GenerateMealPlan;
