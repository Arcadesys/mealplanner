//a simple shopping list modal that a user can use in the grocery store.

import React from 'react';

const GroceryView: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Shopping List</h2>
      {/* Add your shopping list components here */}
      <p>This is where users will see their grocery shopping list.</p>
    </div>
  );
};

export default GroceryView;
