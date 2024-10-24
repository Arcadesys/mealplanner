'use client';

import React, { useState, KeyboardEvent } from 'react';
import { Recipe, MealPlanRequest } from '../types/mealPlanner';
import PlanForm from './PlanForm';
import RecipeCard from './RecipeCard';


interface PlanViewProps {
  recipes: Recipe[];
  onAddRecipe: (newRecipe: Partial<Recipe>) => Promise<void>;
  onEditRecipe: (recipe: Recipe) => void;
  onDeleteRecipe: (id: string) => void;
}

export default function PlanView({ recipes, onAddRecipe, onEditRecipe, onDeleteRecipe }: PlanViewProps) {
  const [quickAddTitle, setQuickAddTitle] = useState('');
  const [showPlanForm, setShowPlanForm] = useState(false);
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

  const handleQuickAdd = async () => {
    if (!quickAddTitle.trim()) return;
    
    try {
      await onAddRecipe({
        title: quickAddTitle,
        description: 'Quick added recipe'
      });
      setQuickAddTitle('');
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleQuickAdd();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex gap-4 mb-6">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            value={quickAddTitle}
            onChange={(e) => setQuickAddTitle(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Quick add recipe..."
            className="flex-1 p-2 border rounded dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
          />
          <button
            onClick={handleQuickAdd}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
        
        <button
          onClick={() => setShowPlanForm(!showPlanForm)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Plan Meals
        </button>
      </div>

      {showPlanForm ? (
        <PlanForm 
          formData={formData}
          onChange={setFormData}
          onSubmit={() => {}} // We'll implement this later
          className="mb-8"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onEdit={onEditRecipe}
              onDelete={onDeleteRecipe}
            />
          ))}
        </div>
      )}
    </div>
  );
}
