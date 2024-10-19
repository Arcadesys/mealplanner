import { useState, useEffect } from 'react';
import { Recipe } from '../types/recipe';

export const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('/api/recipes');
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data: Recipe[] = await response.json();
        setRecipes(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching recipes:', err);
        setError('Failed to fetch recipes');
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const addRecipe = async (newRecipe: Partial<Recipe>) => {
    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecipe),
      });

      if (!response.ok) {
        throw new Error('Failed to add recipe');
      }

      const addedRecipe: Recipe = await response.json();
      setRecipes(prevRecipes => [...prevRecipes, addedRecipe]);
      return addedRecipe;
    } catch (error) {
      console.error('Error adding recipe:', error);
      throw error;
    }
  };

  const deleteRecipe = async (id: string) => {
    try {
      const response = await fetch(`/api/recipes/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete recipe');
      }

      setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.id !== id));
      return true;
    } catch (error) {
      console.error('Error deleting recipe:', error);
      throw error;
    }
  };

  const updateRecipe = async (updatedRecipe: Recipe) => {
    try {
      const response = await fetch(`/api/recipes/${updatedRecipe.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRecipe),
      });

      if (!response.ok) {
        throw new Error('Failed to update recipe');
      }

      const savedRecipe: Recipe = await response.json();
      setRecipes(prevRecipes =>
        prevRecipes.map(recipe => (recipe.id === savedRecipe.id ? savedRecipe : recipe))
      );
      return savedRecipe;
    } catch (error) {
      console.error('Error updating recipe:', error);
      throw error;
    }
  };

  return { recipes, setRecipes, loading, error, addRecipe, deleteRecipe, updateRecipe };
};
