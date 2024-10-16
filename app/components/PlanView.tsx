//a modal that allows a user to plan their meals for the week.

import React, { useState, useEffect } from 'react';
import UnassignedRecipes from './UnassignedRecipes';
import { DragDropContext } from '@hello-pangea/dnd';
import FullRecipeView from './FullRecipeView';
import Modal from 'react-modal';
import { Recipe } from '../types/recipe';

const PlanView: React.FC = () => {
  const [formData, setFormData] = useState({
    totalMeals: '',
    breakfasts: '',
    lunches: '',
    dinners: '',
    leftovers: false,
    ingredientsToUse: '',
    ingredientsToAvoid: '',
    dietaryRestrictions: '',
    recipes: '',
    availableIngredients: '',
    cookingTools: '',
    cookingMood: '',
  });

  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  // Add a useEffect to fetch recipes if needed
  useEffect(() => {
    // Fetch recipes here and update the state
    // For now, let's just set an empty array
    setRecipes([]);
  }, []);

  // Add this function to handle opening the modal
  const handleOpenRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  // Add this function to handle closing the modal
  const handleCloseRecipe = () => {
    setSelectedRecipe(null);
  };

  return (
    <DragDropContext onDragEnd={() => {}}>
      <div className="flex h-screen overflow-hidden dark:bg-gray-800 dark:text-white">
        <div className="flex-1 p-4 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">Meal Planning</h2>
          <form onSubmit={handleSubmit}>
            
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300">Breakfasts</label>
              <input
                type="range"
                name="breakfasts"
                value={formData.breakfasts}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
                min="0"
                max="10"
                step="1"
                required
              />
              
              <label className="block text-gray-700 dark:text-gray-300 mt-2">Lunches</label>
              <input
                type="range"
                name="lunches"
                value={formData.lunches}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
                min="0"
                max="10"
                step="1"
                required
              />
              
              <label className="block text-gray-700 dark:text-gray-300 mt-2">Dinners</label>
              <input
                type="range"
                name="dinners"
                value={formData.dinners}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
                min="0"
                max="10"
                step="1"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="leftovers"
                  checked={formData.leftovers}
                  onChange={handleChange}
                  className="form-checkbox"
                />
                <span className="ml-2">Do you want to have leftovers?</span>
              </label>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300">What ingredients do you want to use?</label>
              <textarea
                name="ingredientsToUse"
                value={formData.ingredientsToUse}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
                rows={3}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300">What ingredients do you want to avoid?</label>
              <textarea
                name="ingredientsToAvoid"
                value={formData.ingredientsToAvoid}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
                rows={3}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300">Do you have food allergies or dietary restrictions?</label>
              <textarea
                name="dietaryRestrictions"
                value={formData.dietaryRestrictions}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
                rows={3}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300">What recipes do you want to make?</label>
              <textarea
                name="recipes"
                value={formData.recipes}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
                rows={3}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300">What ingredients do you have around?</label>
              <textarea
                name="availableIngredients"
                value={formData.availableIngredients}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
                rows={3}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300">What cooking tools do you have around?</label>
              <textarea
                name="cookingTools"
                value={formData.cookingTools}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
                rows={3}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300">How do you feel about cooking this week?</label>
              <textarea
                name="cookingMood"
                value={formData.cookingMood}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
                rows={3}
              />
            </div>
            
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Plan Meals
            </button>
          </form>
        </div>
        <div className="w-1/3 p-4 overflow-y-auto border-l border-gray-200 dark:border-gray-700">
          <UnassignedRecipes 
            recipes={recipes} 
            setRecipes={setRecipes}
            onRecipeClick={handleOpenRecipe} 
          />
        </div>
      </div>
      
      {/* Add the Modal component */}
      <Modal
        isOpen={selectedRecipe !== null}
        onRequestClose={handleCloseRecipe}
        contentLabel="Recipe Details"
      >
        {selectedRecipe && (
          <FullRecipeView 
            recipe={selectedRecipe} 
            onClose={handleCloseRecipe}
            onSave={() => {}} // Add this line
          />
        )}
      </Modal>
    </DragDropContext>
  );
};

export default PlanView;
