import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { daysOfWeek } from './constants';
import { unassignedRecipes, assignedRecipes } from './data';
import RecipeCard from './RecipeCard';

const IndexPage: React.FC = () => {
  return (
    <div className="flex bg-wood-pattern p-4"> {/* Add a wood texture background for bulletin board feel */}
      <div className="w-1/3 bg-cork-pattern p-4 rounded-lg shadow-inner"> {/* Cork board texture for unassigned recipes */}
        <h2 className="text-2xl font-bold mb-4 text-white">Recipe Ideas</h2>
        {unassignedRecipes.map((recipe, index) => (
          <RecipeCard key={recipe.id} {...recipe} index={index} />
        ))}
      </div>
      <div className="w-2/3 grid grid-cols-7 gap-4 p-4">
        {daysOfWeek.map(day => (
          <div key={day} className="bg-white p-2 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">{day}</h3>
            <Droppable droppableId={day}>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="min-h-[200px]">
                  {assignedRecipes[day].map((recipe, index) => (
                    <RecipeCard key={recipe.id} {...recipe} index={index} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndexPage;
