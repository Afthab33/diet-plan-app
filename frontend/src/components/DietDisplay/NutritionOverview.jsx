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

const NutritionOverview = ({ calories, protein, carbs, fats, userInfo }) => {
  const [showMacroInfo, setShowMacroInfo] = React.useState(false);
  
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
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="text-3xl font-bold" style={{ color }}>
                {grams}g
              </p>
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
            <span className="font-medium">Recommended Sources</span>
          </div>
          <p className="text-sm text-gray-300">{tips}</p>
        </div>
      </CardContent>
    </Card>
  );

  // Get calculation details from userInfo
  const { bmr, tdee, goalAdjustment, proteinCalculation } = userInfo.nutritionCalc.calculations;
  const activityMultiplier = getActivityMultiplier(userInfo.activity_level);

  return (
    <section className="space-y-8 mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Daily Nutrition Target</h2>
        <button
          onClick={() => window.open('/nutrition-guide', '_blank')}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-all duration-300"
        >
          <Info className="w-4 h-4" />
          <span>Learn about nutrition</span>
        </button>
      </div>
      
      {/* Enhanced Overview Card */}
      <Card className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-gray-700/50">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calories Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="p-4 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20">
                  <Flame className="w-10 h-10 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Daily Calories</h3>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-5xl font-bold text-orange-400">{calories}</span>
                    <span className="text-gray-400">kcal</span>
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
                    Based on age, weight, height, and gender
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">
                      TDEE = BMR × {activityMultiplier} ({formatActivityLevel(userInfo.activity_level)})
                    </span>
                    <span className="text-gray-200 font-medium">{tdee} kcal</span>
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
                    {userInfo.goal.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
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
                onClick={() => window.open('/calorie-guide', '_blank')}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 border border-blue-500/20 transition-all duration-300 group"
              >
                <div className="flex items-center space-x-2 text-blue-400">
                  <Calculator className="w-5 h-5" />
                  <span>Learn more about calorie calculations</span>
                </div>
                <ArrowRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>

            {/* Enhanced Pie Chart */}
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
                <h3 className="text-lg font-semibold text-white mb-4">Your Daily Macros</h3>
                <div className="space-y-3">
                  {macroData.map((macro) => (
                    <div key={macro.name} className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: macro.color }} />
                      <span className="text-gray-300 font-medium">{macro.name}</span>
                      <span className="text-gray-400">{calculatePercentage(macro)}%</span>
                      <span className="text-gray-300 font-medium">{macro.grams}g</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => window.open('/macro-guide', '_blank')}
                  className="mt-4 flex items-center space-x-2 text-sm text-blue-400 hover:text-blue-300 transition-colors duration-300"
                >
                  <span>How macros are calculated</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
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
          description={`${proteinCalculation.multiplier}g per kg of body weight (${proteinCalculation.total}g total) based on your ${userInfo.goal.replace('_', ' ')} goal`}
          tips="High-quality sources: Chicken breast, fish, eggs, lean beef, Greek yogurt, whey protein, tofu, legumes"
        />
        <MacroCard
          title="Carbohydrates"
          grams={carbs}
          icon={Wheat}
          color="#10B981"
          description="Calculated to fill remaining calories after protein and fat allocations"
          tips="Complex carbs: Brown rice, sweet potatoes, quinoa, oats, whole grain bread, fruits, vegetables"
        />
        <MacroCard
          title="Fats"
          grams={fats}
          icon={Droplet}
          color="#EC4899"
          description="Set to 25% of total daily calories for optimal hormone function"
          tips="Healthy sources: Avocados, nuts, olive oil, fatty fish, seeds, nut butters"
        />
      </div>
    </section>
  );
};

export default NutritionOverview;