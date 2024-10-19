"use client";
import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import PlanView from './components/PlanView';
import ScheduleView from './components/ScheduleView';
import GroceryView from './components/GroceryView';

type ViewType = 'PLAN' | 'SCHEDULE' | 'SHOP';

const HomePage: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('SCHEDULE');

  useEffect(() => {
    // Load the saved view from localStorage when the component mounts
    const savedView = localStorage.getItem('currentView') as ViewType;
    if (savedView) {
      setCurrentView(savedView);
    }
  }, []);

  // Update localStorage whenever currentView changes
  useEffect(() => {
    localStorage.setItem('currentView', currentView);
  }, [currentView]);

  console.log('HomePage setCurrentView:', typeof setCurrentView);

  const renderView = () => {
    switch (currentView) {
      case 'PLAN':
        return <PlanView />;
      case 'SCHEDULE':
        return <ScheduleView />;
      case 'SHOP':
        return <GroceryView />;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navigation currentView={currentView} setCurrentView={setCurrentView} />
      <main className="flex-grow overflow-hidden">
        {renderView()}
      </main>
    </div>
  );
};

export default HomePage;
