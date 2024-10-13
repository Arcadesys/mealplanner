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

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="scheduler">
      <div className="unassigned">
        <h2 className="unassigned-title">Unassigned Recipes</h2>
        {/* You can include the UnassignedRecipes component here if needed */}
      </div>
      <div className="days">
        {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => (
          <div key={day} className={`day ${day.toLowerCase()}`}>
            <span className="day-label">
              {day.split('').map((letter, index) => (
                <span key={index} className="day-letter">
                  {letter}
                </span>
              ))}
            </span>
            {/* Add Droppable areas or other content here */}
          </div>
        ))}
        <div className="load-more">Load More Recipes</div>
      </div>
    </div>
  );
};

export default Scheduler;