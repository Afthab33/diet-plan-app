import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Dumbbell, ChevronRight, Heart, 
  ArrowLeft, Check, Bot, AlertCircle, RefreshCcw, Loader2, X, User, Scale, RulerIcon
} from 'lucide-react';
import DietPlanDisplay from '../components/DietDisplay/DietPlanDisplay';
import WorkoutLoader from './WorkoutLoader';
import BasicInfo from '../Steps/BasicInfo';
import ActivityLevel from '../Steps/Activity';
import Goals from '../Steps/Goals';
import DietPreferences from '../Steps/DietPreferences';
import Supplements from '../Steps/Supplements';
import { 
  activityLevels, 
  goals,
  dietTypes, 
  cuisines, 
  mealsPerDay, 
  supplements, 
  formSteps 
} from '../data/constants';
import { calculateNutrition, generateApiPayload } from '@/utils/nutritionCalculator';

const BackButton = ({ onClick }) => (
    <button
      onClick={onClick}
      className="fixed top-4 left-4 z-50 flex items-center px-4 py-2 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-gray-300 hover:text-white transition-all duration-300 hover:scale-105"
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      Back
    </button>
  );

const DietPlanner = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [error, setError] = useState(null);
  const [dietPlan, setDietPlan] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [showSupplements, setShowSupplements] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [weightUnit, setWeightUnit] = useState('kg');
  const [heightUnit, setHeightUnit] = useState('ft');
  const [isDietPreferencesValid, setIsDietPreferencesValid] = useState(false);
  const [displayWeight, setDisplayWeight] = useState('');
  
  const [fieldErrors, setFieldErrors] = useState({
    gender: '',
    age: '',
    weight: '',
    height_feet: '',
    height_inches: '',
    height_cm: '',
    activity_level: ''
  });

  const [processingStates, setProcessingStates] = useState({
    calculatingMetrics: false,
    generatingPlan: false,
    optimizingMeals: false,
    finalizingPlan: false
  });
  

  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    weight: '',
    height_feet: '',
    height_inches: '',
    height_cm: '',
    activity_level: '',
    goal: '',
    diet_type: '',
    cuisines: [],
    meals_per_day: '',
    supplements: [],
    foodRestrictions: [],
    allergies: []
  });


  const handleInputChange = (field, value) => {
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  
    // For non-numeric fields including gender
    if (['gender', 'goal', 'activity_level', 'diet_type', 'cuisine', 'meals_per_day'].includes(field)) {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
      return;
    }


    if (field === 'weight') {
      if (!/^\d*\.?\d*$/.test(value)) return;
      setDisplayWeight(value);
      const weightInKg = weightUnit === 'lbs' ? 
        (parseFloat(value) / 2.20462).toFixed(1) : 
        value;
      
      setFormData(prev => ({
        ...prev,
        weight: weightInKg
      }));
      return;
    }

    if (field === 'height_cm') {
      const regex = /^\d*\.?\d*$/;
      if (value === '' || regex.test(value)) {
        setFormData(prev => ({
          ...prev,
          height_cm: value,
          height_feet: '',
          height_inches: ''
        }));
      }
      return;
    }
    
    if (field === 'height_feet' || field === 'height_inches') {
      const numValue = value.replace(/\D/g, '');
      setFormData(prev => ({
        ...prev,
        [field]: numValue,
        height_cm: ''
      }));
      return;
    }
  
    const numericValue = value.replace(/\D/g, '');
    setFormData(prev => ({
      ...prev,
      [field]: numericValue
    }));
  };

  const handleWeightUnitChange = (newUnit) => {
    if (displayWeight) {
      if (newUnit === 'lbs' && weightUnit === 'kg') {
        // Converting from kg to lbs
        const lbsValue = (parseFloat(displayWeight) * 2.20462).toFixed(1);
        setDisplayWeight(lbsValue);
      } else if (newUnit === 'kg' && weightUnit === 'lbs') {
        // Converting from lbs to kg
        const kgValue = (parseFloat(displayWeight) / 2.20462).toFixed(1);
        setDisplayWeight(kgValue);
      }
    }
    setWeightUnit(newUnit);
  };

  const convertWeight = (value, from, to) => {
    if (!value) return '';
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return '';
    
    if (from === 'kg' && to === 'lbs') {
      return (numValue * 2.20462).toFixed(1);
    }
    if (from === 'lbs' && to === 'kg') {
      return (numValue / 2.20462).toFixed(1);
    }
    return value;
  };

  const convertHeight = {
    cmToFeet: (cm) => {
      if (!cm) return { feet: '', inches: '' };
      const totalInches = cm / 2.54;
      const feet = Math.floor(totalInches / 12);
      const inches = Math.round(totalInches % 12);
      return { feet, inches };
    },
    feetToCm: (feet, inches) => {
      if (!feet && !inches) return '';
      const totalInches = (parseInt(feet) || 0) * 12 + (parseInt(inches) || 0);
      return Math.round(totalInches * 2.54);
    }
  };


  const validateBasicInfo = () => {
    const errors = {};
    
    if (currentStep === 0) {

        if (!formData.gender) {
            errors.gender = 'Please select your gender';
          }

      if (!formData.age) {
        errors.age = 'Age is required';
      } else if (formData.age < 13 || formData.age > 120) {
        errors.age = 'Age must be between 13 and 120';
      }
  
      if (!formData.weight) {
        errors.weight = 'Weight is required';
      } else {
        const weight = parseFloat(formData.weight);
        const minWeight = weightUnit === 'kg' ? 30 : 66;
        const maxWeight = weightUnit === 'kg' ? 300 : 660;
        
        if (weight < minWeight || weight > maxWeight) {
          errors.weight = `Weight must be between ${minWeight} and ${maxWeight} ${weightUnit}`;
        }
      }
  
      if (heightUnit === 'ft') {
        if (!formData.height_feet) {
          errors.height_feet = 'Height (feet) is required';
        } else if (formData.height_feet < 3 || formData.height_feet > 8) {
          errors.height_feet = 'Height must be between 3 and 8 feet';
        }
      
        if (!formData.height_inches) {
          errors.height_inches = 'Height (inches) is required';
        } else if (formData.height_inches < 0 || formData.height_inches > 11) {
          errors.height_inches = 'Inches must be between 0 and 11';
        }
      } else {
        if (!formData.height_cm) {
          errors.height_cm = 'Height is required';
        } else if (formData.height_cm < 91 || formData.height_cm > 243) {
          errors.height_cm = 'Height must be between 91 and 243 cm';
        }
      }

    }
  
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateActivityLevel = () => {
    const errors = {...fieldErrors};
    
    if (currentStep === 1) { // Activity level is step 1
      if (!formData.activity_level) {
        errors.activity_level = 'Please select your activity level';
      }
    }
    
    setFieldErrors(errors);
    return !errors.activity_level;
  };

  const handleCuisineToggle = (cuisineId) => {
    setFormData(prev => ({
      ...prev,
      cuisines: (prev.cuisines || []).includes(cuisineId)
        ? (prev.cuisines || []).filter(id => id !== cuisineId)
        : [...(prev.cuisines || []), cuisineId]
    }));
  };

  const handleSupplementToggle = (supplementId) => {
    setFormData(prev => ({
      ...prev,
      supplements: prev.supplements.includes(supplementId)
        ? prev.supplements.filter(id => id !== supplementId)
        : [...prev.supplements, supplementId]
    }));
  };

  const handleFoodRestrictionToggle = (restrictionId) => {
  setFormData(prev => ({
    ...prev,
    foodRestrictions: prev.foodRestrictions?.includes(restrictionId)
      ? prev.foodRestrictions.filter(id => id !== restrictionId)
      : [...(prev.foodRestrictions || []), restrictionId]
  }));
};

const handleAllergyToggle = (allergyId) => {
  setFormData(prev => ({
    ...prev,
    allergies: prev.allergies?.includes(allergyId)
      ? prev.allergies.filter(id => id !== allergyId)
      : [...(prev.allergies || []), allergyId]
  }));
 };


 const handleStepComplete = (nextStep) => {
  if (nextStep > currentStep) {
    let isValid = validateStep(currentStep);
    
    if (!isValid) {
      setError(`Please complete all required fields in ${formSteps[currentStep].title}`);
      setTimeout(() => setError(null), 3000);
      return;
    }
  }

  if (nextStep >= 0 && nextStep < formSteps.length) {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(nextStep);
      setIsAnimating(false);
    }, 300);
  }
};


// Component for error handling
const ErrorDisplay = ({ error, onRetry, onBack }) => (
    <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800/90 rounded-2xl p-8 max-w-md w-full mx-4">
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-red-500/20 rounded-full animate-pulse" />
            <AlertCircle className="w-12 h-12 text-red-400 relative" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-white text-center mb-4">
          Oops! Something went wrong
        </h3>
        <p className="text-gray-300 text-center mb-6">
          {error}
        </p>
        <div className="space-y-3">
          <button
            onClick={onRetry}
            className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium transition-all duration-300 hover:scale-[1.02] flex items-center justify-center space-x-2"
          >
            <RefreshCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <button
            onClick={onBack}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-medium transition-colors duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );

  const validateStep = (stepNumber) => {
    switch (stepNumber) {
      case 0: // Basic Info
        return validateBasicInfo();
      case 1: // Activity Level
        return validateActivityLevel();
      case 2: // Goals
        return formData.goal !== '';
      case 3: // Diet Preferences
      return isDietPreferencesValid;
      case 4: // Supplements
        return true; // Supplements are optional
      default:
        return true;
    }
  };

  const handleFinalSubmit = async () => {
    if (!validateStep(currentStep)) return;
  
    try {
      setProcessingStates({
        calculatingMetrics: true,
        generatingPlan: false,
        optimizingMeals: false,
        finalizingPlan: false
      });
  
      // Calculating nutrition data with all details
      const nutritionData = calculateNutrition({
        gender: formData.gender,
        age: Number(formData.age),
        weight: weightUnit === 'lbs' ? convertWeight(formData.weight, 'lbs', 'kg') : Number(formData.weight),
        height: heightUnit === 'ft' ? convertHeight.feetToCm(formData.height_feet, formData.height_inches) : Number(formData.height_cm),
        activityLevel: formData.activity_level,
        goal: formData.goal,
        mealsPerDay: Number(formData.meals_per_day),
        dietType: formData.diet_type,
        cuisines: formData.cuisines,
        foodRestrictions: formData.foodRestrictions,
        supplements: formData.supplements
      });
  
      setProcessingStates({
        calculatingMetrics: false,
        generatingPlan: true,
        optimizingMeals: false,
        finalizingPlan: false
      });
  
      // Generating API payload
      const apiPayload = generateApiPayload(nutritionData, formData);
  
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API_URL}/api/generate-diet/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiPayload)
      });
  
      if (!response.ok) throw new Error('Failed to generate meal plan');
  
      const mealPlan = await response.json();
  
      // Creating complete diet plan with all calculation details
      const completeDietPlan = {
        ...mealPlan,
        daily_summary: {
          calories: nutritionData.calories,
          protein: nutritionData.protein,
          carbs: nutritionData.carbs,
          fats: nutritionData.fats,
          macro_percentages: nutritionData.macroPercentages,
          calculations: nutritionData.calculations 
        }
      };
  
      setDietPlan(completeDietPlan);
      setShowResults(true);
  
    } catch (error) {
      setApiError(error.message);
    } finally {
      setProcessingStates({
        calculatingMetrics: false,
        generatingPlan: false,
        optimizingMeals: false,
        finalizingPlan: false
      });
    }
  };

const styles = `
@keyframes progress {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.animate-progress {
  animation: progress 2s linear infinite;
}
`;

  const renderCurrentStep = () => {
    const step = formSteps[currentStep];
    const StepIcon = step.icon;

    return (
      <div className={`transform transition-all duration-500 ease-out
        ${isAnimating ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}>
        <div className="mb-8 text-center">
          <div className="inline-block p-3 rounded-full bg-blue-500/10 mb-4">
            <StepIcon className="w-8 h-8 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">{step.title}</h2>
          <p className="text-gray-400">{step.description}</p>
        </div>

        <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
          <CardContent className="p-6">
          {step.fields.includes('age') && (
            <BasicInfo 
            formData={formData}
            fieldErrors={fieldErrors}
            handleInputChange={handleInputChange}
            weightUnit={weightUnit}
            setWeightUnit={setWeightUnit}
            convertWeight={convertWeight}
            heightUnit={heightUnit}
            setHeightUnit={setHeightUnit}
            convertHeight={convertHeight}
            displayWeight={displayWeight}
            setDisplayWeight={setDisplayWeight}
          />
          )}

          {step.fields.includes('activity_level') && (
            <ActivityLevel 
            formData={formData}
            fieldErrors={fieldErrors}
            handleInputChange={handleInputChange}
            activityLevels={activityLevels}
          />
          )}

          {step.fields.includes('goal') && (
            <Goals 
            formData={formData}
            handleInputChange={handleInputChange}
            goals={goals}
          />
          )}

          {step.fields.includes('diet_type') && (
            <DietPreferences 
            formData={formData}
            handleInputChange={handleInputChange}
            handleCuisineToggle={handleCuisineToggle}
            handleFoodRestrictionToggle={handleFoodRestrictionToggle}
            handleAllergyToggle={handleAllergyToggle}
            dietTypes={dietTypes}
            cuisines={cuisines}
            mealsPerDay={mealsPerDay}
            onValidationChange={setIsDietPreferencesValid}
          />
          )}

          {step.fields.includes('supplements') && (
            <Supplements 
            formData={formData}
            handleSupplementToggle={handleSupplementToggle}
            showSupplements={showSupplements}
            setShowSupplements={setShowSupplements}
            supplements={supplements}
          />
          )}
      </CardContent>
      </Card>

        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={() => handleStepComplete(currentStep - 1)}
            disabled={currentStep === 0}
            className={`
              px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2
              ${currentStep === 0 
                ? 'opacity-0 pointer-events-none' 
                : 'opacity-100 bg-gray-700 hover:bg-gray-600 text-white'}
            `}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          {currentStep === formSteps.length - 1 ? (
            <button
              onClick={handleFinalSubmit}
              disabled={Object.values(processingStates).some(Boolean)}
              className="px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-blue-500 to-purple-500 
                hover:from-blue-400 hover:to-purple-400 text-white transition-all duration-300 
                flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {Object.values(processingStates).some(Boolean) ? (
                <>
                  <span>Generating Plan...</span>
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                </>
              ) : (
                <>
                  <span>Generate Plan</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          ) : (
            <button
              onClick={() => handleStepComplete(currentStep + 1)}
              className="px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-blue-500 to-purple-500 
                hover:from-blue-400 hover:to-purple-400 text-white transition-all duration-300 
                flex items-center space-x-2"
            >
              <span>Continue</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  };

  if (showResults && dietPlan) {
    return (
      <div className="min-h-screen">
        <DietPlanDisplay 
          dietPlan={dietPlan}
          formData={formData}
          setFormData={setFormData}
          userInfo={{
            ...formData,
            nutritionCalc: dietPlan.daily_summary
          }}
          onReset={() => {
            setDietPlan(null);
            setShowResults(false);
            setFormData({
              gender: '',
              age: '',
              weight: '',
              height_feet: '',
              height_inches: '',
              height_cm: '',
              activity_level: '',
              goal: '',
              diet_type: '',
              cuisine: '',
              meals_per_day: '',
              supplements: [],
              foodRestrictions: [],
              allergies: []
            });
            setCurrentStep(0);
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
        <style>{styles}</style>
      <BackButton onClick={onBack} />

      <div className="relative min-h-screen flex flex-col">
        <main className="flex-grow container mx-auto max-w-2xl px-4 py-8">
          {error && (
            <Alert className="mb-6 bg-red-900/50 border-red-500">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {renderCurrentStep()}
        </main>

        <footer className="py-6 text-center text-gray-500">
          <div className="flex items-center justify-center space-x-2">
            <Heart className="w-4 h-4" />
            <span>Crafted with care for your health journey</span>
          </div>
        </footer>
      </div>

    {/* Processing Animation */}
    {Object.values(processingStates).some(Boolean) && <WorkoutLoader />}

      {/* Error Display */}
      {apiError && (
        <ErrorDisplay 
          error={apiError}
          onRetry={handleFinalSubmit}
          onBack={() => {
            setApiError(null);
            setProcessingStates({
              calculatingMetrics: false,
              generatingPlan: false,
              optimizingMeals: false,
              finalizingPlan: false
            });
          }}
        />
      )}

{/* Diet Plan Display */}
{dietPlan && showResults && (
        <div className="transition-all duration-500 ease-out">
          <DietPlanDisplay 
            dietPlan={dietPlan} 
            userInfo={formData}
            onReset={() => {
              setDietPlan(null);
              setShowResults(false);
              setFormData({
                gender: '',
                age: '',
                weight: '',
                height_feet: '',
                height_inches: '',
                height_cm: '',
                activity_level: '',
                goal: '',
                diet_type: '',
                cuisine: '',
                meals_per_day: '',
                supplements: [],
                foodRestrictions: [],
                allergies: []
              });
              setCurrentStep(0);
            }} 
          />
        </div>
      )}

      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
};

<style>{`
  @keyframes gradient {
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
    20%, 40%, 60%, 80% { transform: translateX(4px); }
  }

  .shake-animation {
    animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  .invalid-field {
    animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  @keyframes progress {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  
  .animate-progress {
    animation: progress 2s linear infinite;
  }
    @media print {
    #diet-plan-content {
      max-height: none !important;
      height: auto !important;
      overflow: visible !important;
      padding: 20px !important;
      break-inside: avoid;
    }
    
    /* Prevent content from being cut off at page breaks */
    section {
      break-inside: avoid;
      margin-bottom: 20px;
    }
    
    /* Ensure cards don't get split across pages */
    .card {
      break-inside: avoid;
      margin-bottom: 15px;
    }
    
    body {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  }
`}</style>

export default DietPlanner;