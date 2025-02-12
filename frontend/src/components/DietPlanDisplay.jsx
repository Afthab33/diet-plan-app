import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Activity, Apple, Dumbbell, Clock, Download, 
  ChevronRight, Brain, Heart, AlertCircle, Target,
  RefreshCcw, ArrowLeft, Plus, Check, FileText,
  PieChart, Calendar, User, Scale, TrendingUp
} from 'lucide-react';

const CalorieProgressRing = ({ calories, totalCalories }) => {
  const percentage = (calories / totalCalories) * 100;
  const circumference = 2 * Math.PI * 40; // radius = 40
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="transform -rotate-90 w-32 h-32">
        <circle
          cx="64"
          cy="64"
          r="40"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-gray-700"
        />
        <circle
          cx="64"
          cy="64"
          r="40"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="text-blue-500 transition-all duration-1000"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-bold text-white">{calories}</span>
        <span className="text-sm text-gray-400">calories</span>
      </div>
    </div>
  );
};

const MacroBar = ({ label, current, total, color }) => {
  const percentage = (current / total) * 100;
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-400">{label}</span>
        <span className="text-white">{current}g / {total}g</span>
      </div>
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} transition-all duration-1000 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

const NutritionInsights = ({ dailySummary }) => {
  const insights = [
    {
      icon: <Brain className="w-5 h-5 text-blue-400" />,
      title: "Protein Ratio",
      value: `${dailySummary.macro_percentages.protein}%`,
      description: "of total calories from protein",
      color: "bg-blue-400/20"
    },
    {
      icon: <Heart className="w-5 h-5 text-pink-400" />,
      title: "Healthy Fats",
      value: `${dailySummary.macro_percentages.fats}%`,
      description: "of calories from healthy fats",
      color: "bg-pink-400/20"
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-green-400" />,
      title: "Energy Balance",
      value: `${dailySummary.calories}`,
      description: "total daily calories",
      color: "bg-green-400/20"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {insights.map((insight, index) => (
        <div key={index} className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
          <div className={`inline-flex p-3 rounded-xl ${insight.color} mb-4`}>
            {insight.icon}
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">{insight.title}</h3>
          <p className="text-3xl font-bold text-white mb-2">{insight.value}</p>
          <p className="text-sm text-gray-400">{insight.description}</p>
        </div>
      ))}
    </div>
  );
};

const MealCard = ({ meal, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const totalProtein = meal.foods.reduce((sum, food) => sum + food.pro, 0);
  const totalCarbs = meal.foods.reduce((sum, food) => sum + food.carb, 0);
  const totalFats = meal.foods.reduce((sum, food) => sum + food.fat, 0);

  return (
    <Card className="bg-gray-800/50 border-gray-700/50 overflow-hidden group">
      <CardContent className="p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20">
              <Clock className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">Meal {meal.meal_number}</h3>
              <p className="text-gray-400">{meal.timing}</p>
            </div>
          </div>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
          >
            <ChevronRight 
              className={`w-5 h-5 text-gray-400 transform transition-transform duration-300
                ${isExpanded ? 'rotate-90' : ''}`}
            />
          </button>
        </div>

        <div className={`mt-6 space-y-4 transition-all duration-500 ${isExpanded ? 'block' : 'hidden'}`}>
          {meal.foods.map((food, foodIndex) => (
            <div 
              key={foodIndex}
              className="bg-gray-700/50 p-4 rounded-lg transform transition-all duration-300 hover:scale-105"
            >
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

          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="grid grid-cols-4 gap-4">
              <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                <p className="text-sm text-gray-400">Total Calories</p>
                <p className="text-lg font-semibold text-white">{meal.calories} kcal</p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-green-500/20 to-blue-500/20">
                <p className="text-sm text-gray-400">Protein</p>
                <p className="text-lg font-semibold text-green-400">{totalProtein}g</p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-yellow-500/20 to-green-500/20">
                <p className="text-sm text-gray-400">Carbs</p>
                <p className="text-lg font-semibold text-yellow-400">{totalCarbs}g</p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                <p className="text-sm text-gray-400">Fats</p>
                <p className="text-lg font-semibold text-purple-400">{totalFats}g</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const UserInfoCard = ({ userInfo }) => (
  <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700/50">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-gray-400">
          <User className="w-4 h-4" />
          <span>Profile</span>
        </div>
        <p className="text-white">{userInfo.gender}, {userInfo.age} years</p>
      </div>
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-gray-400">
          <Scale className="w-4 h-4" />
          <span>Metrics</span>
        </div>
        <p className="text-white">{userInfo.weight}kg, {userInfo.height}cm</p>
      </div>
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-gray-400">
          <Activity className="w-4 h-4" />
          <span>Activity</span>
        </div>
        <p className="text-white capitalize">{userInfo.activity_level.replace('_', ' ')}</p>
      </div>
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-gray-400">
          <Target className="w-4 h-4" />
          <span>Goal</span>
        </div>
        <p className="text-white capitalize">{userInfo.goal.replace('_', ' ')}</p>
      </div>
    </div>
  </div>
);

const DietPlanDisplay = ({ dietPlan, onReset }) => {
  const [activeTab, setActiveTab] = useState('overview');

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
            className="absolute top-4 left-4 flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Your Personalized Nutrition Plan
          </h1>

          <UserInfoCard userInfo={dietPlan.user_info} />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Overview Stats */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20">
              <PieChart className="w-6 h-6 text-blue-400" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Nutrition Overview</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex justify-center mb-6">
                <CalorieProgressRing 
                  calories={dietPlan.daily_summary.calories} 
                  totalCalories={3000} 
                />
              </div>
              <div className="space-y-4">
                <MacroBar 
                  label="Protein" 
                  current={dietPlan.daily_summary.protein}
                  total={200}
                  color="bg-green-400"
                />
                <MacroBar 
                  label="Carbs" 
                  current={dietPlan.daily_summary.carbs}
                  total={400}
                  color="bg-yellow-400"
                />
                <MacroBar 
                  label="Fats" 
                  current={dietPlan.daily_summary.fats}
                  total={100}
                  color="bg-purple-400"
                />
              </div>
            </div>

            <NutritionInsights dailySummary={dietPlan.daily_summary} />
          </div>
        </section>

        {/* Meals Section */}
        <section className="mb-16">
        <div className="flex items-center space-x-3 mb-8">
            <div className="p-2 rounded-lg bg-gradient-to-br from-green-500/20 to-blue-500/20">
              <Apple className="w-6 h-6 text-green-400" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Daily Meals</h2>
          </div>

          <div className="space-y-6">
            {dietPlan.meals.map((meal, index) => (
              <MealCard key={index} meal={meal} index={index} />
            ))}
          </div>
        </section>

        {/* Supplements Section */}
        {dietPlan.supplements && dietPlan.supplements.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                <Heart className="w-6 h-6 text-purple-400" />
              </div>
              <h2 className="text-2xl font-semibold text-white">Supplements</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dietPlan.supplements.map((supp, index) => (
                <Card key={index} className="bg-gray-800/50 border-gray-700/50 transform transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                        <Plus className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white capitalize">{supp.item}</h3>
                        <p className="text-sm text-gray-400">{supp.time}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-700/50 p-4 rounded-lg">
                        <p className="text-sm text-gray-400 mb-1">Protein</p>
                        <p className="text-lg font-semibold text-green-400">{supp.protein}g</p>
                      </div>
                      <div className="bg-gray-700/50 p-4 rounded-lg">
                        <p className="text-sm text-gray-400 mb-1">Calories</p>
                        <p className="text-lg font-semibold text-blue-400">{supp.calories} kcal</p>
                      </div>
                    </div>

                    <div className="mt-4 p-4 bg-purple-500/10 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 text-purple-400" />
                        <p className="text-sm text-purple-400">Best taken {supp.time}</p>
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
            className="px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-blue-500 to-purple-500 
              hover:from-blue-600 hover:to-purple-600 text-white transition-all duration-300
              flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DietPlanDisplay;