import React from 'react';

interface PlanFormProps {
  formData: {
    breakfasts: number;
    lunches: number;
    dinners: number;
    snacks: number;
    leftovers: boolean;
    ingredientsToUse: string;
    ingredientsToAvoid: string;
    dietaryRestrictions: string;
    recipes: string;
    availableIngredients: string;
    cookingTools: string;
    cookingMood: string;
  };
  onChange: (newFormData: PlanFormProps['formData']) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const PlanForm: React.FC<PlanFormProps> = ({ formData, onChange, onSubmit }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    onChange({ ...formData, [name]: newValue });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block">Breakfasts</label>
        <input type="number" name="breakfasts" value={formData.breakfasts} onChange={handleChange} className="w-full p-2 border rounded" />
      </div>
      <div>
        <label className="block">Lunches</label>
        <input type="number" name="lunches" value={formData.lunches} onChange={handleChange} className="w-full p-2 border rounded" />
      </div>
      <div>
        <label className="block">Dinners</label>
        <input type="number" name="dinners" value={formData.dinners} onChange={handleChange} className="w-full p-2 border rounded" />
      </div>
      <div>
        <label className="block">Snacks</label>
        <input type="number" name="snacks" value={formData.snacks} onChange={handleChange} className="w-full p-2 border rounded" />
      </div>
      <div>
        <label className="flex items-center">
          <input type="checkbox" name="leftovers" checked={formData.leftovers} onChange={handleChange} className="mr-2" />
          Include Leftovers
        </label>
      </div>
      <div>
        <label className="block">Ingredients to Use</label>
        <textarea name="ingredientsToUse" value={formData.ingredientsToUse} onChange={handleChange} className="w-full p-2 border rounded" />
      </div>
      <div>
        <label className="block">Ingredients to Avoid</label>
        <textarea name="ingredientsToAvoid" value={formData.ingredientsToAvoid} onChange={handleChange} className="w-full p-2 border rounded" />
      </div>
      <div>
        <label className="block">Dietary Restrictions</label>
        <textarea name="dietaryRestrictions" value={formData.dietaryRestrictions} onChange={handleChange} className="w-full p-2 border rounded" />
      </div>
      <div>
        <label className="block">Preferred Recipes</label>
        <textarea name="recipes" value={formData.recipes} onChange={handleChange} className="w-full p-2 border rounded" />
      </div>
      <div>
        <label className="block">Available Ingredients</label>
        <textarea name="availableIngredients" value={formData.availableIngredients} onChange={handleChange} className="w-full p-2 border rounded" />
      </div>
      <div>
        <label className="block">Cooking Tools</label>
        <textarea name="cookingTools" value={formData.cookingTools} onChange={handleChange} className="w-full p-2 border rounded" />
      </div>
      <div>
        <label className="block">Cooking Mood</label>
        <textarea name="cookingMood" value={formData.cookingMood} onChange={handleChange} className="w-full p-2 border rounded" />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Plan Meals</button>
    </form>
  );
};

export default PlanForm;

