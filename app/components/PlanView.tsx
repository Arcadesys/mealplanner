'use client';

import React, { useState, KeyboardEvent } from 'react';
import { Recipe, MealPlanRequest } from '../types/mealPlanner';
import PlanForm from './PlanForm';
import RecipeCard from './RecipeCard';
import { FaMagic, FaShoppingCart, FaPlus } from 'react-icons/fa'; // Don't forget to npm install react-icons!

interface PlanViewProps {
  recipes: Recipe[];
  onAddRecipe: (newRecipe: Partial<Recipe>) => Promise<void>;
  onEditRecipe: (recipe: Recipe) => void;
  onDeleteRecipe: (id: string) => void;
}

export default function PlanView({ 
  recipes, 
  onAddRecipe, 
  onEditRecipe, 
  onDeleteRecipe 
}: PlanViewProps) {
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
  const [generatedPlan, setGeneratedPlan] = useState<Recipe[] | null>(null);

  const handleQuickAdd = async () => {
    if (!quickAddTitle.trim()) return;
    
    try {
      await onAddRecipe({
        title: quickAddTitle,
        description: 'Quick added recipe'
      });
      setQuickAddTitle(''); // Clear input after successful add
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleQuickAdd();
    }
  };

  const handleGenerateShoppingList = async () => {
    if (!recipes?.length) {
      alert('No recipes to generate shopping list from!');
      return;
    }

    try {
      const allIngredients = recipes.reduce((acc, recipe) => {
        if (recipe.ingredients) {
          return { ...acc, ...recipe.ingredients };
        }
        return acc;
      }, {});

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          type: 'shopping',
          ingredients: allIngredients 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate shopping list');
      }

      const data = await response.json();
      // Handle the shopping list data as needed
      console.log('Shopping list:', data);
    } catch (error) {
      console.error('Error generating shopping list:', error);
    }
  };

  const handleGenerateMealPlan = async () => {
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          formData,
          recipes 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate meal plan');
      }

      const data = await response.json();
      // Handle the meal plan data as needed
      console.log('Meal plan:', data);
    } catch (error) {
      console.error('Error generating meal plan:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Quick Actions Bar */}
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
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <FaPlus /> Add
          </button>
        </div>
        
        <button
          onClick={() => setShowPlanForm(!showPlanForm)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FaMagic /> Plan Meals
        </button>
        
        <button
          onClick={handleGenerateShoppingList}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FaShoppingCart /> Go Shopping
        </button>
      </div>

      {/* Plan Form */}
      {showPlanForm && (
        <PlanForm 
          formData={formData}
          onChange={setFormData}
          onSubmit={handleGenerateMealPlan}
          className="mb-8"
        />
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-bold mb-4">Your Recipes</h2>
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onEdit={onEditRecipe}
              onDelete={onDeleteRecipe}
            />
          ))}
        </div>
        
        {generatedPlan && (
          <div>
            <h2 className="text-xl font-bold mb-4">Generated Meal Plan</h2>
            {generatedPlan.map((recipe) => (
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
    </div>
  );
}
