import React from 'react';
import { Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Recipe } from '../types/recipe';
import { FaEdit } from 'react-icons/fa';

interface SchedulerProps {
  assignedRecipes: { [key: string]: Recipe[] };
  onDragEnd: (result: DropResult) => void;
  onEditRecipe: (recipeId: string) => void;
}

const Scheduler: React.FC<SchedulerProps> = ({ assignedRecipes, onDragEnd, onEditRecipe }) => {
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
                  recipe && (
                    <Draggable key={recipe.id} draggableId={recipe.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`recipe-card bg-${day.toLowerCase()}-200 dark:bg-${day.toLowerCase()}-700 text-${day.toLowerCase()}-800 dark:text-${day.toLowerCase()}-100 flex items-center justify-between`}
                        >
                          <span className="text-sm">{recipe.name || recipe.title}</span>
                          <button
                            onClick={() => onEditRecipe(recipe.id)}
                            className="ml-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                          >
                            <FaEdit size={24} />
                          </button>
                        </div>
                      )}
                    </Draggable>
                  )
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
