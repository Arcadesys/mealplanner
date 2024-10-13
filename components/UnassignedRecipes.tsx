import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import RecipeCard from './RecipeCard';
import { Recipe } from '../components/types/recipe';


interface UnassignedRecipesProps {
  recipes: Recipe[];
}

const UnassignedRecipes: React.FC<UnassignedRecipesProps> = ({ recipes }) => {
  return (
    <Droppable droppableId="unassigned" direction="horizontal">
      {(droppableProvided) => (
        <div 
          ref={droppableProvided.innerRef} 
          {...droppableProvided.droppableProps}
        >
          <h3>Unassigned Recipes</h3>
          {recipes.map((recipe, index) => (
            <Draggable key={recipe.id} draggableId={recipe.id} index={index}>
              {(draggableProvided) => (
                <div
                  ref={draggableProvided.innerRef}
                  {...draggableProvided.draggableProps}
                  {...draggableProvided.dragHandleProps}
                >
                  <RecipeCard recipe={recipe} index={index} />
                </div>
              )}
            </Draggable>
          ))}
          {droppableProvided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default UnassignedRecipes;
