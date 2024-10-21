"use client";
import React, { useState, useEffect } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import Scheduler from './Scheduler';
import UnassignedRecipes from './UnassignedRecipes';
import FullRecipeView from './FullRecipeView';
import { useRecipes } from '../hooks/useRecipes';
import { Recipe } from '../types/recipe';
import { Days, Schedule } from '../types/day';
import HandleEditRecipe from './HandleEditRecipe';

const ScheduleView: React.FC = () => {
  const { recipes, loading, error, addRecipe, deleteRecipe, updateRecipe } = useRecipes();
  const [unassignedRecipes, setUnassignedRecipes] = useState<Recipe[]>([]);
  const [assignedRecipes, setAssignedRecipes] = useState<Schedule>({
    [Days.Monday]: [], [Days.Tuesday]: [], [Days.Wednesday]: [], 
    [Days.Thursday]: [], [Days.Friday]: [], [Days.Saturday]: [], [Days.Sunday]: []
  });
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const handleAddRecipe = async (newRecipe: Partial<Recipe>) => {
    try {
      const addedRecipe = await addRecipe(newRecipe);
      setUnassignedRecipes(prev => [...prev, addedRecipe]);
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  const handleDeleteRecipe = async (id: string) => {
    try {
      await deleteRecipe(id);
      setUnassignedRecipes(prev => prev.filter(recipe => recipe.id !== id));
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  const handleUpdateRecipe = async (updatedRecipe: Recipe) => {
    try {
      const savedRecipe = await updateRecipe(updatedRecipe);
      setUnassignedRecipes(prev =>
        prev.map(recipe => (recipe.id === savedRecipe.id ? savedRecipe : recipe))
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
    // Implement based on your application's requirements
    // 🐱‍👓 Don't forget to keep those git commits clean, Clampett style!
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: 1 }}>
          <UnassignedRecipes 
            recipes={unassignedRecipes} 
            onAddRecipe={handleAddRecipe} 
            onDeleteRecipe={handleDeleteRecipe} 
          />
        </div>
        <div style={{ flex: 2 }}>
          <Scheduler 
            assignedRecipes={assignedRecipes} 
            onDragEnd={handleDragEnd} 
            onEditRecipe={<HandleEditRecipe />}
          />
        </div>
      </div>
    </DragDropContext>
  );
};

export default ScheduleView;
