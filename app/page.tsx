"use client";
import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import PlanView from './components/PlanView';
import GroceryView from './components/GroceryView';
import { Recipe } from './types/mealPlanner';
import { useRecipes } from './hooks/useRecipes';

const HomePage: React.FC = () => {
  const [currentView, setCurrentView] = useState<'PLAN' | 'SHOP'>('PLAN');
  const { 
    recipes, 
    loading, 
    error, 
    addRecipe, 
    deleteRecipe, 
    updateRecipe 
  } = useRecipes();

  const handleAddRecipe = async (newRecipe: Partial<Recipe>) => {
    try {
      await addRecipe(newRecipe);
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  const handleDeleteRecipe = async (id: string) => {
    try {
      await deleteRecipe(id);
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  const handleUpdateRecipe = async (recipe: Recipe) => {
    try {
      await updateRecipe(recipe);
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'PLAN':
        return (
          <PlanView 
            recipes={recipes} 
            onAddRecipe={handleAddRecipe}
            onEditRecipe={handleUpdateRecipe}
            onDeleteRecipe={handleDeleteRecipe}
          />
        );
      case 'SHOP':
        return <GroceryView />;
      default:
        return null;
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col h-screen">
      <Navigation currentView={currentView} setCurrentView={setCurrentView} />
      <main className="flex-grow overflow-hidden">
        {renderView()}
      </main>
    </div>
  );
};

export default HomePage;
