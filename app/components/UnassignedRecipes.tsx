import React, { useState, useEffect } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import RecipeCard from './RecipeCard';
import { Recipe } from '../types/planFormData';
import AddRecipeInline from './AddRecipeInline';

interface UnassignedRecipesProps {
  recipes: Recipe[];
  onAddRecipe: (newRecipe: Partial<Recipe>) => void;
  onEditRecipe: (recipe: Recipe) => void;
  onDeleteRecipe: (id: string) => void;
}

const UnassignedRecipes: React.FC<UnassignedRecipesProps> = ({ 
  recipes, 
  onAddRecipe, 
  onEditRecipe, 
  onDeleteRecipe 
}) => {
  const [isAddingRecipe, setIsAddingRecipe] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('/api/recipes');
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        onAddRecipe(data); // This will update the parent component's state
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []); // Empty dependency array means this runs once on mount

  const handleAddRecipe = async (newRecipe: Partial<Recipe>) => {
    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newRecipe,
          user_id: null  // This will use the authenticated user's ID on the server
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.details || 'Failed to add recipe');
      }

      const result = await response.json();
      onAddRecipe(result);
      setIsAddingRecipe(false);
    } catch (error) {
      console.error('Error adding recipe:', error);
      throw error; // Re-throw to let AddRecipeInline handle the error display
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Unassigned Recipes</h2>
      <button
        onClick={() => setIsAddingRecipe(true)}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Recipe
      </button>

      <Droppable droppableId="unassigned">
        {(provided, snapshot) => (
          <div 
            {...provided.droppableProps} 
            ref={provided.innerRef} 
            className={`unassigned-recipes ${snapshot.isDraggingOver ? 'bg-gray-100' : ''}`}
          >
            {isAddingRecipe && (
              <AddRecipeInline
                onSave={handleAddRecipe}
                onCancel={() => setIsAddingRecipe(false)}
              />
            )}
            {recipes.map((recipe, index) => (
              <RecipeCard
                key={recipe.id} // Ensure this is unique for each recipe
                recipe={recipe}
                index={index}
                onEdit={onEditRecipe}
                onDelete={onDeleteRecipe}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default UnassignedRecipes;
