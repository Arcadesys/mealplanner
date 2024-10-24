'use client';

import React, { useState } from 'react';
import { Recipe, MealPlanRequest } from '../types/mealPlanner';
import PlanForm from './PlanForm';
import RecipeCard from './RecipeCard';

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

  const handleFormChange = (newFormData: MealPlanRequest) => {
    setFormData(newFormData);
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
      setGeneratedPlan(data.plan);
      console.log('Generated meal plan:', data.plan);
    } catch (error) {
      console.error('Error generating meal plan:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <PlanForm 
        formData={formData}
        onChange={handleFormChange}
        onSubmit={handleGenerateMealPlan}
        className="mb-8"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="recipe-list">
          <h2 className="text-xl font-bold mb-4">Your
