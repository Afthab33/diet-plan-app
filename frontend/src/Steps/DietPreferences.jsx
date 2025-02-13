import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { X, Check, AlertTriangle, Info, ChevronRight } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { foodRestrictions, foodAllergies } from '../data/constants';

const DietPreferences = ({ 
  onValidationChange, // Add this prop
  formData, 
  handleInputChange, 
  handleCuisineToggle,
  dietTypes, 
  cuisines, 
  mealsPerDay,
  handleFoodRestrictionToggle,
  handleAllergyToggle 
}) => {
  const [showAllergies, setShowAllergies] = useState(false);
  const [showAllergiesQuestion, setShowAllergiesQuestion] = useState(true);

  // Validation checks
  const isRequiredFieldsSelected = 
    formData.diet_type && 
    formData.meals_per_day &&
    formData.cuisines?.length > 0;

  // Notify parent component of validation status
  React.useEffect(() => {
    if (onValidationChange) {
      onValidationChange(isRequiredFieldsSelected);
    }
  }, [isRequiredFieldsSelected, onValidationChange]);

  return (
    <div className="space-y-12">
      {/* Required Fields Notice */}
      <Alert className="bg-blue-900/20 border-blue-500/50">
        <Info className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-sm text-blue-200">
          Please select one option from each required section marked with * to proceed
        </AlertDescription>
      </Alert>

      {/* Diet Type Selection with Enhanced UI */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-gray-700 pb-4">
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-white bg-gradient-to-r from-white to-gray-400 bg-clip-text">
              Diet Type <span className="text-red-400">*</span>
            </h3>
            <p className="text-sm text-gray-400">Select your primary dietary preference</p>
          </div>
          {!formData.diet_type && (
            <span className="text-sm text-yellow-400">Required</span>
          )}
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
              {/* Diet type content remains the same */}
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

      {/* Enhanced Cuisines Selection */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-gray-700 pb-4">
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-white bg-gradient-to-r from-white to-gray-400 bg-clip-text">
              Primary Cuisine <span className="text-red-400">*</span>
            </h3>
            <p className="text-sm text-gray-400">
              Select at least one cuisine you enjoy most. Feel free to select multiple if you'd like variety.
            </p>
          </div>
          {formData.cuisines?.length === 0 && (
            <span className="text-sm text-yellow-400">Required</span>
          )}
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
              {/* Cuisine content remains the same */}
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

      {/* Food Allergies Question */}
      {showAllergiesQuestion && (
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-700 pb-4">
            <h3 className="text-2xl font-bold text-white bg-gradient-to-r from-white to-gray-400 bg-clip-text">
              Do you have any food allergies?
            </h3>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => {
                setShowAllergies(true);
                setShowAllergiesQuestion(false);
              }}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white transition-all duration-300 transform hover:scale-105"
            >
              Yes, I have allergies
            </button>
            <button
              onClick={() => setShowAllergiesQuestion(false)}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white transition-all duration-300 transform hover:scale-105"
            >
              No allergies
            </button>
          </div>
        </section>
      )}

      {/* Collapsible Food Allergies Section */}
      {showAllergies && (
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-gray-700 pb-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h3 className="text-2xl font-bold text-white bg-gradient-to-r from-white to-gray-400 bg-clip-text">
                  Food Allergies <span className="text-gray-400 text-sm">(Optional)</span>
                </h3>
              </div>
              <p className="text-sm text-gray-400">Select any food allergies or intolerances you have</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {foodAllergies.map((allergy) => (
              /* Allergy selection buttons remain the same */
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
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Food Restrictions - Enhanced Non-veg Section */}
      {formData.diet_type === 'non-veg' && (
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-gray-700 pb-4">
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-white bg-gradient-to-r from-white to-gray-400 bg-clip-text">
                Dietary Restrictions <span className="text-gray-400 text-sm">(Optional)</span>
              </h3>
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

          <div className="bg-gray-800/50 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5" />
              <p className="text-sm text-gray-400">
                These preferences will help us customize your meal plan by excluding specific meats you don't consume
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Enhanced Meals Per Day Selection */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-gray-700 pb-4">
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-white bg-gradient-to-r from-white to-gray-400 bg-clip-text">
              Daily Meal Schedule <span className="text-red-400">*</span>
            </h3>
            <p className="text-sm text-gray-400">
              Choose how many meals you'd like per day
            </p>
          </div>
          {!formData.meals_per_day && (
            <span className="text-sm text-yellow-400">Required</span>
          )}
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
            </button>
          ))}
        </div>
      </section>

      {/* Form Validation Status */}
      {!isRequiredFieldsSelected && (
        <Alert className="bg-yellow-900/20 border-yellow-500/50">
          <AlertTriangle className="h-4 w-4 text-yellow-400" />
          <AlertDescription className="text-sm text-yellow-200">
            Please complete all required fields (*) to proceed
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default DietPreferences;