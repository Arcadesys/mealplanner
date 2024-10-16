import React, { useState } from 'react';
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
}

const RecipeCard: React.FC<RecipeCardProps> = ({ title, description, recipe, index, onDelete, isOriginal, stableUniqueId, onOpenFullRecipe }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Draggable draggableId={stableUniqueId} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`recipe-card bg-yellow-100 border-2 border-solid border-black p-4 m-2 shadow-md transform rotate-1 hover:rotate-0 transition-transform duration-200`}
        >
          <h3 className="recipe-title text-lg font-bold mb-2">{title}</h3>
          <p className="recipe-description text-sm mb-4">{description}</p>
          {isOriginal && (
            <div className="flex items-center justify-between">
              <button
//empty for now
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
              >
                Delete
              </button>
              <button
                onClick={handleOpenModal}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded"
              >
                View Full Recipe
              </button>
            </div>
          )}
          <Modal
            isOpen={isModalOpen}
            onRequestClose={handleCloseModal}
            contentLabel="Full Recipe View"
          >
            <FullRecipeView
              recipe={recipe}
              onClose={handleCloseModal}
            />
          </Modal>
        </div>
      )}
    </Draggable>
  );
};

export default RecipeCard;
