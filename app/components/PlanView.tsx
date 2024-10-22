'use client';

import React, { useState, useEffect } from 'react';
import UnassignedRecipes from './UnassignedRecipes';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Recipe, MealPlanRequest } from '../types/mealPlanner';
import PlanForm from './PlanForm';
import GenerateMealPlan from './GenerateMealPlan';

interface PlanViewProps {
  recipes: Recipe[];
  onAddRecipe: (newRecipe: Partial<Recipe>) => void;
  onEditRecipe: (recipe: Recipe) => void;
  onDeleteRecipe: (id: string) => void;
}

const PlanView: React.FC<PlanViewProps> = ({ recipes, onAddRecipe, onEditRecipe, onDeleteRecipe }) => {
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState<MealPlanRequest>({
    breakfasts: 0,
    lunches: 0,
    dinners: 0,
    snacks: 0,
    leftovers: false,
    ingredientsToUse: '',
    ingredientsToAvoid: '',
    dietaryRestrictions: '',
    recipes: '',
    availableIngredients: '',
    cookingTools: '',
    cookingMood: '',
  });
  const [generatedPlan, setGeneratedPlan] = useState<Recipe[] | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleFormChange = (newFormData: typeof formData) => {
    setFormData(newFormData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleDragEnd = (result: DropResult) => {
    console.log('Drag ended:', result);
  };

  const handleGenerateMealPlan = async () => {
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate meal plan');
      }

      const generatedPlan = await response.json();
      setGeneratedPlan(generatedPlan);
      console.log('Generated meal plan:', generatedPlan);
    } catch (error) {
      console.error('Error generating meal plan:', error);
    }
  };

  if (!isClient) {
    return null; // or a loading spinner
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex h-screen overflow-hidden dark:bg-gray-800 dark:text-white">
        <div className="flex-1 p-4 overflow-y-auto">
         
          <PlanForm 
            formData={formData} 
            onChange={handleFormChange} 
            onSubmit={handleGenerateMealPlan}
            className="p-4"
          />
          <GenerateMealPlan formData={formData} onGenerate={handleGenerateMealPlan} />
          {generatedPlan && (
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Generated Meal Plan</h3>
              {generatedPlan.map((recipe, index) => (
                <div key={index} className="mb-2">
                  <h4 className="font-semibold">{recipe.title}</h4>
                  <p>{recipe.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="w-1/3 p-4 overflow-y-auto border-l border-gray-200 dark:border-gray-700">
          <UnassignedRecipes 
            recipes={recipes} 
            onAddRecipe={onAddRecipe}
            onEditRecipe={onEditRecipe}
            onDeleteRecipe={onDeleteRecipe}
          />
        </div>
      </div>
    </DragDropContext>
  );
};

export default PlanView;
