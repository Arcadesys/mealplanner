import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Recipe } from '../types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
  index: number;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, index }) => {
  return (
    <Draggable draggableId={recipe.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`recipe-card ${snapshot.isDragging ? 'opacity-75' : ''}`}
        >
          <h3 className="recipe-title">{recipe.title}</h3>
          <p className="recipe-description">{recipe.description}</p>
        </div>
      )}
    </Draggable>
  );
};

export default RecipeCard;