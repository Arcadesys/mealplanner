"use client";
import React, { useState, useEffect } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import Scheduler from './components/Scheduler';
import UnassignedRecipes from './components/UnassignedRecipes';
import { useRecipes } from './hooks/useRecipes';
import { Recipe } from './types/recipe';
import Modal from 'react-modal';

const HomePage: React.FC = () => {
  useEffect(() => {
    // Ensure this runs only on the client side
    if (typeof window !== 'undefined' && document.querySelector('#__next')) {
      Modal.setAppElement('#__next');
    }
  }, []);

  const { recipes: initialRecipes, loading, error } = useRecipes();
  const [unassignedRecipes, setUnassignedRecipes] = useState<Recipe[]>([]);
  const [assignedRecipes, setAssignedRecipes] = useState<{ [key: string]: Recipe[] }>({
    Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: [], Sunday: []
  });

  useEffect(() => {
    if (initialRecipes.length > 0) {
      setUnassignedRecipes(initialRecipes);
    }
  }, [initialRecipes]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    let sourceList: Recipe[];
    let destList: Recipe[];

    if (source.droppableId === 'unassigned') {
      sourceList = [...unassignedRecipes];
    } else {
      sourceList = [...assignedRecipes[source.droppableId]];
    }

    if (destination.droppableId === 'unassigned') {
      destList = [...unassignedRecipes];
    } else {
      destList = [...assignedRecipes[destination.droppableId]];
    }

    const [movedItem] = sourceList.splice(source.index, 1);
    destList.splice(destination.index, 0, movedItem);

    if (source.droppableId === 'unassigned') {
      setUnassignedRecipes(sourceList);
    } else {
      setAssignedRecipes(prev => ({
        ...prev,
        [source.droppableId]: sourceList
      }));
    }

    if (destination.droppableId === 'unassigned') {
      setUnassignedRecipes(destList);
    } else {
      setAssignedRecipes(prev => ({
        ...prev,
        [destination.droppableId]: destList
      }));
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-2xl font-bold text-yellow-400 animate-bounce">
        🐱 Chasing down those recipes... 🍳
      </div>
    </div>
  );
  if (error) return <p>Error loading recipes: {error}</p>;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex h-screen">
        <div className="w-1/3 p-4 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Unassigned Recipes</h2>
          <UnassignedRecipes recipes={unassignedRecipes} />
        </div>
        <div className="w-2/3 p-4 overflow-y-auto">
          <Scheduler assignedRecipes={assignedRecipes} />
        </div>
      </div>
    </DragDropContext>
  );
};

export default HomePage;
