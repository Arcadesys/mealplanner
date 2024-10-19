import React, { useState } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import RecipeCard from './RecipeCard';
import { Recipe } from '../types/recipe';
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

  const handleAddRecipe = async (newRecipe: Partial<Recipe>) => {
    await onAddRecipe(newRecipe);
    setIsAddingRecipe(false);
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
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="unassigned-recipes">
            {isAddingRecipe && (
              <AddRecipeInline
                onSave={handleAddRecipe}
                onCancel={() => setIsAddingRecipe(false)}
              />
            )}
            {recipes.map((recipe, index) => (
              <RecipeCard
                key={recipe.id}
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
