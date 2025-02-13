import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  UtensilsCrossed, 
  Clock, 
  ChevronDown, 
  ChevronUp,
  Flame,
  Scale,
  Calculator
} from 'lucide-react';

const getFoodEmoji = (foodName) => {
  const foodEmojis = {
    'chicken': '🍗',
    'rice': '🍚',
    'fish': '🐟',
    'salad': '🥗',
    'curry': '🍲',
    'juice': '🥤',
    'bread': '🍞',
    'naan': '🫓',
    'biryani': '🍛',
    'raita': '🥛',
    'paneer': '🧀',
    'fruit': '🍎',
    'mango': '🥭',
    'lassi': '🥛',
    'default': '🍽️'
  };

  const foodLower = foodName.toLowerCase();
  for (const [key, emoji] of Object.entries(foodEmojis)) {
    if (foodLower.includes(key)) return emoji;
  }
  return foodEmojis.default;
};

const MealPlanSection = ({ mealPlan = [] }) => {
  const [expandedMeal, setExpandedMeal] = useState(null);

  if (!Array.isArray(mealPlan) || mealPlan.length === 0) {
    return (
      <section className="space-y-6 mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Your Daily Meal Plan</h2>
        </div>
        <Card className="bg-gray-800/50 border-gray-700/50">
          <CardContent className="p-6">
            <p className="text-gray-400">No meal plan data available.</p>
          </CardContent>
        </Card>
      </section>
    );
  }

  const getMealTiming = (mealNumber, totalMeals) => {
    const timings = {
      3: {
        1: "8:00 AM - Breakfast",
        2: "1:00 PM - Lunch",
        3: "7:00 PM - Dinner"
      },
      4: {
        1: "8:00 AM - Breakfast",
        2: "11:00 AM - Mid-Morning Snack",
        3: "2:00 PM - Lunch",
        4: "7:00 PM - Dinner"
      },
      5: {
        1: "8:00 AM - Breakfast",
        2: "10:30 AM - Morning Snack",
        3: "1:00 PM - Lunch",
        4: "4:00 PM - Evening Snack",
        5: "7:00 PM - Dinner"
      },
      6: {
        1: "7:00 AM - Early Breakfast",
        2: "10:00 AM - Mid-Morning Snack",
        3: "1:00 PM - Lunch",
        4: "3:30 PM - Post-Lunch Snack",
        5: "6:00 PM - Evening Snack",
        6: "8:30 PM - Dinner"
      }
    };
    return timings[totalMeals]?.[mealNumber] || `Meal ${mealNumber}`;
  };

  const parseFoodString = (foodString) => {
    try {
      const [name, quantity, calories, protein, carbs, fats] = foodString.split(', ');
      return {
        name,
        quantity,
        calories: parseInt(calories) || 0,
        protein: parseInt(protein) || 0,
        carbs: parseInt(carbs) || 0,
        fats: parseInt(fats) || 0
      };
    } catch (error) {
      console.error('Error parsing food string:', error);
      return {
        name: 'Unknown Food',
        quantity: 'N/A',
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0
      };
    }
  };

  const calculateMealTotals = (foods) => {
    if (!Array.isArray(foods)) return { calories: 0, protein: 0, carbs: 0, fats: 0 };
    
    return foods.reduce((totals, foodString) => {
      const food = parseFoodString(foodString);
      return {
        calories: totals.calories + food.calories,
        protein: totals.protein + food.protein,
        carbs: totals.carbs + food.carbs,
        fats: totals.fats + food.fats
      };
    }, { calories: 0, protein: 0, carbs: 0, fats: 0 });
  };

  const MacroIndicator = ({ label, value, color }) => (
    <div className="flex items-center space-x-2">
      <div className={`w-2 h-2 rounded-full bg-${color}-400`} />
      <span className="text-sm text-gray-400">{label}:</span>
      <span className="text-sm font-medium text-white">{value}g</span>
    </div>
  );

  return (
    <section className="space-y-6 mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Your Daily Meal Plan</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <Clock className="w-4 h-4" />
          <span>Suggested Timings</span>
        </div>
      </div>

      {/* Tips Card */}
      <Card className="bg-gray-800/50 border-gray-700/50">
        <CardContent className="p-6">
          <h3 className="flex items-center space-x-2 text-lg font-semibold text-white mb-4">
            <Calculator className="w-5 h-5 text-blue-400" />
            <span>Understanding Your Meal Plan</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start space-x-3">
              <Scale className="w-4 h-4 text-green-400 mt-1" />
              <p className="text-gray-300">
                Portions are suggestions. Adjust slightly based on your hunger levels while staying close to daily totals.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <Clock className="w-4 h-4 text-yellow-400 mt-1" />
              <p className="text-gray-300">
                Try to space meals 3-4 hours apart for optimal nutrient absorption and energy levels.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <Flame className="w-4 h-4 text-orange-400 mt-1" />
              <p className="text-gray-300">
                Each meal is balanced with proteins, carbs, and fats for sustained energy.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Meal Cards */}
      <div className="space-y-4">
        {mealPlan.map((meal, index) => {
          if (!meal || !meal.foods) return null;
          
          const isExpanded = expandedMeal === meal.meal_number;
          const mealTotals = calculateMealTotals(meal.foods);
          const timing = getMealTiming(meal.meal_number, mealPlan.length);
          
          return (
            <Card 
              key={meal.meal_number || index}
              className={`bg-gray-800/50 border-gray-700/50 transition-all duration-300 ${
                isExpanded ? 'ring-2 ring-blue-500/50' : 'hover:bg-gray-800/70'
              }`}
            >
              <CardContent className="p-0">
                <button
                  onClick={() => setExpandedMeal(isExpanded ? null : meal.meal_number)}
                  className="w-full p-6 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                      <UtensilsCrossed className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-semibold text-white">
                        {timing}
                      </h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center space-x-1 text-orange-400">
                          <Flame className="w-4 h-4" />
                          <span className="text-sm">{mealTotals.calories} kcal</span>
                        </div>
                        <div className="text-sm text-gray-400">
                          {meal.foods.length} items
                        </div>
                      </div>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 animate-fade-in">
                    <div className="p-4 rounded-lg bg-gray-900/50 space-y-4">
                      <div className="flex items-center space-x-4 pb-4 border-b border-gray-700">
                        <MacroIndicator label="Protein" value={mealTotals.protein} color="blue" />
                        <MacroIndicator label="Carbs" value={mealTotals.carbs} color="green" />
                        <MacroIndicator label="Fats" value={mealTotals.fats} color="pink" />
                      </div>

                      <div className="space-y-3">
                        {meal.foods.map((foodString, foodIndex) => {
                          const food = parseFoodString(foodString);
                          const emoji = getFoodEmoji(food.name);
                          
                          return (
                            <div 
                              key={foodIndex}
                              className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-102 hover:translate-x-1"
                            >
                              <div className="flex items-center space-x-3">
                                <span className="text-2xl animate-bounce-slow">{emoji}</span>
                                <div>
                                  <div className="text-white font-medium">{food.name}</div>
                                  <div className="text-sm text-gray-400">{food.quantity}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-orange-400">{food.calories} kcal</div>
                                <div className="text-sm text-gray-400">
                                  P: {food.protein}g • C: {food.carbs}g • F: {food.fats}g
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </section>
  );
};

export default MealPlanSection;