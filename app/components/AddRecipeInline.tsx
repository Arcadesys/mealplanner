import React, { useState, useRef, useEffect } from 'react';
import { Recipe } from '../types/mealPlanner';

interface AddRecipeInlineProps {
  onSave: (recipe: Partial<Recipe>) => Promise<void>;
  onCancel: () => void;
}

const AddRecipeInline: React.FC<AddRecipeInlineProps> = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSave = async (keepOpen: boolean = false) => {
    if (!title.trim()) return;
    
    setError(null);
    setIsSubmitting(true);
    
    try {
      await onSave({ title: title.trim() });
      setTitle('');
      
      if (!keepOpen) {
        onCancel();
      } else {
        inputRef.current?.focus();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save recipe');
      console.error('Error saving recipe:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-4">
      {error && (
        <div className="text-red-500 mb-3 text-sm">
          {error}
        </div>
      )}
      <input
        ref={inputRef}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter recipe title"
        className="w-full p-2 border rounded mb-3 text-sm bg-transparent text-white"
        disabled={isSubmitting}
      />
      <div className="flex justify-end">
        <button 
          onClick={onCancel} 
          className="mr-2 px-3 py-1 bg-gray-600 text-white rounded text-sm"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button 
          onClick={() => handleSave(true)} 
          className="mr-2 px-3 py-1 bg-green-500 text-white rounded text-sm"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save & New'}
        </button>
        <button 
          onClick={() => handleSave()} 
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default AddRecipeInline;
