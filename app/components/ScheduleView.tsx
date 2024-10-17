"use client";
import React, { useState, useEffect } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import Scheduler from './Scheduler';
import UnassignedRecipes from './UnassignedRecipes';
import FullRecipeView from './FullRecipeView';
import { useRecipes } from '../hooks/useRecipes';
import { Recipe } from '../types/recipe';

const ScheduleView: React.FC = () => {
  const { recipes: initialRecipes, loading, error } = useRecipes();
  const [unassignedRecipes, setUnassignedRecipes] = useState<Recipe[]>([]);
  const [assignedRecipes, setAssignedRecipes] = useState<{ [key: string]: Recipe[] }>({
    Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: [], Sunday: []
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    if (initialRecipes.length > 0) {
      setUnassignedRecipes(initialRecipes);
    }
  }, [initialRecipes]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceDay = source.droppableId;
    const destDay = destination.droppableId;

    const newAssignedRecipes = { ...assignedRecipes };

    if (sourceDay === 'unassigned') {
      // Moving from unassigned to a day
      const [movedRecipe] = unassignedRecipes.splice(source.index, 1);
      newAssignedRecipes[destDay].splice(destination.index, 0, movedRecipe);
    } else if (destDay === 'unassigned') {
      // Moving from a day to unassigned
      const [movedRecipe] = newAssignedRecipes[sourceDay].splice(source.index, 1);
      setUnassignedRecipes(prev => [...prev, movedRecipe]);
    } else {
      // Moving between days
      const [movedRecipe] = newAssignedRecipes[sourceDay].splice(source.index, 1);
      newAssignedRecipes[destDay].splice(destination.index, 0, movedRecipe);
    }

    setAssignedRecipes(newAssignedRecipes);
  };

  const openRecipeModal = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleSaveRecipe = (updatedRecipe: Recipe) => {
    // Implement save logic here
    console.log('Saving updated recipe:', updatedRecipe);
    // You might want to update the recipe in your state or send it to an API
  };

  if (loading) return (
    <div className="flex items-center justify-center h-full">
      <div className="text-2xl font-bold text-yellow-400 animate-bounce">
        🐱 Chasing down those recipes... 🍳
      </div>
    </div>
  );
  if (error) return <p>Error loading recipes: {error}</p>;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex h-full">
        <div className="w-1/3 p-4 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Unassigned Recipes</h2>
          <UnassignedRecipes 
            recipes={unassignedRecipes} 
            setRecipes={setUnassignedRecipes} 
            onRecipeClick={openRecipeModal} 
          />
        </div>
        <div className="w-2/3 p-4">
          <Scheduler assignedRecipes={assignedRecipes} onRecipeClick={openRecipeModal} />
        </div>
      </div>
      {isModalOpen && selectedRecipe && (
        <FullRecipeView
          recipe={selectedRecipe}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveRecipe}
        />
      )}
    </DragDropContext>
  );
};

export default ScheduleView;
