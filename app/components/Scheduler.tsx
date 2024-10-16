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
              className={`flex-1 p-2 border-b last:border-b-0 min-h-[100px] bg-${day.toLowerCase()} dark:bg-${day.toLowerCase()}/50 transition-colors duration-200`}
            >
              <h3 className="text-sm font-semibold mb-1">{day}</h3>
              <div className="flex flex-wrap gap-2">
                {assignedRecipes[day]?.map((recipe, index) => (
                  <Draggable key={recipe.id} draggableId={recipe.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-white dark:bg-gray-700 p-2 rounded shadow text-black dark:text-white transition-colors duration-200"
                      >
                        <span className="text-sm">{recipe.name}</span>
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