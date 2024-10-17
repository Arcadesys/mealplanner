import React, { useState, useRef, useEffect } from 'react';

interface AddRecipeInlineProps {
  onSave: (recipe: { title: string }) => void;
  onCancel: () => void;
}

const AddRecipeInline: React.FC<AddRecipeInlineProps> = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSave = (keepOpen: boolean = false) => {
    if (title.trim()) {
      onSave({ title: title.trim() });
      setTitle('');
      if (!keepOpen) {
        onCancel();
      } else {
        // Refocus the input for the next entry
        inputRef.current?.focus();
      }
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-4">
      <input
        ref={inputRef}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter recipe title"
        className="w-full p-2 border rounded mb-3 text-sm bg-transparent text-white"
      />
      <div className="flex justify-end">
        <button onClick={onCancel} className="mr-2 px-3 py-1 bg-gray-600 text-white rounded text-sm">Cancel</button>
        <button onClick={() => handleSave(true)} className="mr-2 px-3 py-1 bg-green-500 text-white rounded text-sm">Save & New</button>
        <button onClick={() => handleSave()} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">Save</button>
      </div>
    </div>
  );
};

export default AddRecipeInline;
