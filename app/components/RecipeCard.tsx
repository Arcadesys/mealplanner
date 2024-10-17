import React, { useCallback, useEffect } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Recipe } from '../types/recipe';
import FullRecipeView from './FullRecipeView';
import Modal from 'react-modal';

interface RecipeCardProps extends Recipe {
  title: string;
  description: string;
  index: number;
  onDelete: () => void;
  isOriginal: boolean;
  stableUniqueId: string;
  onOpenFullRecipe: (recipe: Recipe) => void;
  onEdit: (recipe: Recipe) => void;
  isModalOpen: boolean;
  handleCloseModal: () => void;
  className?: string;
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = (props) => {
  console.log('RecipeCard rendering. Full props:', props);

  const {
    onEdit,
    isModalOpen,
    handleCloseModal,
    recipe,
    title,
    description,
    index,
    onDelete,
    isOriginal,
    stableUniqueId,
    className,
  } = props;

  useEffect(() => {
    console.log('RecipeCard effect. Current recipe:', recipe);
  }, [recipe]);

  const handleEdit = useCallback(() => {
    console.log('Edit button clicked. Current recipe:', recipe);
    if (recipe) {
      onEdit(recipe);
    } else {
      console.error('Cannot edit: recipe is undefined');
    }
  }, [onEdit, recipe]);

  return (
    <Draggable draggableId={stableUniqueId} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`recipe-card bg-yellow-100 border-2 border-solid border-black p-4 m-2 shadow-md transform rotate-1 hover:rotate-0 transition-transform duration-200 ${className}`}
        >
          <h3 className="recipe-title text-lg font-bold mb-2">{title}</h3>
          <p className="recipe-description text-sm mb-4">{description}</p>
          {isOriginal && (
            <div className="flex items-center justify-between">
              <button
                onClick={onDelete}
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
