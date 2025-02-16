import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { 
  Flame, 
  Beef,  
  Droplet,
  HelpCircle,
  Wheat,
  Calculator,
  Info,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import NutritionLearningCenter from '../NutritionLearningCenter';

const NutritionOverview = ({ calories, protein, carbs, fats, userInfo }) => {
  const [showMacroInfo, setShowMacroInfo] = React.useState(false);
  const [showLearningCenter, setShowLearningCenter] = React.useState(null);
  
  const macroData = [
    { name: 'Protein', value: protein * 4, color: '#3B82F6', grams: protein },
    { name: 'Carbs', value: carbs * 4, color: '#10B981', grams: carbs },
    { name: 'Fats', value: fats * 9, color: '#EC4899', grams: fats }
  ];

  const calculatePercentage = (macro) => {
    return Math.round((macro.value / calories) * 100);
  };

  const formatActivityLevel = (level) => {
    return level.split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getActivityMultiplier = (level) => {
    const multipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    };
    return multipliers[level.toLowerCase()] || 1.2;
  };

  const MacroCard = ({ title, grams, icon: Icon, color, description, tips }) => (
    <Card className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-gray-700/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-gradient-to-br" style={{ backgroundColor: `${color}15` }}>
              <Icon className="w-6 h-6" style={{ color }} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
              <div className="flex items-baseline space-x-1">
                <p className="text-3xl font-bold" style={{ color }}>
                  {grams}
                </p>
                <span className="text-gray-400 text-sm">grams per day</span>
              </div>
            </div>
          </div>
          <div className="group relative">
            <HelpCircle className="w-5 h-5 text-gray-400 cursor-help" />
            <div className="absolute right-0 w-72 p-4 bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 text-sm text-gray-300 border border-gray-700/50">
              {description}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2" style={{ color }}>
            <Icon className="w-4 h-4" />
            <span className="font-medium">Best Food Sources</span>
          </div>
          <p className="text-sm text-gray-300">{tips}</p>
        </div>
      </CardContent>
    </Card>
  );

  // Getting calculation details from userInfo
  const { bmr, tdee, goalAdjustment, proteinCalculation } = userInfo.nutritionCalc.calculations;
  const activityMultiplier = getActivityMultiplier(userInfo.activity_level);

  return (
    <>
    {showLearningCenter && (
      <NutritionLearningCenter 
        onClose={() => setShowLearningCenter(null)}
        initialSection={showLearningCenter}
      />
    )}
    <section className="space-y-8 mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Your Personalized Nutrition Plan</h2>
        <button
          onClick={() => setShowLearningCenter('overview')}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-all duration-300"
        >
          <Info className="w-4 h-4" />
          <span>Learn about nutrition</span>
        </button>
      </div>
      
      {/*Overview Card */}
      <Card className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-gray-700/50">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calories Section */}
            <div className="space-y-6">
              <div>
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-white">Your Daily Energy Requirements</h3>
                  <p className="text-gray-400 text-sm">
                    This is the total amount of calories you need per day to achieve your {
                      userInfo.goal.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
                    } goal
                  </p>
                </div>
                <div className="flex items-center space-x-6 p-6 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-700/50 border border-gray-700/30">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20">
                    <Flame className="w-10 h-10 text-orange-400" />
                  </div>
                  <div>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-5xl font-bold text-orange-400">{calories}</span>
                      <div className="flex flex-col">
                        <span className="text-gray-400">calories</span>
                        <span className="text-gray-400 text-xs">per day</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Calorie Explanation */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-blue-400 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-300">
                      Think of calories as your body's daily energy budget. Just like a car needs fuel to run, 
                      your body needs calories to function. This number is carefully calculated based on your:
                    </p>
                    <ul className="mt-2 space-y-1 text-sm text-gray-400">
                      <li>• Physical characteristics (age, weight, height)</li>
                      <li>• Activity level ({formatActivityLevel(userInfo.activity_level)})</li>
                      <li>• Fitness goals ({userInfo.goal.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')})</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Always Visible Calculation Breakdown */}
              <div className="space-y-4 p-5 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-700/50 border border-gray-700/30">
                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">BMR (Base Metabolic Rate)</span>
                    <span className="text-gray-200 font-medium">{bmr} kcal</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Calories your body burns at complete rest
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">
                      TDEE = BMR × {activityMultiplier} ({formatActivityLevel(userInfo.activity_level)})
                    </span>
                    <span className="text-gray-200 font-medium">{tdee} kcal</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Total calories burned with daily activities
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Goal Adjustment</span>
                    <span className="text-gray-200 font-medium">
                      {goalAdjustment > 0 ? '+' : ''}{goalAdjustment} kcal
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Calorie adjustment for your {userInfo.goal.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} goal
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-600">
                  <div className="flex justify-between font-medium">
                    <span className="text-gray-200">Final Daily Target</span>
                    <span className="text-orange-400 text-lg">{calories} kcal</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowLearningCenter('calories')}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 border border-blue-500/20 transition-all duration-300 group"
              >
                <div className="flex items-center space-x-2 text-blue-400">
                  <Calculator className="w-5 h-5" />
                  <span>Learn more about calorie calculations</span>
                </div>
                <ArrowRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>

            {/*Pie Chart */}
            <div className="flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-green-500/5 to-pink-500/5 rounded-full blur-2xl" />
              <div className="relative">
                <div className="w-52 h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={macroData}
                        innerRadius={65}
                        outerRadius={85}
                        paddingAngle={8}
                        dataKey="value"
                      >
                        {macroData.map((entry, index) => (
                          <Cell 
                            key={index} 
                            fill={entry.color}
                            className="transition-all duration-300 hover:opacity-80"
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="text-3xl font-bold text-white">
                    {calories}
                  </div>
                  <div className="text-sm text-gray-400">kcal</div>
                </div>
              </div>
              <div className="ml-8">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-white">Your Daily Nutrient Balance</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    How your daily calories are divided between proteins, carbs, and fats
                  </p>
                </div>
                <div className="space-y-3">
                  {macroData.map((macro) => (
                    <div key={macro.name} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800/50 transition-colors duration-200">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: macro.color }} />
                      <span className="text-gray-300 font-medium">{macro.name}</span>
                      <span className="text-gray-400">{calculatePercentage(macro)}%</span>
                      <span className="text-gray-300 font-medium">{macro.grams}g</span>
                      <span className="text-xs text-gray-500">per day</span>
                    </div>
                  ))}
                </div>

                {/* Macro Explanation */}
                <div className="mt-4 p-3 rounded-lg bg-gray-800/50 border border-gray-700/50">
                  <p className="text-sm text-gray-400">
                    Each nutrient plays a vital role:
                    <span className="block mt-2 text-blue-400">Protein</span> builds and repairs muscles
                    <span className="block mt-1 text-green-400">Carbs</span> provide energy for daily activities
                    <span className="block mt-1 text-pink-400">Fats</span> support hormone function and vitamin absorption
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Macro Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <MacroCard
          title="Protein"
          grams={protein}
          icon={Beef}
          color="#3B82F6"
          description={`${proteinCalculation.multiplier}g per kg of body weight (${proteinCalculation.total}g total) based on your ${userInfo.goal.replace('_', ' ')} goal. Protein is essential for building and repairing muscles, and maintaining overall health.`}
          tips="High-quality sources: Chicken breast, fish, eggs, lean beef, Greek yogurt, whey protein, tofu, legumes. Try to include protein in every meal for optimal muscle maintenance and recovery."
        />
        <MacroCard
          title="Carbohydrates"
          grams={carbs}
          icon={Wheat}
          color="#10B981"
          description="Carbohydrates are your body's primary energy source. This amount is calculated to fuel your daily activities while supporting your fitness goals. Focus on complex carbs for sustained energy."
          tips="Best sources: Brown rice, sweet potatoes, quinoa, oats, whole grain bread, fruits, vegetables. Choose whole grains over refined carbs for better nutrition and sustained energy."
        />
        <MacroCard
          title="Healthy Fats"
          grams={fats}
          icon={Droplet}
          color="#EC4899"
          description="Healthy fats are crucial for hormone production and nutrient absorption. Set to 25% of your daily calories to ensure optimal body function while supporting your fitness goals."
          tips="Quality sources: Avocados, nuts, olive oil, fatty fish (salmon, mackerel), seeds, nut butters. Include a variety of these sources to get different beneficial fatty acids."
        />
      </div>

      {/* Additional Education Section */}
      <Card className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-gray-700/50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Info className="w-6 h-6 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Tips for Success</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="space-y-2">
              <h4 className="text-blue-400 font-medium">Meal Timing</h4>
              <p className="text-gray-300">
                Try to spread your meals throughout the day to maintain steady energy levels. 
                Aim to eat every 3-4 hours.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-green-400 font-medium">Food Quality</h4>
              <p className="text-gray-300">
                Focus on whole, nutrient-dense foods. These numbers are guides, but food quality 
                is just as important as quantity.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-pink-400 font-medium">Consistency</h4>
              <p className="text-gray-300">
                You don't have to hit these numbers perfectly every day. Aim to stay within 5-10% 
                of your targets over time.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
    </>
  );
};

export default NutritionOverview;