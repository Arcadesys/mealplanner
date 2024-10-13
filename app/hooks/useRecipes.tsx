import { useState, useEffect } from 'react';
import { Recipe } from '../types/recipe';
import dummyRecipes from '../data/dummyData.json';

    // Start of Selection
    // Using our existing /recipes route instead of dummy data

export const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulating an API call
    const fetchRecipes = async () => {
      try {
        // In a real scenario, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000)); // Fake delay
        setRecipes(dummyRecipes);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch recipes');
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return { recipes, loading, error };
};
