//a modal that allows a user to plan their meals for the week.

import React, { useState, useEffect } from 'react';
import UnassignedRecipes from './UnassignedRecipes';
import { DragDropContext } from '@hello-pangea/dnd';
import FullRecipeView from './FullRecipeView';
import Modal from 'react-modal';
import { Recipe } from '../types/recipe';

const PlanView: React.FC = () => {
  const [formData, setFormData] = useState({
    breakfasts: 0,
    lunches: 0,
    dinners: 0,
    snacks: 0,
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

  const handleStepperChange = (field: string, value: number) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: Math.max(0, value), // Ensure value doesn't go below 0
    }));
  };

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

  const handleGenerateMealPlan = () => {
    // TODO: Implement meal plan generation logic
    console.log("Generating meal plan...");
  };

  return (
    <DragDropContext onDragEnd={() => {}}>
      <div className="flex h-screen overflow-hidden dark:bg-gray-800 dark:text-white">
        <div className="flex-1 p-4 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">Meal Planning</h2>
          <form onSubmit={handleSubmit} className="pb-8">
            
            <div className="mb-4 grid grid-cols-2 gap-4">
              {['breakfasts', 'dinners', 'lunches', 'snacks'].map((meal) => (
                <div key={meal} className="flex items-center">
                  <label className="mr-2 capitalize">{meal}:</label>
                  <button type="button" onClick={() => handleStepperChange(meal, formData[meal] - 1)} className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded-l">-</button>
                  <input
                    type="number"
                    name={meal}
                    value={formData[meal]}
                    onChange={(e) => handleStepperChange(meal, parseInt(e.target.value) || 0)}
                    className="w-12 text-center border-t border-b dark:bg-gray-700 dark:text-white"
                    min="0"
                  />
                  <button type="button" onClick={() => handleStepperChange(meal, formData[meal] + 1)} className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded-r">+</button>
                </div>
              ))}
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
                <span className="ml-2">Are you okay with eating leftovers for some meals?</span>
              </label>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300">What ingredients do you want to use?</label>
              <textarea
                name="ingredientsToUse"
                value={formData.ingredientsToUse}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full dark:bg-gray-700 dark:text-white"
                rows={3}
                placeholder="List any ingredients you want to use (or use up) this week."
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300">What ingredients do you want to avoid?</label>
              <textarea
                name="ingredientsToAvoid"
                value={formData.ingredientsToAvoid}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full dark:bg-gray-700 dark:text-white"
                rows={3}
                placeholder="List any ingredients you'd rather not see on your plate this week."
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300">Do you have food allergies or dietary restrictions?</label>
              <textarea
                name="dietaryRestrictions"
                value={formData.dietaryRestrictions}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full dark:bg-gray-700 dark:text-white"
                rows={3}
                placeholder="Tell us about any allergies or dietary needs (e.g., vegetarian, gluten-free)."
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300">What recipes do you want to make?</label>
              <textarea
                name="recipes"
                value={formData.recipes}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full dark:bg-gray-700 dark:text-white"
                rows={3}
                placeholder="List any specific recipes you're craving this week. (Protip: paste urls from other sites here!)"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300">What ingredients do you have around?</label>
              <textarea
                name="availableIngredients"
                value={formData.availableIngredients}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full dark:bg-gray-700 dark:text-white"
                rows={3}
                placeholder="List the ingredients you already have in your kitchen."
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300">What cooking tools do you have around?</label>
              <textarea
                name="cookingTools"
                value={formData.cookingTools}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full dark:bg-gray-700 dark:text-white"
                rows={3}
                placeholder="List your available cooking tools (e.g., slow cooker, air fryer)."
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300">How do you feel about cooking this week?</label>
              <textarea
                name="cookingMood"
                value={formData.cookingMood}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full dark:bg-gray-700 dark:text-white"
                rows={3}
                placeholder="Describe your cooking mood (e.g., adventurous, need quick meals)."
              />
            </div>
            
            <div className="flex justify-between items-center mt-8">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                Plan Meals
              </button>
              <button
                type="button"
                onClick={handleGenerateMealPlan}
                className="bg-green-500 text-white px-6 py-3 text-lg font-bold rounded hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 transition-colors duration-200"
              >
                Generate My Meal Plan
              </button>
            </div>
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
