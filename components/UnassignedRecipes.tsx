import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import RecipeCard from './RecipeCard';
import { Recipe } from './types/recipe';
import styles from '../app/HomePage.module.css';

interface UnassignedRecipesProps {
  recipes: Recipe[];
}

const UnassignedRecipes: React.FC<UnassignedRecipesProps> = ({ recipes }) => {
  return (
    <Droppable droppableId="unassigned">
      {(provided) => (
        <div 
          className={styles.unassignedRecipes}
          ref={provided.innerRef} 
          {...provided.droppableProps}
        >
          <h2 className={styles.dayHeader}>Unassigned Recipes</h2>
          {recipes.map((recipe, index) => (
            <Draggable key={recipe.id} draggableId={recipe.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={styles.draggableItem}
                >
                  <RecipeCard recipe={recipe} index={index} />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default UnassignedRecipes;
