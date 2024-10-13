"use client";
import React from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import Scheduler from './components/Scheduler';
import UnassignedRecipes from './components/UnassignedRecipes';
import { useRecipes } from './hooks/useRecipes';

interface Recipe {
  id: string;
  name: string;
  // Add other relevant fields
}

const HomePage: React.FC = () => {
  const { recipes, loading, error } = useRecipes();

  const onDragEnd = (result: any) => {
    // Handle drag end logic here
    console.log(result);
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
          <Scheduler />
        </div>
      </div>
    </DragDropContext>
  );
};

export default HomePage;
