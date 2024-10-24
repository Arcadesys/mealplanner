import React, { useState } from 'react';
import { Recipe } from '../types/recipe';

interface FullRecipeViewProps {
  recipe: Recipe;
  onClose: () => void;
  onSave: (recipe: Recipe) => void;
}

const FullRecipeView: React.FC<FullRecipeViewProps> = ({ recipe, onClose, onSave }) => {
  const [editedRecipe, setEditedRecipe] = useState<Recipe>(recipe);
  const [ingredients, setIngredients] = useState<{[key: string]: string}>(
    recipe.ingredients || {}
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name !== 'ingredients') {
      setEditedRecipe(prev => ({ ...prev, [name]: value }));
    }
  };

  // New ingredient handling
  const handleIngredientChange = (index: number, field: 'name' | 'value', value: string) => {
    setIngredients(prev => {
      const newIngredients = { ...prev };
      if (field === 'name') {
        const oldValue = Object.values(prev)[index];
        delete newIngredients[Object.keys(prev)[index]];
        newIngredients[value] = oldValue;
      } else {
        newIngredients[Object.keys(prev)[index]] = value;
      }
      setEditedRecipe(prev => ({ ...prev, ingredients: newIngredients }));
      return newIngredients;
    });
  };

  const addIngredient = () => {
    setIngredients(prev => ({
      ...prev,
      '': ''
    }));
  };

  const removeIngredient = (key: string) => {
    setIngredients(prev => {
      const newIngredients = { ...prev };
      delete newIngredients[key];
      setEditedRecipe(prev => ({ ...prev, ingredients: newIngredients }));
      return newIngredients;
    });
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
        <div className="space-y-2">
          {Object.entries(ingredients).map(([key, value], index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={key}
                onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                placeholder="Ingredient name"
                className="w-1/2 p-2 border rounded text-sm bg-gray-700"
              />
              <input
                type="text"
                value={value}
                onChange={(e) => handleIngredientChange(index, 'value', e.target.value)}
                placeholder="Amount"
                className="w-1/2 p-2 border rounded text-sm bg-gray-700"
              />
              <button 
                onClick={() => removeIngredient(key)} 
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
          <button 
            onClick={addIngredient} 
            className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M21 12H3" />
            </svg>
          </button>
        </div>
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
