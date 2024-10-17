import React, { useState, useCallback } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Recipe } from '../types/recipe';
import FullRecipeView from './FullRecipeView';
import Modal from 'react-modal';

interface RecipeCardProps {
  title: string;
  description: string;
  recipe: Recipe;
  index: number;
  onDelete: () => void;
  isOriginal: boolean;
  stableUniqueId: string;
  onOpenFullRecipe: (recipe: Recipe) => void;
  onEdit: (recipe: Recipe) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ onEdit, ...props }) => {
  console.log('RecipeCard rendering for:', props.title);

  const handleEdit = useCallback(() => {
    console.log('Edit button clicked for recipe:', props);
    onEdit(props);
  }, [onEdit, props]);

  return (
    <Draggable draggableId={props.stableUniqueId} index={props.index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`recipe-card bg-yellow-100 border-2 border-solid border-black p-4 m-2 shadow-md transform rotate-1 hover:rotate-0 transition-transform duration-200`}
        >
          <h3 className="recipe-title text-lg font-bold mb-2">{props.title}</h3>
          <p className="recipe-description text-sm mb-4">{props.description}</p>
          {props.isOriginal && (
            <div className="flex items-center justify-between">
              <button
//empty for now
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
              >
                Delete
              </button>
              <button
                onClick={handleEdit}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded"
              >
                Edit
              </button>
            </div>
          )}
          <Modal
            isOpen={props.isModalOpen}
            onRequestClose={props.handleCloseModal}
            contentLabel="Full Recipe View"
          >
            <FullRecipeView
              recipe={props.recipe}
              onClose={props.handleCloseModal}
            />
          </Modal>
        </div>
      )}
    </Draggable>
  );
};

export default RecipeCard;
