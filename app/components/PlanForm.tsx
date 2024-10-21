import React from 'react';
import { PlanFormData } from '../types/planFormData';

interface PlanFormProps {
  formData: PlanFormData;
  onChange: (newFormData: PlanFormData) => void;
  onSubmit: () => void;
}

const PlanForm: React.FC<PlanFormProps> = ({ formData, onChange, onSubmit }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    onChange({ ...formData, [name]: newValue });
  };

  const handleStepperChange = (name: string, increment: number) => {
    const newValue = Math.max(0, (formData[name as keyof typeof formData] as number) + increment);
    onChange({ ...formData, [name]: newValue });
  };

  const inputClass = "w-full p-2 border rounded dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300";
  const labelClass = "block mb-1 font-medium dark:text-gray-200";
  const helperTextClass = "mt-1 text-sm text-gray-500 dark:text-gray-400";

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold dark:text-gray-200">Meal Planning</h1>
        <button 
          onClick={onSubmit} 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Plan for Me
        </button>
      </div>
      <form className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {['breakfasts', 'lunches', 'dinners', 'snacks'].map((meal) => (
            <div key={meal} className="flex flex-col items-center">
              <label className="mb-1 capitalize">{meal}</label>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => handleStepperChange(meal, -1)}
                  className="px-2 py-1 border rounded-l dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  -
                </button>
                <input
                  type="number"
                  name={meal}
                  value={formData[meal as keyof typeof formData]}
                  onChange={handleChange}
                  className="w-12 text-center p-1 border-t border-b dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                />
                <button
                  type="button"
                  onClick={() => handleStepperChange(meal, 1)}
                  className="px-2 py-1 border rounded-r dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
        <div>
          <label className="flex items-center">
            <input type="checkbox" name="leftovers" checked={formData.leftovers} onChange={handleChange} className="mr-2" />
            <span className="dark:text-gray-200">Include Leftovers</span>
          </label>
          <p className={helperTextClass}>I'm cool with eating leftovers for some of these meals.</p>
        </div>
        <div>
          <label className={labelClass}>Cooking Mood</label>
          <textarea name="cookingMood" value={formData.cookingMood} onChange={handleChange} className={inputClass} />
          <p className={helperTextClass}>Describe your cooking mood, separated by commas.</p>
        </div>
        <div>
          <label className={labelClass}>Ingredients to Use</label>
          <textarea name="ingredientsToUse" value={formData.ingredientsToUse} onChange={handleChange} className={inputClass} />
          <p className={helperTextClass}>What do you have around to use? List ingredients separated by commas.</p>
        </div>
        <div>
          <label className={labelClass}>Ingredients to Avoid</label>
          <textarea name="ingredientsToAvoid" value={formData.ingredientsToAvoid} onChange={handleChange} className={inputClass} />
          <p className={helperTextClass}>List ingredients you want to avoid in your meals, separated by commas.</p>
        </div>
        <div>
          <label className={labelClass}>Dietary Restrictions</label>
          <textarea name="dietaryRestrictions" value={formData.dietaryRestrictions} onChange={handleChange} className={inputClass} />
          <p className={helperTextClass}>List any dietary restrictions you have, separated by commas.</p>
        </div>
        <div>
          <label className={labelClass}>Preferred Recipes</label>
          <textarea name="recipes" value={formData.recipes} onChange={handleChange} className={inputClass} />
          <p className={helperTextClass}>List recipes you'd like to make this week, separated by commas. You can even paste webpages and the tool will pick it up!</p>
        </div>
        <div>
          <label className={labelClass}>Cooking Tools</label>
          <div className="grid grid-cols-3 gap-4">
            {['Stove', 'Microwave', 'Air Fryer', 'Slow Cooker', 'Pressure Cooker'].map((tool) => (
              <label key={tool} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="cookingTools"
                  value={tool}
                  checked={formData.cookingTools.includes(tool)}
                  onChange={(e) => {
                    const updatedTools = e.target.checked
                      ? [...formData.cookingTools.split(','), tool].filter(Boolean).join(',')
                      : formData.cookingTools.split(',').filter(t => t !== tool).join(',');
                    handleChange({ target: { name: 'cookingTools', value: updatedTools } });
                  }}
                  className="form-checkbox"
                />
                <span className="dark:text-gray-200">{tool}</span>
              </label>
            ))}
            <input
              type="text"
              name="otherCookingTools"
              value={formData.otherCookingTools || ''}
              onChange={handleChange}
              placeholder="Other tools"
              className={`${inputClass} col-span-3`}
            />
          </div>
          <p className={helperTextClass}>Select the cooking tools you have available, or add your own.</p>
        </div>
      </form>
    </div>
  );
};

export default PlanForm;
