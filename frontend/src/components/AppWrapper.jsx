import React, { useState } from 'react';
import DietPlanner from './DietPlanner';
import LandingPage from './LandingPage';
import ThemedBackground from './ThemedBackground';
import DataFlowGuide from './NutritionLearningCenter';

const AppWrapper = () => {
  const [showForm, setShowForm] = useState(false);
  const [showNutritionGuide, setShowNutritionGuide] = useState(false);

  const handleGetStarted = () => {
    setShowForm(true);
  };

  const handleBack = () => {
    setShowForm(false);
  };

  const handleShowNutritionGuide = () => {
    setShowNutritionGuide(true);
  };

  const handleCloseNutritionGuide = () => {
    setShowNutritionGuide(false);
  };

  return (
    <ThemedBackground>
      <div className="relative">
        {!showForm ? (
          <div
            className="transition-all duration-500 ease-out"
            style={{
              opacity: 1,
              transform: 'translateY(0)'
            }}
          >
            <LandingPage 
              onGetStarted={handleGetStarted} 
              onShowNutritionGuide={handleShowNutritionGuide}
            />
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

        {/* DataFlowGuide Overlay */}
        {showNutritionGuide && (
          <DataFlowGuide onClose={handleCloseNutritionGuide} />
        )}
      </div>
    </ThemedBackground>
  );
};

export default AppWrapper;