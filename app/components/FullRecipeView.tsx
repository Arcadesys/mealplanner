import React from 'react';
import { Recipe } from '@types/recipe';

interface FullRecipeViewProps {
  recipe: Recipe;
  onClose: () => void;
  onSave: (recipe: Recipe) => void;
}

const FullRecipeView: React.FC<FullRecipeViewProps> = ({ recipe, onClose, onSave }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg mb-4 text-white">
      <h2 className="text-2xl font-bold mb-4">Recipe Details</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          value={recipe.title}
          readOnly
          className="w-full p-2 border rounded text-sm bg-gray-700"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={recipe.description}
          readOnly
          rows={3}
          className="w-full p-2 border rounded text-sm bg-gray-700"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Ingredients</label>
        <ul className="list-disc list-inside">
          {Object.entries(recipe.ingredients).map(([ingredient, amount]) => (
            <li key={ingredient}>{`${ingredient}: ${amount}`}</li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Instructions</label>
        <ol className="list-decimal list-inside">
          {recipe.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </div>

      <button 
        onClick={onClose} 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Close
      </button>
    </div>
  );
};

export default FullRecipeView;
