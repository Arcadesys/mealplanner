import React from 'react';
import { useState, useEffect } from 'react';
import { Recipe } from '../types/recipe';

const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('/api/recipes');
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        setRecipes(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return { recipes, loading, error };
};

const Scheduler: React.FC = () => {
  const { recipes, loading, error } = useRecipes();

  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  return (
    <div className="flex space-x-4 h-full overflow-x-auto">
      {days.map((day) => (
        <div key={day} className="bg-white p-4 rounded shadow flex-shrink-0 w-48">
          <h3 className="text-lg font-semibold mb-2">{day}</h3>
          {/* Droppable area for recipes */}
          <div className="h-full bg-gray-100 p-2 rounded">
            {/* Recipe cards will be dropped here */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Scheduler;
