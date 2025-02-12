import React from 'react';
import { Card } from '@/components/ui/card';
import { X, Check, AlertTriangle, Info, ChevronRight } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {foodRestrictions, foodAllergies} from '../data/constants';

const DietPreferences = ({ 
  formData, 
  handleInputChange, 
  handleCuisineToggle,
  dietTypes, 
  cuisines, 
  mealsPerDay,
  handleFoodRestrictionToggle,
  handleAllergyToggle 
}) => {

  return (
    <div className="space-y-12">
      {/* Diet Type Selection with Enhanced UI */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-gray-700 pb-4">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold text-white">Diet Type</h3>
            <p className="text-sm text-gray-400">Select your primary dietary preference</p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-blue-400">
            <Info className="w-4 h-4" />
            <span>Your base diet plan</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dietTypes.map((diet) => (
            <button
              key={diet.id}
              onClick={() => handleInputChange('diet_type', diet.id)}
              className={`
                relative group overflow-hidden rounded-2xl p-6 transition-all duration-300
                ${formData.diet_type === diet.id 
                  ? 'bg-gradient-to-br from-green-500/20 to-emerald-600/20 ring-2 ring-green-500/50 scale-[1.02]' 
                  : 'bg-gray-800/50 hover:bg-gray-700/50 hover:scale-[1.02]'}
              `}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <span className="text-4xl transform transition-transform duration-300 group-hover:scale-110">
                    {diet.icon}
                  </span>
                </div>
                <div className="flex-1 text-left space-y-2">
                  <h4 className="font-semibold text-lg text-white">{diet.label}</h4>
                  <p className="text-sm text-gray-400">{diet.description}</p>
                  {formData.diet_type === diet.id && (
                    <div className="flex items-center space-x-2 text-green-400 text-sm">
                      <Check className="w-4 h-4" />
                      <span>Selected</span>
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Food Allergies Section with Enhanced Warning */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-gray-700 pb-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <h3 className="text-xl font-semibold text-white">Food Allergies</h3>
            </div>
            <p className="text-sm text-gray-400">Select any food allergies or intolerances you have</p>
          </div>
        </div>

        <Alert className="bg-red-900/20 border-red-500/50">
          <AlertTriangle className="h-4 w-4 text-red-400" />
          <AlertDescription className="text-sm text-red-200">
            Selected allergens will be strictly excluded from your meal plan for your safety
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {foodAllergies.map((allergy) => (
            <button
              key={allergy.id}
              onClick={() => handleAllergyToggle(allergy.id)}
              className={`
                relative group overflow-hidden rounded-xl p-6 transition-all duration-300
                ${formData.allergies?.includes(allergy.id)
                  ? 'bg-gradient-to-br from-red-500/30 to-red-600/30 ring-2 ring-red-500/50' 
                  : 'bg-gray-800/50 hover:bg-gray-700/50'}
              `}
            >
              <div className="flex items-start space-x-4">
                <span className="text-3xl transform transition-transform duration-300 group-hover:scale-110">
                  {allergy.icon}
                </span>
                <div className="flex-1 text-left space-y-2">
                  <h4 className="font-medium text-white flex items-center justify-between">
                    {allergy.label}
                    {formData.allergies?.includes(allergy.id) && (
                      <span className="animate-pulse text-red-400">⚠️</span>
                    )}
                  </h4>
                  <p className="text-sm text-gray-400">{allergy.description}</p>
                  <p className="text-xs text-gray-500">{allergy.details}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Food Restrictions - Enhanced Non-veg Section */}
      {formData.diet_type === 'non-veg' && (
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-gray-700 pb-4">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-white">Dietary Restrictions</h3>
              <p className="text-sm text-gray-400">Select any specific meats you don't eat</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {foodRestrictions.map((restriction) => (
              <button
                key={restriction.id}
                onClick={() => handleFoodRestrictionToggle(restriction.id)}
                className={`
                  relative group overflow-hidden rounded-xl p-6 transition-all duration-300
                  ${formData.foodRestrictions?.includes(restriction.id)
                    ? 'bg-gradient-to-br from-orange-500/20 to-yellow-600/20 ring-2 ring-orange-500/50' 
                    : 'bg-gray-800/50 hover:bg-gray-700/50'}
                `}
              >
                <div className="flex items-start space-x-4">
                  <span className="text-3xl transform transition-transform duration-300 group-hover:scale-110">
                    {restriction.icon}
                  </span>
                  <div className="flex-1 text-left space-y-2">
                    <h4 className="font-medium text-white">{restriction.label}</h4>
                    <p className="text-sm text-gray-400">{restriction.description}</p>
                    <p className="text-xs text-gray-500">{restriction.details}</p>
                  </div>
                  {formData.foodRestrictions?.includes(restriction.id) ? (
                    <X className="w-5 h-5 text-orange-400" />
                  ) : (
                    <Check className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Enhanced Cuisines Selection */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-gray-700 pb-4">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold text-white">Preferred Cuisines</h3>
            <p className="text-sm text-gray-400">
              Select cuisines you enjoy most. Your meal plan will focus on these styles.
            </p>
          </div>
          <div className="text-sm text-blue-400">
            Select multiple
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cuisines.map((cuisine) => (
            <button
              key={cuisine.id}
              onClick={() => handleCuisineToggle(cuisine.id)}
              className={`
                relative group overflow-hidden rounded-xl p-4 transition-all duration-300
                ${formData.cuisines?.includes(cuisine.id)
                  ? 'bg-gradient-to-br from-blue-500/20 to-purple-600/20 ring-2 ring-blue-500/50' 
                  : 'bg-gray-800/50 hover:bg-gray-700/50'}
              `}
            >
              <div className="flex flex-col items-center space-y-3">
                <span className="text-3xl transform transition-transform duration-300 group-hover:scale-110">
                  {cuisine.icon}
                </span>
                <span className="font-medium text-white text-sm">{cuisine.label}</span>
                {cuisine.description && (
                  <p className="text-xs text-gray-400 text-center">{cuisine.description}</p>
                )}
                {formData.cuisines?.includes(cuisine.id) && (
                  <div className="absolute top-2 right-2">
                    <Check className="w-4 h-4 text-blue-400" />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Enhanced Meals Per Day Selection */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-gray-700 pb-4">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold text-white">Daily Meal Schedule</h3>
            <p className="text-sm text-gray-400">
              Choose how many meals you'd like per day. This affects portion sizes and timing.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {mealsPerDay.map((option) => (
            <button
              key={option.value}
              onClick={() => handleInputChange('meals_per_day', option.value)}
              className={`
                relative group overflow-hidden rounded-xl p-6 transition-all duration-300
                ${formData.meals_per_day === option.value
                  ? 'bg-gradient-to-br from-purple-500/20 to-pink-600/20 ring-2 ring-purple-500/50' 
                  : 'bg-gray-800/50 hover:bg-gray-700/50'}
              `}
            >
              <div className="flex flex-col items-center space-y-3">
                <span className="text-3xl transform transition-transform duration-300 group-hover:scale-110">
                  {option.icon}
                </span>
                <div className="text-center">
                  <span className="font-medium text-white">{option.label}</span>
                  {option.description && (
                    <p className="text-xs text-gray-400 mt-1">{option.description}</p>
                  )}
                </div>
                {formData.meals_per_day === option.value && (
                  <div className="absolute top-2 right-2">
                    <Check className="w-4 h-4 text-purple-400" />
                  </div>
                )}
              </div>
              {option.timing && (
                <div className="mt-2 text-xs text-gray-500 text-center">
                  {option.timing}
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Meal Schedule Information */}
        <div className="bg-gray-800/50 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-400 mt-0.5" />
            <div className="text-sm text-gray-400">
              <p>Your meal plan will be adjusted based on your selected frequency:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>3 meals: Traditional breakfast, lunch, and dinner</li>
                <li>4 meals: Adds a light afternoon snack</li>
                <li>5 meals: Includes morning and afternoon snacks</li>
                <li>6 meals: Smaller, more frequent meals throughout the day</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DietPreferences;