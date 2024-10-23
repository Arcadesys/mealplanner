import React from 'react';
import { Recipe } from '../types/recipe';
import { useRecipes } from '../hooks/useRecipes';
import RecipeCard from './RecipeCard';
import AddRecipeInline from './AddRecipeInline';

interface RecipeViewProps {
  onAddRecipe: (newRecipe: Partial<Recipe>) => Promise<void>;
  onDeleteRecipe: (recipeId: string) => Promise<void>;
  onUpdateRecipe: (updatedRecipe: Recipe) => Promise<void>;
}

const RecipeView: React.FC<RecipeViewProps> = ({ onAddRecipe, onDeleteRecipe, onUpdateRecipe }) => {
  const [isAddingRecipe, setIsAddingRecipe] = React.useState(false);
  const { recipes, loading, error } = useRecipes();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading recipes</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-4">
        <button
          onClick={() => setIsAddingRecipe(true)}
          className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Recipe
        </button>

        {isAddingRecipe && (
          <AddRecipeInline
            onSave={onAddRecipe}
            onCancel={() => setIsAddingRecipe(false)}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recipes.map((recipe, index) => (
            <div key={recipe.id} className="recipe-card-container">
              <RecipeCard
                recipe={recipe}
                index={index}
                onEdit={() => onUpdateRecipe(recipe)}
                onDelete={() => onDeleteRecipe(recipe.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeView;
