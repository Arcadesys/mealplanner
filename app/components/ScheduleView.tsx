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
  onAddRecipe: (newRecipe: Partial<Recipe>) => void;
  onDeleteRecipe: (id: string) => void;
  onUpdateRecipe: (recipe: Recipe) => void;
}

const ScheduleView: React.FC<ScheduleViewProps> = ({ onAddRecipe, onDeleteRecipe, onUpdateRecipe }) => {
  const { recipes: initialRecipes, loading, error, setRecipes } = useRecipes();
  const [unassignedRecipes, setUnassignedRecipes] = useState<Recipe[]>([]);
  const [assignedRecipes, setAssignedRecipes] = useState<Schedule>({
    [Days.Monday]: [], [Days.Tuesday]: [], [Days.Wednesday]: [], 
    [Days.Thursday]: [], [Days.Friday]: [], [Days.Saturday]: [], [Days.Sunday]: []
  });
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    if (initialRecipes.length > 0) {
      setUnassignedRecipes(initialRecipes);
    }
  }, [initialRecipes]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceDay = source.droppableId as Days | 'unassigned';
    const destDay = destination.droppableId as Days | 'unassigned';

    const newAssignedRecipes = { ...assignedRecipes };
    let newUnassignedRecipes = [...unassignedRecipes];

    const moveRecipe = (from: Recipe[], to: Recipe[], sourceIndex: number, destIndex: number) => {
      const [movedRecipe] = from.splice(sourceIndex, 1);
      to.splice(destIndex, 0, movedRecipe);
    };

    if (sourceDay === 'unassigned') {
      moveRecipe(newUnassignedRecipes, newAssignedRecipes[destDay], source.index, destination.index);
      setUnassignedRecipes(newUnassignedRecipes);
    } else if (destDay === 'unassigned') {
      moveRecipe(newAssignedRecipes[sourceDay], newUnassignedRecipes, source.index, destination.index);
      setUnassignedRecipes(newUnassignedRecipes);
    } else {
      moveRecipe(newAssignedRecipes[sourceDay], newAssignedRecipes[destDay], source.index, destination.index);
    }

    setAssignedRecipes(newAssignedRecipes);
  };

  const handleEditRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleSaveRecipe = (updatedRecipe: Recipe) => {
    setRecipes(prev => prev.map(r => r.id === updatedRecipe.id ? updatedRecipe : r));
    setSelectedRecipe(null);
  };

  if (loading) return <div>Loading recipes...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex h-full">
        <div className="w-1/3 p-4 overflow-y-auto">
          <UnassignedRecipes 
            recipes={unassignedRecipes} 
            onAddRecipe={onAddRecipe}
            onEditRecipe={handleEditRecipe}
            onDeleteRecipe={onDeleteRecipe}
          />
        </div>
        <div className="w-2/3 p-4">
          <Scheduler
            assignedRecipes={assignedRecipes}
            onEditRecipe={handleEditRecipe}
          />
        </div>
      </div>
      {selectedRecipe && (
        <FullRecipeView
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          onSave={handleSaveRecipe}
        />
      )}
    </DragDropContext>
  );
};

export default ScheduleView;
