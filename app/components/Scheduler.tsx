import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { Recipe } from '../types/recipe';

interface SchedulerProps {
  assignedRecipes: { [key: string]: Recipe[] };
}

const Scheduler: React.FC<SchedulerProps> = ({ assignedRecipes }) => {
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {days.map((day) => (
        <Droppable key={day} droppableId={day}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex-1 bg-white p-4 border-b last:border-b-0"
            >
              <h3 className="text-lg font-semibold mb-2">{day}</h3>
              <div className="bg-gray-100 p-2 rounded min-h-[50px] flex items-center">
                {assignedRecipes[day].map((recipe, index) => (
                  <Draggable key={recipe.id} draggableId={recipe.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-white p-2 rounded shadow mr-2"
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
