import { useState, useEffect } from 'react';
import { Recipe, Ingredient, Step } from '../../components/types/recipe';

export const useMeals = () => {
  const [meals, setMeals] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        // Simulating API call with a timeout
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock data for 4 recipes
        const mockRecipes: Recipe[] = [
          {
            id: '1',
            name: 'Spaghetti Bolognese',
            title: 'Spaghetti Bolognese',
            description: 'Classic Italian pasta dish with meat sauce',
            ingredients: [
              { name: 'spaghetti', quantity: 1, measure: 'package' },
              { name: 'ground beef', quantity: 1, measure: 'pound' },
              { name: 'tomato sauce', quantity: 2, measure: 'cups' },
              { name: 'onions', quantity: 1, measure: 'medium' },
              { name: 'garlic', quantity: 2, measure: 'cloves' }
            ],
            instructions: [
              { order: 1, instruction: 'Cook pasta' },
              { order: 2, instruction: 'Brown meat' },
              { order: 3, instruction: 'Add sauce' },
              { order: 4, instruction: 'Simmer' },
              { order: 5, instruction: 'Serve' }
            ],
            prepTime: 15,
            cookTime: 30,
            servings: 4,
          },
          {
            id: '2',
            name: 'Chicken Stir Fry',
            title: 'Chicken Stir Fry',
            description: 'Quick and healthy Asian-inspired dish',
            ingredients: [
              { name: 'chicken breast', quantity: 2, measure: 'pieces' },
              { name: 'mixed vegetables', quantity: 2, measure: 'cups' },
              { name: 'soy sauce', quantity: 2, measure: 'tablespoons' },
              { name: 'ginger', quantity: 1, measure: 'tablespoon' },
              { name: 'garlic', quantity: 2, measure: 'cloves' }
            ],
            instructions: [
              { order: 1, instruction: 'Cut chicken into bite-sized pieces' },
              { order: 2, instruction: 'Chop vegetables into uniform sizes' },
              { order: 3, instruction: 'Stir fry chicken in a hot wok until golden' },
              { order: 4, instruction: 'Add vegetables and stir fry for a few minutes' },
              { order: 5, instruction: 'Season with soy sauce, ginger, and garlic, then serve' }
            ],
            prepTime: 20,
            cookTime: 15,
            servings: 3,
          },
          {
            id: '3',
            name: 'Vegetarian Lentil Soup',
            title: 'Vegetarian Lentil Soup',
            description: 'Hearty and nutritious soup',
            ingredients: [
              { name: 'lentils', quantity: 1, measure: 'cup' },
              { name: 'carrots', quantity: 2, measure: 'medium' },
              { name: 'celery', quantity: 2, measure: 'stalks' },
              { name: 'onions', quantity: 1, measure: 'large' },
              { name: 'vegetable broth', quantity: 4, measure: 'cups' }
            ],
            instructions: [
              { order: 1, instruction: 'Chop vegetables' },
              { order: 2, instruction: 'Sauté vegetables' },
              { order: 3, instruction: 'Add lentils and broth' },
              { order: 4, instruction: 'Simmer' },
              { order: 5, instruction: 'Season and serve' }
            ],
            prepTime: 10,
            cookTime: 40,
            servings: 6,
          },
          {
            id: '4',
            name: 'Grilled Salmon',
            title: 'Grilled Salmon',
            description: 'Simple and delicious seafood dish',
            ingredients: [
              { name: 'salmon fillet', quantity: 2, measure: 'pieces' },
              { name: 'lemon', quantity: 1, measure: 'whole' },
              { name: 'olive oil', quantity: 2, measure: 'tablespoons' },
              { name: 'dill', quantity: 1, measure: 'tablespoon' },
              { name: 'salt', quantity: 1, measure: 'teaspoon' }
            ],
            instructions: [
              { order: 1, instruction: 'Marinate salmon' },
              { order: 2, instruction: 'Preheat grill' },
              { order: 3, instruction: 'Grill salmon' },
              { order: 4, instruction: 'Garnish' },
              { order: 5, instruction: 'Serve' }
            ],
            prepTime: 10,
            cookTime: 12,
            servings: 2,
          },
        ];

        setMeals(mockRecipes);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  return { meals, loading, error };
};
