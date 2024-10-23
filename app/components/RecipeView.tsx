import React from 'react';
import { Recipe } from '../types/recipe';
import { useRecipes } from '../hooks/useRecipes';
import RecipeCard from './RecipeCard';
import AddRecipeInline from './AddRecipeInline';
import FullRecipeView from './FullRecipeView';

interface RecipeViewProps {
  onAddRecipe: (newRecipe: Partial<Recipe>) => Promise<void>;
  onDeleteRecipe: (recipeId: string) => Promise<void>;
  onUpdateRecipe: (updatedRecipe: Recipe) => Promise<void>;
}

const RecipeView: React.FC<RecipeViewProps> = ({ onAddRecipe, onDeleteRecipe, onUpdateRecipe }) => {
  const [isAddingRecipe, setIsAddingRecipe] = React.useState(false);
  const [editingRecipe, setEditingRecipe] = React.useState<Recipe | null>(null);
  const { recipes, loading, error } = useRecipes();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading recipes</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <button
          onClick={() => setIsAddingRecipe(true)}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Recipe
        </button>

        {isAddingRecipe && (
          <AddRecipeInline
            onSave={(recipe) => {
              onAddRecipe(recipe);
              setIsAddingRecipe(false);
            }}
            onCancel={() => setIsAddingRecipe(false)}
          />
        )}
      </div>

      <div className="flex gap-4 h-[calc(100vh-200px)]">
        <div className="flex flex-col gap-4 flex-1 overflow-y-auto">
          <div className="flex flex-col gap-4">
            {recipes.map((recipe, index) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                index={index}
                onEdit={(recipe) => setEditingRecipe(recipe)}
                onDelete={onDeleteRecipe}
              />
            ))}
          </div>
        </div>

        {editingRecipe && (
          <div className="w-1/3 min-w-[300px] h-full">
            <FullRecipeView
              recipe={editingRecipe}
              onSave={(recipe) => {
                onUpdateRecipe(recipe);
                setEditingRecipe(null);
              }}
              onClose={() => setEditingRecipe(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeView;
