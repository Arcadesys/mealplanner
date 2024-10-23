"use client";
import React, { useState, useEffect } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import Scheduler from './Scheduler';
import UnassignedRecipes from './UnassignedRecipes';
import FullRecipeView from './FullRecipeView';
import { Recipe } from '../types/mealPlanner';
import { Days, Schedule } from '../types/day';
import HandleEditRecipe from './HandleEditRecipe';

const ScheduleView: React.FC<{
  recipes: Recipe[];
  onAddRecipe: (newRecipe: Partial<Recipe>) => Promise<Recipe>;  // Updated return type
  onDeleteRecipe: (id: string) => void;
  onUpdateRecipe: (recipe: Recipe) => void;
}> = ({ recipes, onAddRecipe, onDeleteRecipe, onUpdateRecipe }) => {
  const [unassignedRecipes, setUnassignedRecipes] = useState<Recipe[]>([]);
  const [assignedRecipes, setAssignedRecipes] = useState<Schedule>({
    [Days.Monday]: [], [Days.Tuesday]: [], [Days.Wednesday]: [], 
    [Days.Thursday]: [], [Days.Friday]: [], [Days.Saturday]: [], [Days.Sunday]: []
  });
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  // Add this useEffect to initialize unassignedRecipes when recipes prop changes
  useEffect(() => {
    setUnassignedRecipes(recipes.filter(recipe => !recipe.day));
  }, [recipes]);

  const handleAddRecipe = async (newRecipe: Partial<Recipe>) => {
    try {
      const addedRecipe = await onAddRecipe(newRecipe);
      if (addedRecipe) {  // Add this check
        setUnassignedRecipes(prev => [...prev, addedRecipe]);
      }
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  const handleDeleteRecipe = async (id: string) => {
    try {
      await onDeleteRecipe(id);
      setUnassignedRecipes(prev => prev.filter(recipe => recipe.id !== id));
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  const handleUpdateRecipe = async (updatedRecipe: Recipe) => {
    try {
      await onUpdateRecipe(updatedRecipe);  // Don't try to capture return value
      setUnassignedRecipes(prev =>
        prev.map(recipe => (recipe.id === updatedRecipe.id ? updatedRecipe : recipe))
      );
      setSelectedRecipe(null);
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // Dropped outside the list
    if (!destination) return;

    // If the item is dropped in the same place, do nothing
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Logic to reorder or move recipes between lists
    if (source.droppableId === 'unassigned') {
      // Moving from unassigned to a day
      const [movedRecipe] = unassignedRecipes.splice(source.index, 1);
      movedRecipe.day = destination.droppableId as Days; // Set the day property
      setUnassignedRecipes([...unassignedRecipes]);
      setAssignedRecipes(prev => ({
        ...prev,
        [destination.droppableId]: [
          ...prev[destination.droppableId as Days].slice(0, destination.index),
          movedRecipe,
          ...prev[destination.droppableId as Days].slice(destination.index)
        ]
      }));
    } else if (destination.droppableId === 'unassigned') {
      // Moving from a day to unassigned
      const [movedRecipe] = assignedRecipes[source.droppableId as Days].splice(source.index, 1);
      movedRecipe.day = undefined; // Clear the day property
      setUnassignedRecipes([...unassignedRecipes, movedRecipe]);
      setAssignedRecipes({...assignedRecipes});
    } else {
      // Moving between days
      const sourceDay = assignedRecipes[source.droppableId as Days];
      const [movedRecipe] = sourceDay.splice(source.index, 1);
      movedRecipe.day = destination.droppableId as Days; // Update the day property
      const destDay = assignedRecipes[destination.droppableId as Days];
      destDay.splice(destination.index, 0, movedRecipe);
      setAssignedRecipes({...assignedRecipes});
    }
    // 🐱‍ Meow-velous job! Don't forget to commit these changes, you cool cat!
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex h-screen overflow-hidden">
        {/* Fixed-width sidebar for unassigned recipes */}
        <div className="w-96 h-full overflow-y-auto border-r border-gray-200 p-4">
          <UnassignedRecipes 
            recipes={unassignedRecipes} 
            onAddRecipe={handleAddRecipe} 
            onDeleteRecipe={handleDeleteRecipe}
            onEditRecipe={(recipe: Recipe) => setSelectedRecipe(recipe)}
          />
        </div>

        {/* Flex-grow main content area for scheduler */}
        <div className="flex-grow h-full overflow-y-auto p-4">
          <Scheduler 
            assignedRecipes={assignedRecipes} 
            onDragEnd={handleDragEnd} 
            onEditRecipe={(recipeId: string) => setSelectedRecipe(recipes.find(r => r.id === recipeId) || null)}
          />
        </div>
      </div>
    </DragDropContext>
  );
};

export default ScheduleView;
