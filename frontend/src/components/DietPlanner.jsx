import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Dumbbell, Activity, Target, Apple, 
  Weight, Trophy, ChevronRight, Heart, 
  ArrowLeft, Check, Bot, Brain, AlertCircle, RefreshCcw, Loader2, X, User, Scale, RulerIcon
} from 'lucide-react';
import DietPlanDisplay from './DietPlanDisplay';
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dietPlan, setDietPlan] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [showSupplements, setShowSupplements] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [weightUnit, setWeightUnit] = useState('kg');
  const [heightUnit, setHeightUnit] = useState('ft'); 
  
  const [fieldErrors, setFieldErrors] = useState({
    gender: '',
    age: '',
    weight: '',
    height_feet: '',
    height_inches: '',
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
    activity_level: '',
    goal: '',
    diet_type: '',
    cuisines: [],
    meals_per_day: '',
    supplements: []
  });


  const handleInputChange = (field, value) => {
    // Clear error when user makes a selection
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
        const numValue = value.replace(/\D/g, '');
        // Convert the weight to kg before storing if input is in lbs
        const weightInKg = weightUnit === 'lbs' ? 
          convertWeight(numValue, 'lbs', 'kg') : 
          numValue;
        
        setFormData(prev => ({
          ...prev,
          [field]: weightInKg
        }));
        return;
      }
  
    // For numeric inputs
    const numericValue = value.replace(/\D/g, '');
    setFormData(prev => ({
      ...prev,
      [field]: numericValue
    }));
  };

  const convertWeight = (value, from, to) => {
    if (!value) return '';
    const numValue = parseFloat(value);
    if (from === 'kg' && to === 'lbs') {
      return Math.round(numValue * 2.20462);
    }
    if (from === 'lbs' && to === 'kg') {
      return Math.round(numValue / 2.20462);
    }
    return numValue;
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
  
  const validateGoalSelection = () => {
    if (currentStep === 2) { // Assuming goals step is index 2
      if (!formData.goal) {
        return false;
      }
    }
    return true;
  };

  const handleCuisineToggle = (cuisineId) => {
    setFormData(prev => ({
      ...prev,
      cuisines: prev.cuisines.includes(cuisineId)
        ? prev.cuisines.filter(id => id !== cuisineId)
        : [...prev.cuisines, cuisineId]
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

  const handleStepComplete = (nextStep) => {
    if (nextStep > currentStep) {
      let isValid = true;
      
      if (currentStep === 0) {
        isValid = validateBasicInfo();
      } else if (currentStep === 1) {
        isValid = validateActivityLevel();
      } else if (currentStep === 2) {
        isValid = validateGoalSelection();
      }
  
      if (!isValid) {
        // Optional: Add some visual feedback like a shake animation
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


  const EnhancedInput = ({ label, value, onChange, placeholder }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl bg-gray-700/50 border-gray-600 
          focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100 
          transition-all duration-300"
      />
    </div>
  );

  const CardOption = ({ 
    selected, 
    onClick, 
    color = 'from-blue-500/20 to-blue-600/20',
    children 
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full relative overflow-hidden rounded-xl p-4 transition-all duration-300
        ${selected 
          ? `bg-gradient-to-br ${color} scale-105 ring-2 ring-blue-400` 
          : 'bg-gray-800 hover:bg-gray-700'}
        cursor-pointer hover:scale-105 group
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent 
        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10">
        {children}
        {selected && (
          <div className="absolute top-2 right-2">
            <Check className="w-4 h-4 text-blue-400" />
          </div>
        )}
      </div>
    </button>
  );

  const ProgressIndicator = () => (
    <div className="fixed top-0 left-0 w-full z-50">
      <div className="h-1 bg-gray-800">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
            transition-all duration-700 ease-out"
          style={{ 
            width: `${((currentStep + 1) / formSteps.length) * 100}%`,
            backgroundSize: '200% 100%',
            animation: 'gradient 2s linear infinite'
          }}
        />
      </div>
    </div>
  );

  const ProcessingAnimation = ({ states }) => (
    <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800/90 rounded-2xl p-8 max-w-md w-full mx-4">
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping" />
            <Bot className="w-12 h-12 text-blue-400 relative animate-pulse" />
          </div>
        </div>
        
        <div className="space-y-4">
          {Object.entries(states).map(([key, active], index) => {
            const label = key
              .replace(/([A-Z])/g, ' $1')
              .toLowerCase()
              .replace(/^\w/, c => c.toUpperCase());
              
            return (
              <div key={key} className="relative">
                <div className="flex items-center space-x-3">
                  {active ? (
                    <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-600" />
                  )}
                  <span className={active ? 'text-blue-400' : 'text-gray-400'}>
                    {label}
                  </span>
                </div>
                {index < Object.entries(states).length - 1 && (
                  <div className="absolute left-2.5 top-full h-8 w-px bg-gray-600" />
                )}
              </div>
            );
          })}
        </div>
  
        {/* AI Processing Visual */}
        <div className="mt-8">
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-progress" />
          </div>
          <div className="mt-4 text-sm text-gray-400 text-center">
            AI is crafting your personalized diet plan...
          </div>
        </div>
      </div>
    </div>
  );

  // Add this component for error handling
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
        return formData.diet_type !== '' && 
               formData.cuisine !== '' && 
               formData.meals_per_day !== '';
      case 4: // Supplements
        return true; // Supplements are optional
      default:
        return true;
    }
  };

  const handleFinalSubmit = async () => {
    if (!validateStep(currentStep)) {
      return;
    }
  
    // Format the cuisines data properly
    const formattedData = {
      ...formData,
      // Include both the original cuisines array and a primary cuisine
      cuisines: formData.cuisines || [],
      cuisine: formData.cuisines && formData.cuisines.length > 0 
        ? formData.cuisines[0]  // Take the first cuisine as primary
        : 'international'  // Default fallback
    };
  
    // Reset states
    setApiError(null);
    setProcessingStates({
      calculatingMetrics: false,
      generatingPlan: true,
      optimizingMeals: false,
      finalizingPlan: false
    });
  
    try {
      const response = await fetch("http://127.0.0.1:8000/api/generate-diet/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formattedData)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to generate diet plan');
      }
  
      const data = await response.json();
      
      if (!data) {
        throw new Error('Invalid response from server');
      }
  
      // Store the plan and show results
      setDietPlan(data);
      setShowResults(true);
  
    } catch (err) {
      setApiError(err.message || 'Failed to generate diet plan. Please try again.');
      console.error('Error:', err);
    } finally {
      setProcessingStates({
        calculatingMetrics: false,
        generatingPlan: false,
        optimizingMeals: false,
        finalizingPlan: false
      });
    }
  };

  // Add to your component's styles
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
  dietTypes={dietTypes}
  cuisines={cuisines}
  mealsPerDay={mealsPerDay}
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
      <DietPlanDisplay 
        dietPlan={dietPlan}
        formData={formData}
        onReset={() => {
          setDietPlan(null);
          setShowResults(false);
          setFormData({
            age: '',
            weight: '',
            height_feet: '',
            height_inches: '',
            activity_level: '',
            goal: '',
            diet_type: '',
            cuisine: '',
            meals_per_day: '',
            supplements: []
          });
          setCurrentStep(0);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative">
        <style>{styles}</style>
      <BackButton onClick={onBack} />

      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm">
          <div className="text-center">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 animate-ping rounded-full" />
              <div className="relative animate-bounce">
                <Dumbbell className="w-16 h-16 text-blue-500" />
              </div>
            </div>
            <h3 className="mt-4 text-2xl font-bold text-white animate-pulse">
              Crafting Your Perfect Diet Plan
            </h3>
          </div>
        </div>
      )}

      <div className="relative min-h-screen flex flex-col">
        <header className="py-8 text-center">
          <div className="flex justify-center items-center mb-4">
            <div className="relative">
              <Dumbbell className="w-16 h-16 text-blue-500" />
              <div className="absolute inset-0 bg-blue-500 filter blur-xl opacity-20 animate-pulse" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 
            to-pink-400 bg-clip-text text-transparent">
            Diet Plan Generator
          </h1>
          <p className="mt-4 text-gray-400 max-w-md mx-auto">
            Personalized nutrition planning designed for your goals
          </p>
        </header>

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
            onReset={() => {
              setDietPlan(null);
              setShowResults(false);
              setFormData({
                gender: '',
                age: '',
                weight: '',
                height_feet: '',
                height_inches: '',
                activity_level: '',
                goal: '',
                diet_type: '',
                cuisine: '',
                meals_per_day: '',
                supplements: []
              });
              setCurrentStep(0);
            }} 
          />
        </div>
      )}

      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
};

<style jsx global>{`
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