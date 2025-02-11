import React from 'react';
import { Check, Apple, X } from 'lucide-react';

const DietPreferences = ({ 
  formData, 
  handleInputChange,
  handleCuisineToggle,
  dietTypes,
  cuisines,
  mealsPerDay 
}) => {
  return (
    <div className="space-y-8">
    {/* Header */}
    <div className="text-center mb-8">
      <div className="inline-block p-3 rounded-full bg-gradient-to-r from-green-500/20 to-teal-500/20 mb-4">
        <Apple className="w-8 h-8 text-green-400" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-2">Dietary Preferences</h3>
      <p className="text-gray-400">Customize your meal plan to match your dietary needs</p>
    </div>

    {/* Diet Type Selection */}
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-medium text-white flex items-center">
          <span>Diet Type</span>
          <span className="ml-2 px-3 py-1 text-xs bg-green-500/10 text-green-400 rounded-full">Choose one</span>
        </h4>
        <span className="text-sm text-red-400 bg-red-500/10 px-3 py-1 rounded-full font-medium">Required</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dietTypes.map(type => (
          <button
            key={type.id}
            type="button"
            onClick={() => handleInputChange('diet_type', type.id)}
            className={`
              w-full p-5 rounded-xl text-center transition-all duration-300 relative hover:shadow-lg
              ${formData.diet_type === type.id 
                ? 'bg-gradient-to-r from-green-500/20 to-teal-500/20 transform scale-[1.02] border-2 border-green-500/50' 
                : 'bg-gray-800 hover:bg-gray-700 hover:scale-[1.02] border-2 border-transparent'}
            `}
          >
            {formData.diet_type === type.id && (
              <div className="absolute top-2 right-2 bg-green-500/20 rounded-full p-1">
                <Check className="w-4 h-4 text-green-400" />
              </div>
            )}
            <span className="text-3xl mb-3 block">{type.icon}</span>
            <h5 className="font-semibold text-white mb-2">{type.label}</h5>
            <p className="text-sm text-gray-300">{type.description}</p>
          </button>
        ))}
      </div>
    </div>

    {/* Cuisine Preference - Multi Select */}
    <div className="space-y-4 mt-8">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-lg font-medium text-white flex items-center">
            <span>Cuisine Preferences</span>
            <span className="ml-2 px-3 py-1 text-xs bg-yellow-500/10 text-yellow-400 rounded-full">Mix & Match</span>
          </h4>
          <p className="text-sm text-gray-400 mt-1">
            If you'd like, select any cuisines you enjoy to create your perfect blend of flavors!
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {formData.cuisines?.length > 0 && (
            <button
              onClick={() => handleInputChange('cuisines', [])}
              className="text-sm bg-gray-700/50 hover:bg-gray-600/50 px-3 py-1 rounded-full text-gray-300 hover:text-white transition-colors flex items-center"
            >
            </button>
          )}
          <span className="text-sm bg-yellow-500/10 px-3 py-1 rounded-full text-yellow-400 font-medium">
            {formData.cuisines?.length || 0} selected
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {cuisines.map(cuisine => (
          <button
            key={cuisine.id}
            type="button"
            onClick={() => handleCuisineToggle(cuisine.id)}
            className={`
              w-full p-4 rounded-xl text-center transition-all duration-300 relative hover:shadow-lg
              ${formData.cuisines?.includes(cuisine.id)
                ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 transform scale-[1.02] border-2 border-yellow-500/50' 
                : 'bg-gray-800 hover:bg-gray-700 hover:scale-[1.02] border-2 border-transparent'}
            `}
          >
            {formData.cuisines?.includes(cuisine.id) && (
              <div className="absolute top-2 right-2 bg-yellow-500/20 rounded-full p-1">
                <Check className="w-4 h-4 text-yellow-400" />
              </div>
            )}
            <span className="text-3xl mb-2 block transform transition-transform duration-300 hover:scale-110">{cuisine.icon}</span>
            <span className="font-medium text-white">{cuisine.label}</span>
          </button>
        ))}
      </div>

      {/* Selected Cuisines Summary */}
      {formData.cuisines?.length > 0 && (
        <div className="mt-4 p-4 rounded-lg bg-gray-800/50 border border-gray-700">
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-lg bg-yellow-500/20">
              <Check className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <h5 className="text-sm font-medium text-white mb-1">Your Preferred Cuisines</h5>
              <div className="flex flex-wrap gap-2">
                {formData.cuisines.map(id => {
                  const cuisine = cuisines.find(c => c.id === id);
                  return (
                    <span 
                      key={id}
                      className="inline-flex items-center px-3 py-1 rounded-full bg-gray-700/50 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
                    >
                      <span className="mr-1.5">{cuisine?.icon}</span>
                      {cuisine?.label}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCuisineToggle(id);
                        }}
                        className="ml-2 hover:text-red-400 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-700 mt-6">
        <div className="flex items-start space-x-3">
          <div className="p-2 rounded-lg bg-blue-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-400">
              Selecting multiple cuisines will give you a more diverse meal plan with mixed dishes from your favorite cuisines.
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Meals Per Day */}
    <div className="space-y-4 mt-8">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-medium text-white flex items-center">
          <span>Meals Per Day</span>
          <span className="ml-2 px-3 py-1 text-xs bg-purple-500/10 text-purple-400 rounded-full">Choose one</span>
        </h4>
        <span className="text-sm text-red-400 bg-red-500/10 px-3 py-1 rounded-full font-medium">Required</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mealsPerDay.map(option => (
          <button
            key={option.id}
            type="button"
            onClick={() => handleInputChange('meals_per_day', option.id)}
            className={`
              w-full p-5 rounded-xl text-center transition-all duration-300 relative hover:shadow-lg
              ${formData.meals_per_day === option.id 
                ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 transform scale-[1.02] border-2 border-purple-500/50' 
                : 'bg-gray-800 hover:bg-gray-700 hover:scale-[1.02] border-2 border-transparent'}
            `}
          >
            {formData.meals_per_day === option.id && (
              <div className="absolute top-2 right-2 bg-purple-500/20 rounded-full p-1">
                <Check className="w-4 h-4 text-purple-400" />
              </div>
            )}
            <span className="text-2xl mb-2 block transform transition-transform duration-300 hover:scale-110">{option.icon}</span>
            <h5 className="font-semibold text-white mb-1">{option.label}</h5>
            <p className="text-sm text-gray-300">{option.description}</p>
          </button>
        ))}
      </div>
    </div>

    {/* Final Info Box */}
    <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-700 mt-6">
      <div className="flex items-start space-x-3">
        <div className="p-2 rounded-lg bg-blue-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p className="text-sm text-gray-400">
            These preferences will help us create a personalized meal plan that fits your lifestyle and taste preferences. 
            Selecting multiple cuisines will give you more variety in your meal options.
          </p>
        </div>
      </div>
    </div>
  </div>
  );
};

export default DietPreferences;