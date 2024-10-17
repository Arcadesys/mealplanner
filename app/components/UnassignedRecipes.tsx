import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import RecipeCard from './RecipeCard';
import { Recipe } from '../types/recipe';
import AddRecipeInline from './AddRecipeInline';
import FullRecipeView from './FullRecipeView';

const UnassignedRecipes: React.FC<{ recipes: Recipe[], setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>, onRecipeClick: (recipe: Recipe) => void }> = ({ recipes, setRecipes, onRecipeClick }) => {
  console.log('UnassignedRecipes component rendering');

  const [isFullRecipeViewOpen, setIsFullRecipeViewOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [isAddingRecipe, setIsAddingRecipe] = useState(false);

  useEffect(() => {
    // Fetch recipes from API
    const fetchRecipes = async () => {
      try {
        const response = await fetch('/api/recipes');
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  const recipeCards = useMemo(() => recipes.map((recipe, index) => ({
    ...recipe,
    stableUniqueId: `${recipe.id}-${index}-${Date.now()}`,
  })), [recipes]);

  const handleOpenFullRecipe = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setIsFullRecipeViewOpen(true);
  };

  const handleCloseFullRecipe = () => {
    setIsFullRecipeViewOpen(false);
    setEditingRecipe(null);
  };

  const handleAddRecipe = async (newRecipe: { title: string }) => {
    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecipe),
      });

      if (!response.ok) {
        throw new Error('Failed to add recipe');
      }

      const addedRecipe = await response.json();
      if (!addedRecipe.id) {
        addedRecipe.id = Date.now().toString(); // Temporary solution, use UUID in production
      }
      setRecipes(prevRecipes => [...prevRecipes, addedRecipe]);
      // We're not closing the form here anymore, that's handled in the AddRecipeInline component
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  const handleDeleteRecipe = async (recipeId: string) => {
    try {
      const response = await fetch(`/api/recipes/${recipeId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete recipe');
      }

      setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.id !== recipeId));
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  const handleUpdateRecipe = async (updatedRecipe: Partial<Recipe>) => {
    try {
      const response = await fetch(`/api/recipes/${updatedRecipe.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRecipe),
      });

      if (!response.ok) {
        throw new Error('Failed to update recipe');
      }

      const updatedRecipeFromServer = await response.json();
      setRecipes(prevRecipes => prevRecipes.map(recipe => 
        recipe.id === updatedRecipeFromServer.id ? updatedRecipeFromServer : recipe
      ));
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  };

  const handleEditRecipe = useCallback((recipe: Recipe) => {
    console.log('handleEditRecipe called with:', recipe);
    setEditingRecipe(recipe);
    setIsFullRecipeViewOpen(true);
  }, []);

  useEffect(() => {
    console.log('State changed:');
    console.log('editingRecipe:', editingRecipe);
    console.log('isFullRecipeViewOpen:', isFullRecipeViewOpen);
  }, [editingRecipe, isFullRecipeViewOpen]);

  // ... in your render method, right before returning JSX
  console.log('About to render UnassignedRecipes');
  console.log('Current editingRecipe:', editingRecipe);
  console.log('isFullRecipeViewOpen:', isFullRecipeViewOpen);

  return (
    <div>
      <button
        onClick={() => setIsAddingRecipe(true)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Recipe
      </button>

      <Droppable droppableId="unassigned">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="unassigned-recipes">
            {isAddingRecipe && (
              <AddRecipeInline
                onSave={handleAddRecipe}
                onCancel={() => setIsAddingRecipe(false)}
              />
            )}
            {recipeCards.map((recipe, index) => {
              console.log('Rendering RecipeCard for:', recipe);
              return (
                <RecipeCard
                key={recipe.id}
                {...recipe}
                recipe={recipe}
                index={index}
                onEdit={handleEditRecipe}
                onOpenFullRecipe={handleOpenFullRecipe}
                isModalOpen={isFullRecipeViewOpen && editingRecipe?.id === recipe.id}
                handleCloseModal={handleCloseFullRecipe}
                onDelete={() => handleDeleteRecipe(recipe.id)}
                isOriginal={true}
                className="recipe-card"
                stableUniqueId={recipe.id.toString()}
              />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {isFullRecipeViewOpen && editingRecipe && (
        <FullRecipeView
          recipe={editingRecipe!}
          onClose={() => {
            console.log('Closing FullRecipeView');
            setIsFullRecipeViewOpen(false);
            setEditingRecipe(null);
          }}
          onSave={handleUpdateRecipe}
        />
      )}
    </div>
  );
};

export default UnassignedRecipes;
