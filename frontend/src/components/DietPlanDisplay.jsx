import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Activity, Apple, Dumbbell, Clock, Download, 
  ChevronRight, Brain, Heart, AlertCircle, Target,
  RefreshCcw, ArrowLeft, Plus, Check, FileText
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import WaterIntakeSection from './WaterIntakeSection';

// Helper function to generate plan description
const generatePlanDescription = (formData, totalCalories) => {
  const goal = (formData.goal || '').replace('_', ' ');
  const activity = (formData.activity_level || '').replace('_', ' ');
  const dietType = (formData.diet_type || '').replace('-', ' ');
  const cuisine = formData.cuisine
    ? formData.cuisine.charAt(0).toUpperCase() + formData.cuisine.slice(1)
    : 'International';

  const goalEmojis = {
    'fat loss': '🔥',
    'muscle gain': '💪',
    'maintenance': '⚖️',
    'recomp': '🎯'
  };

  return `${goalEmojis[goal]} Your ${goal} plan is ready! ${totalCalories} calories per day following a ${dietType} diet`;
};

// New component for Plan Stats
const PlanStats = ({ formData, totalCalories }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
    <div className="bg-gray-700/50 p-4 rounded-lg backdrop-blur-sm">
      <p className="text-sm text-gray-400">Activity Level</p>
      <p className="text-lg font-semibold text-white capitalize">{formData.activity_level.replace('_', ' ')}</p>
    </div>
    <div className="bg-gray-700/50 p-4 rounded-lg backdrop-blur-sm">
      <p className="text-sm text-gray-400">Diet Type</p>
      <p className="text-lg font-semibold text-white capitalize">{formData.diet_type.replace('-', ' ')}</p>
    </div>
    <div className="bg-gray-700/50 p-4 rounded-lg backdrop-blur-sm">
      <p className="text-sm text-gray-400">Meals Per Day</p>
      <p className="text-lg font-semibold text-white">{formData.meals_per_day.split('_')[0]}</p>
    </div>
    <div className="bg-gray-700/50 p-4 rounded-lg backdrop-blur-sm">
      <p className="text-sm text-gray-400">Daily Calories</p>
      <p className="text-lg font-semibold text-white">{totalCalories} kcal</p>
    </div>
  </div>
);

// Helper function to calculate macro percentages
const calculateMacroPercentages = (summary) => {
  const totalCalories = summary.cal;
  return {
    protein: (summary.pro * 4 / totalCalories) * 100,
    carbs: (summary.carb * 4 / totalCalories) * 100,
    fats: (summary.fat * 9 / totalCalories) * 100
  };
};

const MacroCard = ({ type, value, icon, color, percentage }) => (
  <div className={`relative overflow-hidden group transform transition-all duration-300 hover:scale-105
    bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-xl border-l-4 ${color}`}>
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-400">{type}</p>
        <span className="text-2xl">{icon}</span>
      </div>
      <p className="text-3xl font-bold text-white mb-2">{value}g</p>
      <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color.replace('border', 'bg')} transition-all duration-1000 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-sm text-gray-400 mt-2">{percentage.toFixed(1)}% of total calories</p>
    </div>
  </div>
);

const CalorieDisplay = ({ calories }) => (
  <div className="relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 animate-pulse" />
    <div className="relative bg-gray-800/50 rounded-xl p-8 backdrop-blur-sm border border-gray-700/50">
      <div className="text-center">
        <h2 className="text-gray-400 mb-4 text-lg">Daily Calorie Target</h2>
        <div className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
          {calories}
        </div>
        <p className="text-gray-400">calories per day</p>
      </div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50" />
    </div>
  </div>
);

const DietPlanDisplay = ({ dietPlan, formData, onReset }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      const element = document.getElementById('diet-plan-content');
      
      // Simple html2canvas configuration
      const canvas = await html2canvas(element, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        backgroundColor: '#111827',
        // Ensure full element capture
        height: element.scrollHeight + 50, // Add padding
        windowWidth: 1200, // Fixed width for consistency
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById('diet-plan-content');
          if (clonedElement) {
            clonedElement.style.padding = '30px';
          }
        }
      });
      
      // PDF configuration
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4',
      });
  
      // Calculate dimensions
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const aspectRatio = canvas.height / canvas.width;
      const imgWidth = pdfWidth - 40; // Add margins
      const imgHeight = imgWidth * aspectRatio;
  
      // Add pages as needed
      let heightLeft = imgHeight;
      let position = 20; // Starting position
      let pageCount = 1;
  
      // First page
      pdf.addImage(imgData, 'JPEG', 20, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
  
      // Add additional pages if needed
      while (heightLeft > 0) {
        pageCount++;
        position = -(pdfHeight * (pageCount - 1)) + 20;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 20, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }
  
      pdf.save('your-nutrition-plan.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative">
            <RefreshCcw className="w-12 h-12 text-blue-400 animate-spin" />
            <div className="absolute inset-0 bg-blue-500/20 animate-ping rounded-full" />
          </div>
          <p className="text-xl text-gray-300 animate-pulse">Crafting your perfect nutrition plan...</p>
        </div>
      </div>
    );
  }

  const macroPercentages = calculateMacroPercentages(dietPlan.summary);
  const planDescription = generatePlanDescription(formData, dietPlan.summary.cal);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 to-gray-900 py-16">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent animate-pulse"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent animate-pulse delay-700"></div>
        </div>
        
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <button
            onClick={onReset}
            className="absolute top-4 left-4 flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Your Personalized Nutrition Plan
          </h1>

          {/* Goal Indicators */}
          <div className="flex justify-center space-x-6 mb-8">
            <div className="flex items-center space-x-2 text-gray-300">
              <Target className="w-5 h-5 text-blue-400" />
              <span>{formData.goal.replace('_', ' ').toUpperCase()}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <Activity className="w-5 h-5 text-green-400" />
              <span>{formData.activity_level.replace('_', ' ').toUpperCase()}</span>
            </div>
          </div>

          {/* Prominent Calorie Display */}
          <div className="max-w-lg mx-auto">
            <CalorieDisplay calories={dietPlan.summary.cal} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div id="diet-plan-content" className="container mx-auto px-4 max-w-4xl py-12 space-y-16">
        {/* Plan Description */}
        <section className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl overflow-hidden">
          <div className="relative p-8">
            {/* Subtle gradient line at top */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-50" />
            
            {/* Header */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                <FileText className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Plan Overview
              </h2>
            </div>

            {/* Description Card */}
            <div className="bg-gray-800/30 rounded-lg p-6 backdrop-blur-sm border border-gray-700/30">
              <p className="text-gray-200 text-lg leading-relaxed">{planDescription}</p>
            </div>
          </div>
        </section>
        {/* Daily Macros Section */}
        <section className="space-y-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20">
              <Target className="w-6 h-6 text-blue-400" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Daily Macronutrients</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MacroCard 
              type="Protein"
              value={dietPlan.summary.pro}
              icon="🥩"
              color="border-green-400"
              percentage={macroPercentages.protein}
            />
            <MacroCard 
              type="Carbs"
              value={dietPlan.summary.carb}
              icon="🌾"
              color="border-yellow-400"
              percentage={macroPercentages.carbs}
            />
            <MacroCard 
              type="Fats"
              value={dietPlan.summary.fat}
              icon="🥑"
              color="border-purple-400"
              percentage={macroPercentages.fats}
            />
          </div>
        </section>

        {/* Meals Section */}
        <section className="space-y-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-2 rounded-lg bg-gradient-to-br from-green-500/20 to-blue-500/20">
              <Apple className="w-6 h-6 text-green-400" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Daily Meals</h2>
          </div>

          <div className="space-y-6">
            {dietPlan.meals.map((meal, index) => {
              const totalProtein = meal.foods.reduce((sum, food) => sum + food.pro, 0);
              const totalCarbs = meal.foods.reduce((sum, food) => sum + food.carb, 0);
              const totalFats = meal.foods.reduce((sum, food) => sum + food.fat, 0);

              return (
                <Card key={index} className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
                  <CardContent className="p-6">
                    {/* Meal Header */}
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                          <Clock className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white">{meal.name}</h3>
                          <p className="text-gray-400">{meal.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-blue-400">{meal.cal} calories</p>
                      </div>
                    </div>

                    {/* Food Items */}
                    <div className="space-y-4">
                      {meal.foods.map((food, foodIndex) => (
                        <div key={foodIndex} className="bg-gray-700/50 p-4 rounded-lg transform transition-all duration-300 hover:scale-[1.02]">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 rounded-lg bg-gradient-to-br from-green-500/20 to-blue-500/20">
                                <Apple className="w-4 h-4 text-green-400" />
                              </div>
                              <div>
                                <h4 className="font-medium text-white">{food.item}</h4>
                                <p className="text-sm text-gray-400">{food.qty}</p>
                              </div>
                            </div>
                            <div className="flex space-x-3 text-sm">
                              <div className="px-2 py-1 rounded-full bg-green-500/20">
                                <span className="text-green-400">P: {food.pro}g</span>
                              </div>
                              <div className="px-2 py-1 rounded-full bg-yellow-500/20">
                                <span className="text-yellow-400">C: {food.carb}g</span>
                              </div>
                              <div className="px-2 py-1 rounded-full bg-purple-500/20">
                                <span className="text-purple-400">F: {food.fat}g</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Meal Summary */}
                      <div className="mt-4 pt-4 border-t border-gray-700">
                        <div className="grid grid-cols-4 gap-4">
                          <div className="p-3 rounded-lg bg-blue-500/20">
                            <p className="text-sm text-gray-400">Total Calories</p>
                            <p className="text-lg font-semibold text-blue-400">{meal.cal} kcal</p>
                          </div>
                          <div className="p-3 rounded-lg bg-green-500/20">
                            <p className="text-sm text-gray-400">Total Protein</p>
                            <p className="text-lg font-semibold text-green-400">{totalProtein}g</p>
                          </div>
                          <div className="p-3 rounded-lg bg-yellow-500/20">
                            <p className="text-sm text-gray-400">Total Carbs</p>
                            <p className="text-lg font-semibold text-yellow-400">{totalCarbs}g</p>
                          </div>
                          <div className="p-3 rounded-lg bg-purple-500/20">
                            <p className="text-sm text-gray-400">Total Fats</p>
                            <p className="text-lg font-semibold text-purple-400">{totalFats}g</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <WaterIntakeSection 
          weight={parseFloat(formData.weight)}
          activityLevel={formData.activity_level}
        />

        {/* Workout Nutrition Section */}
        <section className="space-y-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20">
              <Dumbbell className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Workout Nutrition</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pre-Workout Card */}
            <Card className="bg-gray-800/50 hover:bg-gray-800/70 transform transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 rounded-lg bg-blue-500/20">
                    <Clock className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Pre-Workout</h3>
                </div>

                <p className="text-gray-300 mb-4">{dietPlan.tips.pre.time}</p>

                <div className="space-y-3">
                  {dietPlan.tips.pre.foods.map((food, index) => (
                    <div key={index} className="bg-gray-700/50 p-3 rounded-lg flex items-center space-x-3">
                      <Plus className="w-4 h-4 text-green-400" />
                      <p className="text-gray-200">{food}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Post-Workout Card */}
            <Card className="bg-gray-800/50 hover:bg-gray-800/70 transform transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 rounded-lg bg-green-500/20">
                    <Activity className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Post-Workout</h3>
                </div>

                <p className="text-gray-300 mb-4">{dietPlan.tips.post.time}</p>

                <div className="space-y-3">
                  {dietPlan.tips.post.foods.map((food, index) => (
                    <div key={index} className="bg-gray-700/50 p-3 rounded-lg flex items-center space-x-3">
                      <Plus className="w-4 h-4 text-green-400" />
                      <p className="text-gray-200">{food}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        {/* Supplements Section */}
        {formData.supplements.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-2 rounded-lg bg-gradient-to-br from-pink-500/20 to-red-500/20">
                <Heart className="w-6 h-6 text-pink-400" />
              </div>
              <h2 className="text-2xl font-semibold text-white">Supplements</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formData.supplements.map((supp, index) => (
                <Card key={index} className="bg-gray-800/50">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                        <span className="text-2xl">{getSupplementIcon(supp)}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-white capitalize">{supp}</h3>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-700/50 p-3 rounded-lg">
                          <p className="text-sm text-gray-400">Timing</p>
                          <p className="text-white">{getSupplementInfo(supp).timing}</p>
                        </div>
                        <div className="bg-gray-700/50 p-3 rounded-lg">
                          <p className="text-sm text-gray-400">Dosage</p>
                          <p className="text-white">{getSupplementInfo(supp).dosage}</p>
                        </div>
                      </div>

                      <div className="bg-blue-500/10 rounded-lg p-4">
                        <p className="text-blue-300">{getSupplementInfo(supp).benefits}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 pt-8">
          <button
            onClick={onReset}
            className="px-6 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-all duration-300
              flex items-center space-x-2"
          >
            <RefreshCcw className="w-4 h-4" />
            <span>Create New Plan</span>
          </button>
          
          <button
            onClick={handleExportPDF}
            disabled={isExporting}
            className="px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-blue-500 to-purple-500 
              hover:from-blue-600 hover:to-purple-600 text-white transition-all duration-300
              flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'Generating PDF...' : 'Download Plan'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper functions for supplements
const getSupplementIcon = (supp) => ({
  whey: '🥛',
  creatine: '💪',
  omega3: '🐟',
  vitamins: '💊'
}[supp] || '💊');

const getSupplementInfo = (supp) => ({
  whey: {
    timing: "Post-workout or between meals",
    dosage: "20-30g per serving",
    benefits: "Supports muscle recovery and growth"
  },
  creatine: {
    timing: "Daily, timing not critical",
    dosage: "5g per day",
    benefits: "Enhances strength and muscle gains"
  },
  omega3: {
    timing: "With meals",
    dosage: "1-3g per day",
    benefits: "Supports heart and brain health"
  },
  vitamins: {
    timing: "With breakfast",
    dosage: "As directed on label",
    benefits: "Fills potential nutrient gaps"
  }
}[supp] || {
  timing: "As directed",
  dosage: "See label",
  benefits: "Supports overall health"
});

export default DietPlanDisplay;