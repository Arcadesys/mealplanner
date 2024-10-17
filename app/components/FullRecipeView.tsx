import React from 'react';
import { Recipe } from '../types/recipe';

interface FullRecipeViewProps {
  recipe: Recipe;
  onClose: () => void;
  onSave: (recipe: Recipe) => void;
}

const FullRecipeView: React.FC<FullRecipeViewProps> = ({ recipe, onClose, onSave }) => {
  const handleSave = () => {
    const updatedRecipe = {
      ...recipe,
      ingredients: typeof recipe.ingredients === 'string' ? recipe.ingredients.split('\n') : [],
      instructions: typeof recipe.instructions === 'string' ? recipe.instructions.split('\n') : [],
    };
    onSave(updatedRecipe);
  };

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
        <textarea
          value={recipe.ingredients ? Object.entries(recipe.ingredients).map(([ingredient, amount]) => `${ingredient}: ${amount}`).join('\n') : 'No ingredients listed. Time to go shopping!'}
          readOnly
          rows={5}
          className="w-full p-2 border rounded text-sm bg-gray-700"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Instructions</label>
        <textarea
          value={Array.isArray(recipe.instructions) ? recipe.instructions.join('\n') : typeof recipe.instructions === 'string' ? recipe.instructions : recipe.instructions && typeof recipe.instructions === 'object' ? Object.entries(recipe.instructions).map(([key, value]) => `${key}: ${value}`).join('\n') : 'No instructions available. Time to get creative!'}
          readOnly
          rows={5}
          className="w-full p-2 border rounded text-sm bg-gray-700"
        />
      </div>

      <button 
        onClick={handleSave} 
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
      >
        Save
      </button>
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
