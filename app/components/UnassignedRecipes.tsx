import React, { useState } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import RecipeCard from './RecipeCard';
import { Recipe } from '../types/mealPlanner';
import AddRecipeInline from './AddRecipeInline';

interface UnassignedRecipesProps {
  recipes: Recipe[];
  onAddRecipe: (newRecipe: Partial<Recipe>) => Promise<void>;
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

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Unassigned Recipes</h2>
      <AddRecipeInline
        onSave={async (recipe) => onAddRecipe(recipe)}
        onCancel={() => setIsAddingRecipe(false)}
      />
      <Droppable droppableId="unassigned">
        {(provided, snapshot) => (
          <div 
            {...provided.droppableProps} 
            ref={provided.innerRef} 
            className={`unassigned-recipes ${snapshot.isDraggingOver ? 'bg-gray-100' : ''}`}
          >
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
