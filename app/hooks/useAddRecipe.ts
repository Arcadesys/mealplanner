import { useState } from 'react';
import { Recipe } from '../types/recipe';

export const useAddRecipe = () => {
  const [isAddingRecipe, setIsAddingRecipe] = useState(false);

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

      const addedRecipe = await response.json();
      return addedRecipe;
    } catch (error) {
      console.error('Error adding recipe:', error);
      throw error;
    }
  };

  return {
    isAddingRecipe,
    setIsAddingRecipe,
    addRecipe,
  };
};
