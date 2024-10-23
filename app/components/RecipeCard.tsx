import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Recipe } from '../types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
  index: number;
  onEdit: (recipe: Recipe) => void;
  onDelete: (id: string) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, index, onEdit, onDelete }) => {
  return (
    <Draggable draggableId={recipe.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="recipe-card bg-yellow-100 border-2 border-solid border-black p-4 m-2 shadow-md transform rotate-1 hover:rotate-0 transition-transform duration-200"
        >
          <h3 className="recipe-title text-lg font-bold mb-2">{recipe.title}</h3>
          <p className="recipe-description text-sm mb-4">{recipe.description}</p>
          <div className="flex items-center justify-between">
            <button
              onClick={() => onDelete(recipe.id)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
            >
              Delete
            </button>
            <button
              onClick={() => onEdit(recipe)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded"
            >
              Edit
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default RecipeCard;
