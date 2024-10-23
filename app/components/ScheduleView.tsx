"use client";
import React, { useState, useEffect } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import Scheduler from './Scheduler';
import UnassignedRecipes from './UnassignedRecipes';
import FullRecipeView from './FullRecipeView';
import { useRecipes } from '../hooks/useRecipes';
import { Recipe } from '../types/recipe';
import { Days, Schedule } from '../types/day';

interface ScheduleViewProps {
  onAddRecipe: (newRecipe: Partial<Recipe>) => Promise<void>;
  onDeleteRecipe: (recipeId: string) => Promise<void>;
  onUpdateRecipe: (updatedRecipe: Recipe) => Promise<void>;
}

const ScheduleView: React.FC<ScheduleViewProps> = ({ onAddRecipe, onDeleteRecipe, onUpdateRecipe }) => {
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

  // Add this return statement
  return (
    <div className="container mx-auto p-4">
      <DragDropContext onDragEnd={() => {}}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UnassignedRecipes recipes={unassignedRecipes} />
          <Scheduler schedule={assignedRecipes} />
        </div>
      </DragDropContext>
      {selectedRecipe && (
        <FullRecipeView
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          onUpdate={handleUpdateRecipe}
          onDelete={handleDeleteRecipe}
        />
      )}
    </div>
  );
};

export default ScheduleView;
