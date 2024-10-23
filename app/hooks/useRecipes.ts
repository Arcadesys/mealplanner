import { useState, useCallback } from 'react';
import { Recipe } from '../types/mealPlanner';

export const useRecipes = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const fetchRecipes = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/recipes');
      if (!response.ok) throw new Error('Failed to fetch recipes');
      const data = await response.json();
      setRecipes(data);
      return data;
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch recipes');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array since this doesn't depend on any external values

  const addRecipe = async (newRecipe: Partial<Recipe>) => {
    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecipe),
      });
      if (!response.ok) throw new Error('Failed to add recipe');
      const addedRecipe = await response.json();
      setRecipes(prev => [...prev, addedRecipe]);
      return addedRecipe;
    } catch (error) {
      console.error('Error adding recipe:', error);
      throw error;
    }
  };

  const deleteRecipe = async (id: string) => {
   console.log('Deleting recipe with id:', id);
    try {
      const response = await fetch(`/api/recipes/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete recipe');
      setRecipes(prev => prev.filter(recipe => recipe.id !== id));
      return true;
    } catch (error) {
      console.error('Error deleting recipe:', error);
      throw error;
    }
  };

  const updateRecipe = async (updatedRecipe: Recipe) => {
    try {
      const response = await fetch(`/api/recipes/${updatedRecipe.id}`, {
        method: 'PUT', // Changed from PATCH to PUT to match the route handler
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRecipe),
      });
      if (!response.ok) throw new Error('Failed to update recipe');
      const savedRecipe = await response.json();
      setRecipes(prev => prev.map(recipe => 
        recipe.id === savedRecipe.id ? savedRecipe : recipe
      ));
      return savedRecipe;
    } catch (error) {
      console.error('Error updating recipe:', error);
      throw error;
    }
  };

  return {
    recipes,
    loading,
    error,
    setRecipes,
    fetchRecipes,
    addRecipe,
    deleteRecipe,
    updateRecipe,
  };
};
