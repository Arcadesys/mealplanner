//a modal that allows a user to plan their meals for the week.

import React, { useState } from 'react';
import UnassignedRecipes from './UnassignedRecipes';
import { DragDropContext } from '@hello-pangea/dnd';
import { Recipe } from '../types/recipe';
import PlanForm from './PlanForm';
import GenerateMealPlan from './GenerateMealPlan';

interface PlanViewProps {
  recipes: Recipe[];
  onAddRecipe: (newRecipe: Partial<Recipe>) => void;
}

const PlanView: React.FC<PlanViewProps> = ({ recipes, onAddRecipe }) => {
  const [formData, setFormData] = useState({
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

  const handleFormChange = (newFormData: typeof formData) => {
    setFormData(newFormData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <DragDropContext onDragEnd={() => {}}>
      <div className="flex h-screen overflow-hidden dark:bg-gray-800 dark:text-white">
        <div className="flex-1 p-4 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">Meal Planning</h2>
          <PlanForm 
            formData={formData} 
            onChange={handleFormChange} 
            onSubmit={handleSubmit} 
          />
          <GenerateMealPlan formData={formData} />
        </div>
        <div className="w-1/3 p-4 overflow-y-auto border-l border-gray-200 dark:border-gray-700">
          <UnassignedRecipes 
            recipes={recipes} 
            onAddRecipe={onAddRecipe} 
          />
        </div>
      </div>
    </DragDropContext>
  );
};

export default PlanView;
