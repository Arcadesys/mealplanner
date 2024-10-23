import React, { useState } from 'react';
import { Recipe } from '../types/recipe';

interface FullRecipeViewProps {
  recipe: Recipe;
  onClose: () => void;
  onSave: (recipe: Recipe) => void;
}

const FullRecipeView: React.FC<FullRecipeViewProps> = ({ recipe, onClose, onSave }) => {
  const [editedRecipe, setEditedRecipe] = useState<Recipe>(recipe);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedRecipe(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(editedRecipe);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg mb-4 text-white h-full max-w-4xl w-full mx-auto">
      <h2 className="text-2xl font-bold mb-4">Recipe Details</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={editedRecipe.title}
          onChange={handleChange}
          className="w-full p-2 border rounded text-sm bg-gray-700"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={editedRecipe.description}
          onChange={handleChange}
          rows={3}
          className="w-full p-2 border rounded text-sm bg-gray-700"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Ingredients</label>
        <textarea
          name="ingredients"
          value={editedRecipe.ingredients || ''}
          onChange={handleChange}
          rows={5}
          placeholder="Enter ingredients, one per line"
          className="w-full p-2 border rounded text-sm bg-gray-700"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Instructions</label>
        <textarea
          name="instructions"
          value={editedRecipe.instructions || ''}
          onChange={handleChange}
          rows={5}
          placeholder="Enter instructions, one per line"
          className="w-full p-2 border rounded text-sm bg-gray-700"
        />
      </div>

      <div className="flex justify-end gap-2">
        <button 
          onClick={handleSave} 
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Save
        </button>
        <button 
          onClick={onClose} 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default FullRecipeView;
