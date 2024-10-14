'use client'

import React from 'react';
import { useDarkMode } from './DarkModeProvider';

export const Navigation = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <nav className="bg-yellow-300 dark:bg-yellow-800 p-4 mb-8">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-3xl font-bold text-blue-600">MealPlanner, by BlindAI</div>
        <ul className="flex space-x-6">
          <li><a href="/plan" className="text-red-500 hover:text-red-700 text-xl">📅</a></li>
          <li><a href="/recipes" className="text-green-500 hover:text-green-700 text-xl">🍎</a></li>
          <li><a href="/settings" className="text-purple-500 hover:text-purple-700 text-xl">⚙️</a></li>
          <li>
            <button onClick={toggleDarkMode} className="text-purple-500 hover:text-purple-700 text-xl">
              {darkMode ? '☀️' : '🌙'}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

