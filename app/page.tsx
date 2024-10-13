"use client";
import React, { useEffect } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import UnassignedRecipes from '../components/UnassignedRecipes';
import RecipeCard from '../components/RecipeCard';
import styles from './HomePage.module.css';
import { Recipe } from '../components/types/recipe';
import dummyData from '../public/dummyData.json';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const HomePage = () => {
  const [unassignedRecipes, setUnassignedRecipes] = React.useState<Recipe[]>([]);
  const [assignedRecipes, setAssignedRecipes] = React.useState(
    Object.fromEntries(days.map(day => [day, []]))
  );

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const response = await fetch('/dummyData.json');
        const data = await response.json();
        setUnassignedRecipes(data);
      } catch (error) {
        console.error('Error loading recipes:', error);
      }
    };

    loadRecipes();
  }, []);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceId = source.droppableId;
    const destId = destination.droppableId;

    if (sourceId === destId) {
      // Reordering within the same list
      const items = Array.from(sourceId === 'unassigned' ? unassignedRecipes : assignedRecipes[sourceId]);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);

      if (sourceId === 'unassigned') {
        setUnassignedRecipes(items);
      } else {
        setAssignedRecipes({ ...assignedRecipes, [sourceId]: items });
      }
    } else {
      // Moving from one list to another
      const sourceItems = Array.from(sourceId === 'unassigned' ? unassignedRecipes : assignedRecipes[sourceId]);
      const destItems = Array.from(destId === 'unassigned' ? unassignedRecipes : assignedRecipes[destId]);
      const [movedItem] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, movedItem);

      if (sourceId === 'unassigned') {
        setUnassignedRecipes(sourceItems);
        setAssignedRecipes({ ...assignedRecipes, [destId]: destItems });
      } else if (destId === 'unassigned') {
        setAssignedRecipes({ ...assignedRecipes, [sourceId]: sourceItems });
        setUnassignedRecipes(destItems);
      } else {
        setAssignedRecipes({
          ...assignedRecipes,
          [sourceId]: sourceItems,
          [destId]: destItems,
        });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.drawerOrganizer}>
        <UnassignedRecipes recipes={unassignedRecipes} />
        <div className={styles.daysContainer}>
          {days.map((day) => (
            <Droppable key={day} droppableId={day}>
              {(provided) => (
                <div
                  className={styles.dayColumn}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h2 className={styles.dayHeader}>{day}</h2>
                  {assignedRecipes[day].map((recipe, index) => (
                    <RecipeCard key={recipe.id} recipe={recipe} index={index} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default HomePage;
