import React from 'react';
import { Check, Target } from 'lucide-react';

const Goals = ({ 
  formData, 
  handleInputChange,
  goals 
}) => {
  return (
    <div className="space-y-6">
    {/* Header Section */}
    <div className="text-center mb-8">
      <div className="inline-block p-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 mb-4">
        <Target className="w-8 h-8 text-blue-400" />
      </div>
      <h3 className="text-xl font-bold text-white">What's Your Goal?</h3>
      <p className="text-gray-400 mt-2">Select the goal that aligns with your fitness journey</p>
    </div>

    {/* Goals Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {goals.map(goal => (
        <button
          key={goal.id}
          type="button"
          onClick={() => handleInputChange('goal', goal.id)}
          className={`
            w-full relative p-6 rounded-xl text-left transition-all duration-300
            ${formData.goal === goal.id 
              ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 transform scale-[1.02] border-2 border-blue-500/50' 
              : 'bg-gray-800 hover:bg-gray-700 hover:scale-[1.02] border-2 border-transparent'}
          `}
        >
          {/* Selection Indicator */}
          {formData.goal === goal.id && (
            <div className="absolute top-3 right-3">
              <div className="bg-blue-500/20 rounded-full p-1">
                <Check className="w-4 h-4 text-blue-400" />
              </div>
            </div>
          )}

          {/* Content */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{goal.icon}</span>
              <h4 className="text-lg font-semibold text-white">{goal.label}</h4>
            </div>
            
            <p className="text-gray-300 text-sm">{goal.description}</p>

            {/* Calorie Adjustment Info */}
            <div className={`
              text-sm rounded-lg transition-all duration-300
              ${formData.goal === goal.id ? 'text-blue-300' : 'text-gray-400'}
            `}>
              {goal.adjustment > 0 && `+${goal.adjustment} calories/day`}
              {goal.adjustment < 0 && `${goal.adjustment} calories/day`}
              {goal.adjustment === 0 && 'Maintenance calories'}
            </div>

            {/* Selected State Info */}
            {formData.goal === goal.id && (
              <div className="mt-2 text-sm text-blue-300">
                <div className="flex items-center">
                  <Check className="w-4 h-4 mr-1" />
                  <span>Selected Goal</span>
                </div>
              </div>
            )}
          </div>
        </button>
      ))}
    </div>

    {/* Info Box */}
    <div className="mt-6 p-4 rounded-lg bg-gray-800/50 border border-gray-700">
      <div className="flex items-start space-x-3">
        <div className="p-2 rounded-lg bg-blue-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p className="text-sm text-gray-400">
            Your goal will help us determine your daily calorie target and macronutrient distribution. You can always adjust this later based on your progress.
          </p>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Goals;