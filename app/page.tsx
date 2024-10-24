"use client";
import React, { useState, useEffect } from 'react';
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
    fetchRecipes, 
    addRecipe, 
    deleteRecipe, 
    updateRecipe 
  } = useRecipes();

  useEffect(() => {
    fetchRecipes().catch(err => 
      console.error('Failed to fetch recipes on mount:', err)
    );
  }, []); // Empty dependency array means this runs once on mount

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

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
    </div>
  );
  
  if (error) return (
    <div className="flex items-center justify-center h-screen text-red-600">
      <div className="text-center">
        <h2 className="text-xl font-bold mb-2">Oops! Something went wrong</h2>
        <p>{error}</p>
      </div>
    </div>
  );

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
