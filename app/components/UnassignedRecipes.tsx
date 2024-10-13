import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { Recipe } from '../types/recipe';

interface UnassignedRecipesProps {
  recipes: Recipe[];
}

const UnassignedRecipes: React.FC<UnassignedRecipesProps> = ({ recipes }) => {
  return (
    <Droppable droppableId="unassigned">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="space-y-4"
        >
          {recipes.map((recipe, index) => (
            <Draggable key={recipe.id} draggableId={recipe.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="bg-white p-4 rounded shadow"
                >
                  <h3 className="font-semibold">{recipe.name}</h3>
                  <p className="text-sm text-gray-600">{recipe.description}</p>
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
