"use client";
import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import PlanView from './components/PlanView';
import ScheduleView from './components/ScheduleView';
import GroceryView from './components/GroceryView';
import { Recipe } from './types/recipe';
import { useAddRecipe } from './hooks/useAddRecipe';
import { useRecipes } from './hooks/useRecipes';

type ViewType = 'PLAN' | 'SCHEDULE' | 'SHOP';

const HomePage: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>(() => {
    // Initialize from localStorage, fallback to 'SCHEDULE'
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('currentView') as ViewType) || 'SCHEDULE';
    }
    return 'SCHEDULE';
  });

  // Update localStorage whenever currentView changes
  useEffect(() => {
    console.log('Saving view to localStorage:', currentView);
    localStorage.setItem('currentView', currentView);
  }, [currentView]);

  console.log('HomePage rendering with view:', currentView);

  const { recipes, loading, error, setRecipes } = useRecipes();
  const { addRecipe, deleteRecipe, updateRecipe } = useAddRecipe();

  const handleAddRecipe = async (newRecipe: Partial<Recipe>) => {
    try {
      const addedRecipe = await addRecipe(newRecipe);
      setRecipes(prev => [...prev, addedRecipe]);
      // Optionally, show a success message or toast
    } catch (error) {
      console.error('Error adding recipe:', error);
      // Optionally, show an error message or toast
    }
  };

  const handleDeleteRecipe = async (recipeId: string) => {
    try {
      await deleteRecipe(recipeId);
      setRecipes(prev => prev.filter(recipe => recipe.id !== recipeId));
      // Optionally, show a success message or toast
    } catch (error) {
      console.error('Error deleting recipe:', error);
      // Optionally, show an error message or toast
    }
  };

  const handleUpdateRecipe = async (updatedRecipe: Recipe) => {
    try {
      const savedRecipe = await updateRecipe(updatedRecipe);
      setRecipes(prev =>
        prev.map(recipe => (recipe.id === savedRecipe.id ? savedRecipe : recipe))
      );
      // Optionally, show a success message or toast
    } catch (error) {
      console.error('Error updating recipe:', error);
      // Optionally, show an error message or toast
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'PLAN':
        return <PlanView recipes={recipes} onAddRecipe={handleAddRecipe} />;
      case 'SCHEDULE':
        return <ScheduleView onAddRecipe={handleAddRecipe} onDeleteRecipe={handleDeleteRecipe} onUpdateRecipe={handleUpdateRecipe} />;
      case 'SHOP':
        return <GroceryView />;
      default:
        return null;
    }
  };

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
