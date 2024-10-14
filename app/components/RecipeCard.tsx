import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Recipe } from '../types/recipe';

interface RecipeCardProps {
  title: string;
  description: string;
  recipe: Recipe;
  index: number;
  helpings: number;
  onHelpingsChange: (newHelpings: number) => void;
  isOriginal: boolean;
  stableUniqueId: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ title, description, recipe, index, helpings, onHelpingsChange, isOriginal, stableUniqueId }) => {
  const increaseHelpings = () => onHelpingsChange(helpings + 1);
  const decreaseHelpings = () => onHelpingsChange(Math.max(1, helpings - 1));
  const addLeftovers = () => onHelpingsChange(helpings + recipe.servings);

  return (
    <Draggable draggableId={stableUniqueId} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`recipe-card bg-yellow-100 border-2 border-dashed border-black rounded-lg p-4 m-2 shadow-md transform rotate-1 hover:rotate-0 transition-transform duration-200`}
        >
          <h3 className="recipe-title text-lg font-bold mb-2">{title}</h3>
          <p className="recipe-description text-sm mb-4">{description}</p>
          {isOriginal && (
            <div className="flex items-center justify-between">
              <span className="text-sm">Servings: {helpings}</span>
              <div className="space-x-1">
                <button onClick={decreaseHelpings} className="px-2 py-1 bg-red-400 text-white rounded-full text-xs">-</button>
                <button onClick={increaseHelpings} className="px-2 py-1 bg-green-400 text-white rounded-full text-xs">+</button>
                <button onClick={addLeftovers} className="px-2 py-1 bg-blue-400 text-white rounded-full text-xs" title="Add leftovers">L</button>
              </div>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default RecipeCard;
