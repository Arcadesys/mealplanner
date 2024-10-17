import React from 'react';
import { Recipe } from '../types/recipe';

interface FullRecipeViewProps {
  recipe: Recipe;
  onClose: () => void;
  onSave: (recipe: Recipe) => void;
}

const FullRecipeView: React.FC<FullRecipeViewProps> = ({ recipe, onClose, onSave }) => {
  if (!recipe) {
    return <div>No recipe selected. How about we cook up some data?</div>;
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg mb-4 text-white">
      <h2 className="text-2xl font-bold mb-4">Recipe Details</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          value={recipe.title || 'Untitled Recipe'}
          readOnly
          className="w-full p-2 border rounded text-sm bg-gray-700"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={recipe.description || 'No description available'}
          readOnly
          rows={3}
          className="w-full p-2 border rounded text-sm bg-gray-700"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Ingredients</label>
        <ul className="list-disc list-inside">
          {recipe.ingredients && Object.keys(recipe.ingredients).length > 0 ? (
            Object.entries(recipe.ingredients).map(([ingredient, amount]) => (
              <li key={ingredient}>{`${ingredient}: ${amount}`}</li>
            ))
          ) : (
            <li>No ingredients listed. Time to go shopping!</li>
          )}
        </ul>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Instructions</label>
        <ol className="list-decimal list-inside">
          {Array.isArray(recipe.instructions) && recipe.instructions.length > 0 ? (
            recipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))
          ) : typeof recipe.instructions === 'string' && recipe.instructions.trim() !== '' ? (
            <li>{recipe.instructions}</li>
          ) : recipe.instructions && typeof recipe.instructions === 'object' && Object.keys(recipe.instructions).length > 0 ? (
            Object.entries(recipe.instructions).map(([key, value]) => (
              <li key={key}>{`${key}: ${value}`}</li>
            ))
          ) : (
            <li>No instructions available. Time to get creative!</li>
          )}
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
