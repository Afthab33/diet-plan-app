import React, { useState } from 'react';
import DietPlanner from './DietPlanner';
import LandingPage from './LandingPage';

const AppWrapper = () => {
  const [showForm, setShowForm] = useState(false);

  const handleGetStarted = () => {
    setShowForm(true);
  };

  const handleBack = () => {
    setShowForm(false);
  };

  return (
    <div className="relative">
      {!showForm ? (
        <div
          className="transition-all duration-500 ease-out"
          style={{
            opacity: 1,
            transform: 'translateY(0)'
          }}
        >
          <LandingPage onGetStarted={handleGetStarted} />
        </div>
      ) : (
        <div
          className="transition-all duration-500 ease-out min-h-screen"
          style={{
            opacity: 1,
            transform: 'translateY(0)'
          }}
        >
          <DietPlanner onBack={handleBack} />
        </div>
      )}
    </div>
  );
};

export default AppWrapper;