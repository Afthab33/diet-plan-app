import React, { useState, useEffect } from 'react';
import { 
  Brain, Calculator, Scale, ArrowRight,
  Flame, Bot, ChevronRight, ArrowDown,
  Info, Activity, Target, Sparkles,
  PlayCircle, PauseCircle
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const StepConnector = ({ isActive, text }) => (
  <div className="flex flex-col items-center py-4 group">
    <div className="text-center px-6 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 mb-4 transition-all duration-300 hover:scale-105">
      <p className={`text-sm ${isActive ? 'text-blue-600' : 'text-gray-600'}`}>
        {text}
      </p>
    </div>
    <ArrowDown className={`w-6 h-6 text-blue-500 transition-all duration-300 ${
      isActive ? 'animate-bounce' : ''
    }`} />
  </div>
);

const ProcessStep = ({ 
  number, 
  title, 
  description,
  formula, 
  explanation,
  example,
  icon: Icon, 
  color = 'blue',
  isActive = false 
}) => (
  <div className="group transform transition-all duration-500 hover:scale-102">
    <Card className={`bg-white shadow-lg transition-all duration-500 hover:shadow-xl ${
      isActive ? `ring-2 ring-${color}-400 translate-x-2` : ''
    }`}>
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className={`w-10 h-10 rounded-full bg-${color}-50 flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
              isActive ? 'animate-pulse' : ''
            }`}>
              <span className={`text-${color}-600 font-bold text-lg`}>{number}</span>
            </div>
          </div>
          
          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon className={`w-6 h-6 text-${color}-500 transition-all duration-300 ${
                  isActive ? 'animate-spin-slow' : ''
                }`} />
                <h3 className="text-xl font-bold text-gray-800">{title}</h3>
              </div>
              {isActive && (
                <div className={`text-${color}-500 flex items-center gap-2`}>
                  <Sparkles className="w-5 h-5 animate-pulse" />
                  <span className="text-sm font-medium">We are here!</span>
                </div>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed text-lg">
              {description}
            </p>

            <div className={`p-4 rounded-xl bg-${color}-50 border border-${color}-100 transition-all duration-300 group-hover:shadow-md`}>
              <div className={`text-sm font-semibold text-${color}-600 mb-2`}>Magic Formula ✨</div>
              <div className="font-mono text-sm text-blue-600 bg-white p-3 rounded-lg shadow-inner">
                {formula}
              </div>
              <div className="mt-3 text-gray-600 space-y-2">
                {explanation}
              </div>
            </div>

            {example && (
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 group-hover:shadow-md transition-all duration-300">
                <div className="text-sm font-semibold text-gray-700 mb-2">Let's see it in action! 🚀</div>
                <div className="text-gray-600">
                  {example}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

const DataFlowGuide = ({ onClose }) => {
  const [activeStep, setActiveStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setActiveStep(prev => {
        if (prev === 5) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 2000);
        }
        return prev < 5 ? prev + 1 : 1;
      });
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent)]" />
      </div>

      {/* Control Buttons */}
      <div className="fixed top-4 right-4 flex items-center space-x-4">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-2 rounded-full bg-white shadow-lg text-blue-500 hover:text-blue-600 transition-all duration-300 hover:scale-110"
        >
          {isPlaying ? 
            <PauseCircle className="w-8 h-8" /> : 
            <PlayCircle className="w-8 h-8" />
          }
        </button>
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-white shadow-lg text-gray-500 hover:text-gray-600 transition-all duration-300 hover:scale-110"
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 shadow-md hover:shadow-lg transition-all duration-300 animate-bounce">
            <Calculator className="w-6 h-6 text-blue-500" />
            <span className="text-blue-600 font-medium text-lg">Your Nutrition Journey</span>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-800 mt-6 mb-4">
            Let's Make Your Perfect
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"> Meal Plan</span>
          </h1>
          
          <p className="text-xl text-gray-600">Watch the magic happen as we craft your personalized nutrition plan! ✨</p>
        </div>

        <div className="space-y-6">
        <ProcessStep 
            number="1"
            title="Basal Metabolic Rate (BMR)"
            description="First, we calculate your body's basic energy needs - the calories you burn just by being alive."
            icon={Calculator}
            color="blue"
            formula="BMR = (10 × weight_kg) + (6.25 × height_cm) - (5 × age) + gender_factor"
            explanation="We use the scientifically proven Mifflin-St Jeor equation. The gender factor adds 5 for males or subtracts 161 for females to account for natural metabolic differences."
            example="For a 30-year-old male weighing 70kg and 170cm tall:
BMR = (10 × 70) + (6.25 × 170) - (5 × 30) + 5 = 1,695 calories"
            isActive={activeStep === 1}
          />

          <StepConnector 
            isActive={activeStep === 1}
            text="Now that we know your basic needs, let's factor in your activity level..."
          />

          <ProcessStep 
            number="2"
            title="Total Daily Energy Expenditure (TDEE)"
            description="Next, we calculate how many calories you actually burn in a day based on your activity level."
            icon={Activity}
            color="green"
            formula="TDEE = BMR × Activity_Multiplier"
            explanation="Your activity level significantly impacts your calorie needs:
• Sedentary (desk job): 1.2
• Light exercise (1-3 days/week): 1.375
• Moderate exercise (3-5 days/week): 1.55
• Active (6-7 days/week): 1.725
• Very Active (physical job + training): 1.9"
            example="With a BMR of 1,695 and moderate exercise:
TDEE = 1,695 × 1.55 = 2,627 calories"
            isActive={activeStep === 2}
          />

          <StepConnector 
            isActive={activeStep === 2}
            text="With your daily energy needs calculated, we'll adjust for your goals..."
          />

          <ProcessStep 
            number="3"
            title="Goal-Based Adjustment"
            description="We fine-tune your calories based on whether you want to lose fat, gain muscle, or maintain your weight."
            icon={Target}
            color="purple"
            formula="Final_Calories = TDEE + Goal_Adjustment"
            explanation="Different goals require different calorie adjustments:
• Fat Loss: Reduce by 500 calories for safe weight loss
• Muscle Gain: Increase by 10-15% to support growth
• Maintenance: Keep TDEE as is
• Recomposition: Slight reduction of 200 calories"
            example="For fat loss with TDEE of 2,627:
Final Calories = 2,627 - 500 = 2,127 calories"
            isActive={activeStep === 3}
          />

          <StepConnector 
            isActive={activeStep === 3}
            text="Now let's break down these calories into optimal nutrients..."
          />

          <ProcessStep 
            number="4"
            title="Macro Distribution"
            description="We distribute your calories across proteins, fats, and carbs for optimal body composition and energy."
            icon={Brain}
            color="pink"
            formula={`Protein = weight_kg × goal_factor
Fats = total_calories × 0.25
Carbs = (total_calories - protein_calories - fat_calories) ÷ 4`}
            explanation="Each macronutrient serves a crucial role:
• Protein: Builds and maintains muscle (4 calories/gram)
• Fats: Supports hormones and health (9 calories/gram)
• Carbs: Provides energy for activities (4 calories/gram)"
            example="For 70kg person at 2,127 calories:
• Protein: 140g (560 calories)
• Fats: 59g (532 calories)
• Carbs: 259g (1,035 calories)"
            isActive={activeStep === 4}
          />

          <StepConnector 
            isActive={activeStep === 4}
            text="Finally, we send all this data to our AI for meal planning..."
          />

          <ProcessStep 
            number="5"
            title="AI Meal Planning"
            description="Our AI takes all these calculations and creates a delicious, personalized meal plan that matches your exact needs."
            icon={Bot}
            color="orange"
            formula={`{
  calories: ${activeStep === 5 ? '2127' : 'calculated_calories'},
  protein: ${activeStep === 5 ? '140' : 'protein_grams'},
  carbs: ${activeStep === 5 ? '259' : 'carbs_grams'},
  fats: ${activeStep === 5 ? '59' : 'fats_grams'},
  meals_per_day: user_preference,
  diet_type: selected_type,
  restrictions: [user_restrictions]
}`}
            explanation="Our advanced AI considers:
• Your exact calorie and macro targets
• Food preferences and restrictions
• Meal timing and frequency
• Recipe variety and practicality"
            example="The AI generates a complete meal plan with:
• Precise portions and recipes
• Cooking instructions
• Shopping lists
• Meal timing recommendations"
            isActive={activeStep === 5}
          />
        </div>
      </div>

      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}vw`,
                top: '-20px',
                backgroundColor: ['#60A5FA', '#818CF8', '#EC4899'][Math.floor(Math.random() * 3)],
                width: '10px',
                height: '10px',
                transform: `rotate(${Math.random() * 360}deg)`,
                borderRadius: Math.random() > 0.5 ? '50%' : '0',
                animation: `confetti ${2 + Math.random() * 2}s linear forwards`
              }}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(100vh) rotate(720deg); }
        }
        
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default DataFlowGuide;