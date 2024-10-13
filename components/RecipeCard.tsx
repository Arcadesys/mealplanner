import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { Draggable } from '@hello-pangea/dnd';
import { Recipe } from '../components/types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
  index: number;
}

const CardContainer = styled.div<{ isDragging: boolean }>`
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: ${props => props.isDragging ? '#f0f0f0' : '#fff'};
  box-shadow: ${props => props.isDragging ? '0 5px 10px rgba(0,0,0,0.2)' : 'none'};
  transition: background-color 0.2s, box-shadow 0.2s;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  color: #333;
`;

const RecipeCard = forwardRef<HTMLDivElement, RecipeCardProps>(({ recipe, index }, ref) => {
  if (!recipe) {
    return null; // or return a placeholder component
  }

  return (
    <Draggable draggableId={recipe.id.toString()} index={index}>
      {(provided, snapshot) => (
        <CardContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
        >
          <Title>{recipe.title || 'Untitled Recipe'}</Title>
        </CardContainer>
      )}
    </Draggable>
  );
});

RecipeCard.displayName = 'RecipeCard';

export default RecipeCard;
