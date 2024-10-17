import React, { useState } from 'react';
import Modal from 'react-modal';

interface AddRecipeProps {
  onClose: () => void;
  onSave: (recipe: { title: string }) => void;
  onAddCard: (title: string) => void; // New prop for adding a card
}

const AddRecipe: React.FC<AddRecipeProps> = ({ onClose, onSave, onAddCard }) => {
  const [title, setTitle] = useState('');

  const handleSave = () => {
    onSave({ title });
    onAddCard(title); // Call the new function to add a card
    onClose();
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '250px', // Adjust this value to match or be smaller than your recipe card width
      maxWidth: '90%',
      padding: '1rem',
      borderRadius: '0.5rem',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)'
    }
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Add New Recipe"
    >
      <h2 className="text-xl font-bold mb-3">Add New Recipe</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter recipe title"
        className="w-full p-2 border rounded mb-3 text-sm"
      />
      <div className="flex justify-end">
        <button onClick={onClose} className="mr-2 px-3 py-1 bg-gray-300 rounded text-sm">Cancel</button>
        <button onClick={handleSave} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">Save</button>
      </div>
    </Modal>
  );
};

export default AddRecipe;
