import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import RecipeCard from './RecipeCard';
import { Recipe } from '../types/recipe';

interface UnassignedRecipesProps {
  recipes: Recipe[];
}

const UnassignedRecipes: React.FC<UnassignedRecipesProps> = ({ recipes }) => {
  return (
    <Droppable droppableId="unassigned">
      {(provided) => (
        <div 
          className="unassigned-recipes"
          ref={provided.innerRef} 
          {...provided.droppableProps}
        >
          {recipes.map((recipe, index) => (
            <Draggable key={recipe.id} draggableId={recipe.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="draggable-item"
                >
                  <RecipeCard recipe={recipe} index={index} />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default UnassignedRecipes;