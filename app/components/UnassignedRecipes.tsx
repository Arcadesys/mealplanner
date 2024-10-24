import React from 'react';

export default function UnassignedRecipes() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Your recipe list here */}
      <p>Unassigned Recipes View</p>
      <UnassignedRecipes />
    </div>
  );
}
