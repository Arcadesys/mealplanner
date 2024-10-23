"use client";
import React, { useState, useEffect } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import Scheduler from './Scheduler';
import UnassignedRecipes from './UnassignedRecipes';
import FullRecipeView from './FullRecipeView';
import { Recipe } from '../types/mealPlanner';
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
};

export default ScheduleView;
