import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Recipe } from '../types/recipe';

interface RecipeCardProps {
  title: string;
  description: string;
  recipe: Recipe;
  index: number;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ title, description, recipe, index }) => {
  return (
    <Draggable draggableId={recipe.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`recipe-card bg-white dark:bg-gray-800 border-2 border-transparent dark:border-purple-500 rounded-lg shadow-lg overflow-hidden transition-all duration-200 ${snapshot.isDragging ? 'opacity-75' : ''}`}
        >
          <div className="p-4">
            <h3 className="recipe-title text-gray-800 dark:text-white font-bold mb-2">{title}</h3>
            <p className="recipe-description text-gray-600 dark:text-gray-300">{description}</p>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default RecipeCard;
