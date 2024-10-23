'use client'

import React from 'react';
import { useDarkMode } from './DarkModeProvider';

type ViewType = 'PLAN' | 'SCHEDULE' | 'SHOP';

interface NavigationProps {
  currentView: ViewType;
  setCurrentView?: (view: ViewType) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ 
  currentView, 
  setCurrentView = () => console.warn('setCurrentView not provided') 
}) => {
  console.log('Navigation received setCurrentView:', typeof setCurrentView);
  
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <nav className="bg-yellow-300 dark:bg-yellow-800 p-4 mb-8 border-b-4 border-cartoon-black dark:border-cartoon-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-3xl font-bold text-blue-600 font-cartoon">MealPlanner, by BlindAI</div>
        <ul className="flex space-x-6">
          <li>
            <button
              onClick={(e) => {
                e.preventDefault();
                setCurrentView('PLAN');
              }}
              className={`px-4 py-2 rounded ${currentView === 'PLAN' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Plan
            </button>
          </li>
          <li>
            <button
              onClick={(e) => {
                e.preventDefault();
                setCurrentView('SCHEDULE');
              }}
              className={`px-4 py-2 rounded ${currentView === 'SCHEDULE' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Schedule
            </button>
          </li>
          <li>
            <button
              onClick={(e) => {
                e.preventDefault();
                setCurrentView('SHOP');
              }}
              className={`px-4 py-2 rounded ${currentView === 'SHOP' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Shop
            </button>
          </li>
          <li>
            <button onClick={toggleDarkMode} className="text-purple-500 hover:text-purple-700 text-2xl hover:animate-bounce-slight">
              {darkMode ? '☀️' : '🌙'}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
