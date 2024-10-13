"use client";
import React, { useState } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import Scheduler from './components/Scheduler';
import UnassignedRecipes from './components/UnassignedRecipes';
import { useRecipes } from './hooks/useRecipes';
import { Recipe } from './types/recipe';

const HomePage: React.FC = () => {
  const { recipes, loading, error } = useRecipes();
  const [assignedRecipes, setAssignedRecipes] = useState<{ [key: string]: Recipe[] }>({
    MON: [], TUE: [], WED: [], THU: [], FRI: [], SAT: [], SUN: []
  });

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // If the item was dropped outside a droppable area
    if (!destination) return;

    // If the item was dropped back into its original position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    // Handle moving from unassigned to a day
    if (source.droppableId === 'unassigned' && destination.droppableId !== 'unassigned') {
      const recipe = recipes[source.index];
      setAssignedRecipes(prev => ({
        ...prev,
        [destination.droppableId]: [...prev[destination.droppableId], recipe]
      }));
    }

    // Handle moving between days
    if (source.droppableId !== 'unassigned' && destination.droppableId !== 'unassigned') {
      const sourceDay = assignedRecipes[source.droppableId];
      const destDay = assignedRecipes[destination.droppableId];
      const [movedRecipe] = sourceDay.splice(source.index, 1);
      destDay.splice(destination.index, 0, movedRecipe);
      setAssignedRecipes({ ...assignedRecipes });
    }

    // Handle moving from a day back to unassigned (if needed)
    // This part is left as an exercise for you, my clever friend! 😉
  };

  if (loading) return <p>Loading recipes...</p>;
  if (error) return <p>Error loading recipes: {error}</p>;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex h-screen">
        <div className="w-1/4 bg-gray-100 p-4 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Unassigned Recipes</h2>
          <UnassignedRecipes recipes={recipes} />
        </div>
        <div className="w-3/4 p-4">
          <Scheduler assignedRecipes={assignedRecipes} />
        </div>
      </div>
    </DragDropContext>
  );
};

export default HomePage;
