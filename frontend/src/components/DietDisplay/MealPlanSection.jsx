import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  UtensilsCrossed, 
  Clock, 
  Flame,
  Scale,
  Calculator
} from 'lucide-react';
import MealPlanLoadingState from './MealPlanLoadingState';

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
  if (!mealPlan) {
    return <MealPlanLoadingState />;
  }

  const normalizeMealPlan = (rawMealPlan) => {
    if (!rawMealPlan) return [];

    if (Array.isArray(rawMealPlan) && rawMealPlan.length > 0 && rawMealPlan[0].foods) {
      return rawMealPlan;
    }

    if (rawMealPlan.meal_plan) {
      const mealPlanData = rawMealPlan.meal_plan;
      
      if (Array.isArray(mealPlanData)) {
        return mealPlanData;
      }

      if (typeof mealPlanData === 'object') {
        return Object.values(mealPlanData)
          .filter(meal => meal && meal.foods)
          .sort((a, b) => (a.meal_number || 0) - (b.meal_number || 0));
      }
    }

    if (typeof rawMealPlan === 'object' && (rawMealPlan.meal_1 || rawMealPlan[1])) {
      return Object.values(rawMealPlan)
        .filter(meal => meal && meal.foods)
        .sort((a, b) => (a.meal_number || 0) - (b.meal_number || 0));
    }

    return [];
  };

  const normalizedMealPlan = normalizeMealPlan(mealPlan);

  if (normalizedMealPlan.length === 0) {
    return (
      <section className="space-y-4 mt-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Your Daily Meal Plan</h2>
        </div>
        <Card className="bg-gray-800/50 border-gray-700/50">
          <CardContent className="p-4 sm:p-6">
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
    <section className="space-y-4 mt-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className="text-xl sm:text-2xl font-bold text-white">Your Daily Meal Plan</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <Clock className="w-4 h-4" />
          <span>Suggested Timings</span>
        </div>
      </div>

      <Card className="bg-gray-800/50 border-gray-700/50">
        <CardContent className="p-4 sm:p-6">
          <h3 className="flex items-center space-x-2 text-lg font-semibold text-white mb-4">
            <Calculator className="w-5 h-5 text-blue-400" />
            <span>Understanding Your Meal Plan</span>
          </h3>
          <div className="grid grid-cols-1 gap-4 text-sm">
            <div className="flex items-start space-x-3">
              <Scale className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
              <p className="text-gray-300">
                Portions are suggestions. Adjust slightly based on your hunger levels while staying close to daily totals.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <Clock className="w-4 h-4 text-yellow-400 mt-1 flex-shrink-0" />
              <p className="text-gray-300">
                Try to space meals 3-4 hours apart for optimal nutrient absorption and energy levels.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <Flame className="w-4 h-4 text-orange-400 mt-1 flex-shrink-0" />
              <p className="text-gray-300">
                Each meal is balanced with proteins, carbs, and fats for sustained energy.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {normalizedMealPlan.map((meal, index) => {
          if (!meal || !meal.foods) return null;
          
          const mealTotals = calculateMealTotals(meal.foods);
          const timing = getMealTiming(meal.meal_number, normalizedMealPlan.length);
          
          return (
            <Card 
              key={meal.meal_number || index}
              className="bg-gray-800/50 border-gray-700/50 transition-all duration-300"
            >
              <CardContent className="p-0">
                <div className="w-full p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                        <UtensilsCrossed className="w-6 h-6 text-blue-400" />
                      </div>
                      <div className="text-left min-w-0">
                        <h3 className="text-lg font-semibold text-white truncate">
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
                  </div>

                  <div className="mt-4">
                    <div className="p-4 rounded-lg bg-gray-900/50 space-y-4">
                      <div className="flex flex-wrap gap-4 pb-4 border-b border-gray-700">
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
                              className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 gap-2"
                            >
                              <div className="flex items-center space-x-3">
                                <span className="text-2xl flex-shrink-0">{emoji}</span>
                                <div className="min-w-0">
                                  <div className="text-white font-medium truncate">{food.name}</div>
                                  <div className="text-sm text-gray-400">{food.quantity}</div>
                                </div>
                              </div>
                              <div className="text-left sm:text-right ml-11 sm:ml-0">
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
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default MealPlanSection;