import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { Recipe } from '../types/recipe';

interface SchedulerProps {
  assignedRecipes: { [key: string]: Recipe[] };
}

const Scheduler: React.FC<SchedulerProps> = ({ assignedRecipes }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="flex flex-col h-full">
      {days.map((day) => (
        <Droppable key={day} droppableId={day} direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex-1 bg-white p-2 border-b last:border-b-0 min-h-0"
            >
              <h3 className="text-sm font-semibold mb-1">{day}</h3>
              <div className="bg-gray-100 p-1 rounded min-h-[30px] flex flex-wrap items-start overflow-y-auto">
                {assignedRecipes[day].map((recipe, index) => (
                  <Draggable key={recipe.id} draggableId={recipe.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-white p-1 rounded shadow m-1 text-xs"
                      >
                        {recipe.name}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      ))}
    </div>
  );
};

export default Scheduler;
