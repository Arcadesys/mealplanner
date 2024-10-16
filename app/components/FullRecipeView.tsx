import React from 'react';
import Modal from 'react-modal';
import { useDarkMode } from './DarkModeProvider';

interface Ingredient {
  name: string;
  quantity: number;
  measure: string;
}

interface Instruction {
  order: number;
  instruction: string;
}

interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  prepTime: number;
  cookTime: number;
  servings: number;
}

const FullRecipeView: React.FC<{ recipe: Recipe; onClose: () => void }> = ({ recipe, onClose }) => {
  const { darkMode } = useDarkMode();

  return (
    <div className={`full-recipe-view ${darkMode ? 'dark bg-cartoon-black text-cartoon-white' : 'bg-cartoon-white text-cartoon-black'} p-6 rounded-cartoon shadow-cartoon`}>
      <h1 className="text-2xl font-bold mb-4 font-cartoon">{recipe.title}</h1>
      <p className="mb-2">{recipe.description}</p>
      <p className="mb-1">Prep Time: {recipe.prepTime} minutes</p>
      <p className="mb-1">Cook Time: {recipe.cookTime} minutes</p>
      <p className="mb-4">Servings: {recipe.servings}</p>
      <h2 className="text-xl font-semibold mb-2 font-cartoon">Ingredients</h2>
      <ul className="list-disc pl-5 mb-4">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index} className="mb-1">
            {ingredient.quantity} {ingredient.measure} {ingredient.name}
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-semibold mb-2 font-cartoon">Instructions</h2>
      <ol className="list-decimal pl-5 mb-4">
        {recipe.instructions.map((instruction) => (
          <li key={instruction.order} className="mb-2">{instruction.instruction}</li>
        ))}
      </ol>

      <button 
        onClick={onClose}
        className="px-4 py-2 bg-blue-500 text-white rounded-cartoon shadow-cartoon hover:shadow-cartoon-hover transition-shadow duration-200 font-cartoon"
      >
        Close
      </button>
    </div>
  );
};

export default FullRecipeView;
