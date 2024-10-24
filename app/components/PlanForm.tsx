import React from 'react';
import { MealPlanRequest, Recipe } from '../types/mealPlanner';
import GenerateMealPlan from './GenerateMealPlan';

interface PlanFormProps {
  formData: MealPlanRequest;
  onChange: (newFormData: MealPlanRequest) => void;
  onSubmit: () => void;
  className?: string;
  recipes: Recipe[]; // Add this line
}

const PlanForm: React.FC<PlanFormProps> = ({ formData, onChange, onSubmit, className, recipes }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    onChange({ ...formData, [name]: newValue });
  };

  const handleStepperChange = (name: string, increment: number) => {
    const currentValue = formData[name as keyof typeof formData] as number;
    const newValue = Math.max(0, currentValue + increment);
    onChange({ ...formData, [name]: newValue });
  };

  // Style classes
  const inputClass = "w-full p-2 border rounded dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300";
  const labelClass = "block mb-1 font-medium dark:text-gray-200";
  const helperTextClass = "mt-1 text-sm text-gray-500 dark:text-gray-400";

  return (
    <div className={`${className} max-h-[calc(100vh-12rem)] overflow-y-auto`}>
      <div className="space-y-6">
        {/* Meal counts section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['breakfasts', 'lunches', 'dinners', 'snacks'].map((meal) => (
            <div key={meal} className="flex items-center space-x-2">
              <label className={labelClass}>{meal.charAt(0).toUpperCase() + meal.slice(1)}:</label>
              <button
                onClick={() => handleStepperChange(meal, -1)}
                className="px-3 py-1 border rounded"
              >
                -
              </button>
              <input
                type="number"
                name={meal}
                value={formData[meal as keyof typeof formData]}
                onChange={handleChange}
                className="w-20 text-center p-2 border rounded"
                min="0"
              />
              <button
                onClick={() => handleStepperChange(meal, 1)}
                className="px-3 py-1 border rounded"
              >
                +
              </button>
            </div>
          ))}
        </div>

        {/* Preferences section */}
        <div className="space-y-4">
          <div>
            <label className={labelClass}>
              <input
                type="checkbox"
                name="leftovers"
                checked={formData.leftovers as boolean}
                onChange={handleChange}
                className="mr-2"
              />
              Plan for leftovers
            </label>
          </div>

          <div>
            <label className={labelClass}>Ingredients to Use</label>
            <textarea
              name="ingredientsToUse"
              value={formData.ingredientsToUse}
              onChange={handleChange}
              className={inputClass}
              rows={2}
            />
            <p className={helperTextClass}>Comma-separated list of ingredients you'd like to use</p>
          </div>

          <div>
            <label className={labelClass}>Ingredients to Avoid</label>
            <textarea
              name="ingredientsToAvoid"
              value={formData.ingredientsToAvoid}
              onChange={handleChange}
              className={inputClass}
              rows={2}
            />
          </div>

          <div>
            <label className={labelClass}>Dietary Restrictions</label>
            <textarea
              name="dietaryRestrictions"
              value={formData.dietaryRestrictions}
              onChange={handleChange}
              className={inputClass}
              rows={2}
            />
          </div>

          <div>
            <label className={labelClass}>Available Cooking Tools</label>
            <textarea
              name="cookingTools"
              value={formData.cookingTools}
              onChange={handleChange}
              className={inputClass}
              rows={2}
            />
          </div>

          <div>
            <label className={labelClass}>Available Ingredients</label>
            <textarea
              name="availableIngredients"
              value={formData.availableIngredients}
              onChange={handleChange}
              className={inputClass}
              rows={2}
              placeholder="List ingredients you have on hand"
            />
            <p className={helperTextClass}>What's in your pantry/fridge?</p>
          </div>

          <div>
            <label className={labelClass}>Preferred Recipes</label>
            <textarea
              name="recipes"
              value={formData.recipes}
              onChange={handleChange}
              className={inputClass}
              rows={2}
              placeholder="Any specific recipes you'd like to include?"
            />
            <p className={helperTextClass}>List any favorite recipes you'd like to include</p>
          </div>
        </div>
        <div className="mt-6">
          <GenerateMealPlan 
            formData={formData}
            onGenerate={onSubmit}
            allRecipes={recipes} // Updated to use the recipes prop
          />
        </div>
      </div>
    </div>
  );
};

export default PlanForm;
