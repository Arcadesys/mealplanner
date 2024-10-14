import React, { useState, useCallback, useMemo } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import RecipeCard from './RecipeCard';
import { Recipe } from '../types/recipe';

interface UnassignedRecipesProps {
  recipes: Recipe[];
}

const UnassignedRecipes: React.FC<UnassignedRecipesProps> = ({ recipes }) => {
  const [helpings, setHelpings] = useState<{ [key: string]: number }>({});

  const handleHelpingsChange = useCallback((recipeId: string, newHelpings: number) => {
    setHelpings(prev => ({ ...prev, [recipeId]: newHelpings }));
  }, []);

  // Generate stable IDs for each recipe card
  const recipeCards = useMemo(() => {
    return recipes.flatMap((recipe, recipeIndex) => {
      const recipeHelpings = helpings[recipe.id] || 1;
      return Array.from({ length: recipeHelpings }, (_, helpingIndex) => {
        const stableUniqueId = `${recipe.id}-${recipeIndex}-${helpingIndex}-${Date.now()}`;
        return { 
          ...recipe, 
          stableUniqueId, 
          helpingIndex,
          id: stableUniqueId // Override the original id with our new unique id
        };
      });
    });
  }, [recipes, helpings]);

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
                helpings={helpings[recipe.id] || 1}
                onHelpingsChange={(newHelpings) => handleHelpingsChange(recipe.id, newHelpings)}
                isOriginal={recipe.helpingIndex === 0}
                stableUniqueId={recipe.stableUniqueId}
              />
              {recipe.helpingIndex > 0 && (
                <div 
                  className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-200 dark:bg-gray-700 -z-10 transform translate-y-1 rounded-b-lg"
                  style={{ 
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    clipPath: 'inset(8px 0px 0px 0px)'
                  }}
                />
              )}
            </div>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default UnassignedRecipes;
