import React, { useMemo, useState, useEffect } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import RecipeCard from './RecipeCard';
import { Recipe } from '../types/recipe';
import AddRecipe from './addRecipe';
import FullRecipeView from './FullRecipeView';

const UnassignedRecipes: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isFullRecipeViewOpen, setIsFullRecipeViewOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [isAddRecipeModalOpen, setIsAddRecipeModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState<{ x: number; y: number } | null>(null);

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

  const handleOpenModal = (event: React.MouseEvent) => {
    setModalPosition({ x: event.clientX, y: event.clientY });
    setIsAddRecipeModalOpen(true);
  };

  return (
    <div>
      <button
        onClick={handleOpenModal}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Recipe
      </button>

      <Droppable droppableId="unassigned">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="unassigned-recipes">
            {recipeCards.map((recipe, index) => (
              <div key={recipe.stableUniqueId} className="relative mb-4">
                <RecipeCard
                  {...recipe}
                  index={index}
                  isOriginal={true}
                  onOpenFullRecipe={() => handleOpenFullRecipe(recipe)}
                  onDelete={() => handleDeleteRecipe(recipe.id)}
                />
              </div>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {isFullRecipeViewOpen && editingRecipe && (
        <FullRecipeView
          recipe={editingRecipe}
          onClose={handleCloseFullRecipe}
          onSave={handleAddRecipe}
        />
      )}

      {isAddRecipeModalOpen && (
        <AddRecipe
          onClose={() => setIsAddRecipeModalOpen(false)}
          onSave={(newRecipe) => {
            handleAddRecipe(newRecipe);
            setIsAddRecipeModalOpen(false);
          }}
          onAddCard={(title) => {
            // You can remove this if you're not using it
            console.log('New card added:', title);
          }}
          position={modalPosition || undefined}
        />
      )}
    </div>
  );
};

export default UnassignedRecipes;
