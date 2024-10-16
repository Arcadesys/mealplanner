import React, { useMemo } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import RecipeCard from './RecipeCard';
import { Recipe } from '../types/recipe';

interface UnassignedRecipesProps {
  recipes: Recipe[];
}

const UnassignedRecipes: React.FC<UnassignedRecipesProps> = ({ recipes }) => {
  // Generate stable IDs for each recipe card
  const recipeCards = useMemo(() => {
    return recipes.map((recipe, recipeIndex) => {
      const stableUniqueId = `${recipe.id}-${recipeIndex}-${Date.now()}`;
      return { 
        ...recipe, 
        stableUniqueId,
        id: stableUniqueId // Override the original id with our new unique id
      };
    });
  }, [recipes]);

  return (
    <Droppable droppableId="unassigned">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="unassigned-recipes"
        >
          {recipeCards.map((recipe, index) => (
            <div key={recipe.stableUniqueId} className="relative mb-4">
              <RecipeCard
                title={recipe.title}
                description={recipe.description}
                recipe={recipe}
                index={index}
                isOriginal={true}
                stableUniqueId={recipe.stableUniqueId}
                onOpenFullRecipe={() => {/* Define your function here */}}
                onDelete={() => {/* Add your delete logic here */}}
              />
            </div>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default UnassignedRecipes;
