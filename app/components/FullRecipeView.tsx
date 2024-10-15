import React from 'react';
import Modal from 'react-modal';

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

const FullRecipeModal: React.FC<{ recipe: Recipe; isOpen: boolean; onRequestClose: () => void }> = ({ recipe, isOpen, onRequestClose }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Full Recipe Modal">
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.quantity} {ingredient.measure} {ingredient.name}
          </li>
        ))}
      </ul>
      <h2>Instructions</h2>
      <ol>
        {recipe.instructions.map((instruction) => (
          <li key={instruction.order}>{instruction.instruction}</li>
        ))}
      </ol>
      <p>Prep Time: {recipe.prepTime} minutes</p>
      <p>Cook Time: {recipe.cookTime} minutes</p>
      <p>Servings: {recipe.servings}</p>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default FullRecipeModal;

