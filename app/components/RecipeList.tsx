import { useRecipes } from '../hooks/useRecipes';

function RecipeList() {
  const { recipes, deleteRecipe } = useRecipes();
  
  return (
    <div>
      {recipes.map(recipe => (
        <RecipeCard 
          key={recipe.id}
          recipe={recipe}
          onDelete={deleteRecipe} // Make sure this matches the prop name in RecipeCard
        />
      ))}
    </div>
  );
}
