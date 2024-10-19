import { useState } from 'react';
import { Recipe } from '../types/recipe';

export const useAddRecipe = () => {
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
      return savedRecipe;
    } catch (error) {
      console.error('Error updating recipe:', error);
      throw error;
    }
  };

  return {
    addRecipe,
    deleteRecipe,
    updateRecipe,
  };
};
