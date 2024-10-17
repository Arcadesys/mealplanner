import React from 'react';
import { Recipe } from '@types/recipe';

interface FullRecipeViewProps {
  recipe: Recipe;
  onClose: () => void;
}

const FullRecipeView: React.FC<FullRecipeViewProps> = ({ recipe, onClose }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg mb-4 text-white">
      <h2 className="text-2xl font-bold mb-4">{recipe.title || 'Untitled Recipe'}</h2>
      
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Description</h3>
        <p className="text-sm">{recipe.description || 'No description available'}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
        <ul className="list-disc list-inside">
          {recipe.ingredients?.map((ingredient, index) => (
            <li key={index} className="text-sm">{ingredient}</li>
          )) || <li className="text-sm">No ingredients listed</li>}
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Instructions</h3>
        <ol className="list-decimal list-inside">
          {recipe.instructions?.map((step, index) => (
            <li key={index} className="text-sm mb-1">{step}</li>
          )) || <li className="text-sm">No instructions available</li>}
        </ol>
      </div>

      {recipe.prepTime && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Prep Time</h3>
          <p className="text-sm">{recipe.prepTime} minutes</p>
        </div>
      )}

      {recipe.cookTime && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Cook Time</h3>
          <p className="text-sm">{recipe.cookTime} minutes</p>
        </div>
      )}

      {recipe.servings && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Servings</h3>
          <p className="text-sm">{recipe.servings}</p>
        </div>
      )}

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
