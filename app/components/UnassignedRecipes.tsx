import React, { useState, useEffect, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import RecipeCard from './RecipeCard';
import { Recipe } from '../types/recipe';
import AddRecipeInline from './AddRecipeInline';
import FullRecipeView from './FullRecipeView';
import Scheduler from './Scheduler';

const UnassignedRecipes: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [assignedRecipes, setAssignedRecipes] = useState<{ [key: string]: Recipe[] }>({});
  const [isAddingRecipe, setIsAddingRecipe] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

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

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      // Reordering within the same list
      const items = reorder(
        source.droppableId === 'unassigned' ? recipes : assignedRecipes[source.droppableId],
        source.index,
        destination.index
      );

      if (source.droppableId === 'unassigned') {
        setRecipes(items);
      } else {
        setAssignedRecipes({
          ...assignedRecipes,
          [source.droppableId]: items,
        });
      }
    } else {
      // Moving between lists
      const result = move(
        source.droppableId === 'unassigned' ? recipes : assignedRecipes[source.droppableId],
        destination.droppableId === 'unassigned' ? recipes : assignedRecipes[destination.droppableId],
        source,
        destination
      );

      if (source.droppableId === 'unassigned') {
        setRecipes(result[source.droppableId]);
        setAssignedRecipes({
          ...assignedRecipes,
          [destination.droppableId]: result[destination.droppableId],
        });
      } else {
        setAssignedRecipes({
          ...assignedRecipes,
          [source.droppableId]: result[source.droppableId],
          [destination.droppableId]: result[destination.droppableId],
        });
      }
    }
  };

  const handleOpenFullRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseFullRecipe = () => {
    setSelectedRecipe(null);
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
    setSelectedRecipe(recipe);
  }, []);

  useEffect(() => {
    console.log('State changed:');
    console.log('selectedRecipe:', selectedRecipe);
  }, [selectedRecipe]);

  // ... in your render method, right before returning JSX
  console.log('About to render UnassignedRecipes');
  console.log('Current selectedRecipe:', selectedRecipe);

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
            {recipes.map((recipe, index) => (
              <div key={recipe.id} className="relative mb-4">
                <RecipeCard
                  {...recipe}
                  index={index}
                  isOriginal={true}
                  onEdit={() => handleEditRecipe(recipe)}
                  className="recipe-card"
                />
              </div>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {selectedRecipe && (
        <FullRecipeView
          recipe={selectedRecipe}
          onClose={() => {
            console.log('Closing FullRecipeView');
            setSelectedRecipe(null);
          }}
          onSave={handleUpdateRecipe}
        />
      )}
    </div>
  );
};

export default UnassignedRecipes;
