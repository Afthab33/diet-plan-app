import React from 'react';
import { Check, Activity } from 'lucide-react';

const ActivityLevel = ({ 
  formData, 
  fieldErrors, 
  handleInputChange,
  activityLevels 
}) => {
  return (
    <div className="space-y-4 md:space-y-6 px-2 md:px-0">
      <div className="grid grid-cols-1 gap-4 md:gap-6">
        {activityLevels.map(level => (
          <button
            key={level.id}
            type="button"
            onClick={() => handleInputChange('activity_level', level.id)}
            className={`
              w-full text-left relative overflow-hidden rounded-lg md:rounded-xl p-4 md:p-6 cursor-pointer
              transition-all duration-500 transform hover:scale-[1.02]
              ${formData.activity_level === level.id 
                ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-2 border-blue-500/50' 
                : 'bg-gray-800/50 hover:bg-gray-700/50 border-2 border-transparent'}
              ${!formData.activity_level && fieldErrors.activity_level ? 'border-red-500/50' : ''}
            `}
          >
            <div className="absolute top-0 right-0 mt-3 mr-3 md:mt-4 md:mr-4">
              <div className={`
                w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center
                transition-all duration-300
                ${formData.activity_level === level.id 
                  ? 'border-blue-500 bg-blue-500' 
                  : 'border-gray-500'}
              `}>
                {formData.activity_level === level.id && (
                  <Check className="w-3 h-3 md:w-4 md:h-4 text-white" />
                )}
              </div>
            </div>

            <div className="flex items-start space-x-3 md:space-x-6">
              <div className={`
                p-3 md:p-4 rounded-lg md:rounded-xl transform transition-all duration-300
                ${formData.activity_level === level.id 
                  ? 'bg-blue-500/20 scale-110' 
                  : 'bg-gray-700/50'}
              `}>
                <span className="text-2xl md:text-3xl">{level.icon}</span>
              </div>

              <div className="flex-grow">
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                  <h3 className="text-lg md:text-xl font-semibold text-white">{level.label}</h3>
                  {level.factor && (
                    <span className="inline-block px-2 md:px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 w-fit">
                      {level.factor}x Multiplier
                    </span>
                  )}
                </div>
                <p className="text-sm md:text-base text-gray-300 mb-3">{level.description}</p>
                
                <div className="mt-3 md:mt-4">
                  <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                      style={{ 
                        width: `${(level.factor - 1) * 100}%`,
                        opacity: formData.activity_level === level.id ? '1' : '0.5'
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-1 md:mt-2 text-xs text-gray-400">
                    <span>Base Level</span>
                    <span>High Activity</span>
                  </div>
                </div>

                {formData.activity_level === level.id && (
                  <div className="mt-3 md:mt-4 p-2 md:p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="flex items-center text-xs md:text-sm text-blue-300">
                      <Activity className="w-4 h-4 mr-2" />
                      <span>Your calories will be adjusted by {((level.factor - 1) * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 md:mt-8 p-3 md:p-4 rounded-lg md:rounded-xl bg-gray-800/50 border border-gray-700">
        <div className="flex items-start space-x-3">
          <div className="p-2 rounded-lg bg-yellow-500/20 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-medium text-white mb-1">Activity Level Guide</h4>
            <p className="text-xs md:text-sm text-gray-400">
              Choose the activity level that best represents your typical week. Consider both your exercise routine and daily activities like walking, standing, or physical work.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityLevel;