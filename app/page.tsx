"use client";
import React from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import Scheduler from './components/Scheduler';
import UnassignedRecipes from './components/UnassignedRecipes';

const HomePage: React.FC = () => {
  const onDragEnd = (result: any) => {
    // Handle drag end logic here
    console.log(result);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-row">
        <div className="flex-grow flex-shrink w-2/3">
          <Scheduler />
        </div>
      </div>
    </DragDropContext>
  );
};

export default HomePage;