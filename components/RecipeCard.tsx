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
  width: 200px;
  border: 2px solid ${props => props.isDragging ? 'var(--accent)' : 'var(--primary)'};
  border-radius: 8px;
  background-color: ${props => props.isDragging ? 'var(--accent)' : 'var(--background)'};
  box-shadow: ${props => props.isDragging ? '0 5px 10px rgba(0,0,0,0.2)' : 'none'};
  transition: background-color 0.2s, box-shadow 0.2s, transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  color: var(--foreground);
  font-weight: bold;
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
