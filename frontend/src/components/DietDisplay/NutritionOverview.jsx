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
  ChevronDown,
  ChevronRight
} from 'lucide-react';

const NutritionOverview = ({ calories, protein, carbs, fats, userInfo }) => {
  const [showCalorieCalc, setShowCalorieCalc] = React.useState(false);
  
  const macroData = [
    { name: 'Protein', value: protein * 4, color: '#60A5FA', grams: protein },
    { name: 'Carbs', value: carbs * 4, color: '#34D399', grams: carbs },
    { name: 'Fats', value: fats * 9, color: '#F472B6', grams: fats }
  ];

  const calculatePercentage = (macro) => {
    return Math.round((macro.value / calories) * 100);
  };

  const formatActivityLevel = (level) => {
    return level.split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const MacroCard = ({ title, grams, icon: Icon, color, description, tips }) => (
    <Card className="bg-gray-800/50 border-gray-700/50">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-lg bg-opacity-10`} style={{ backgroundColor: `${color}20` }}>
              <Icon className="w-6 h-6" style={{ color }} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="text-2xl font-bold" style={{ color }}>
                {grams}g
              </p>
            </div>
          </div>
          <div className="group relative">
            <HelpCircle className="w-5 h-5 text-gray-400 cursor-help" />
            <div className="absolute right-0 w-64 p-4 bg-gray-900 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 text-sm text-gray-300">
              {description}
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-gray-700/30 rounded-lg p-4 mt-4">
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

  return (
    <section className="space-y-6 mt-8">
      <h2 className="text-2xl font-bold text-white">Daily Nutrition Target</h2>
      
      {/* Main Overview Card */}
      <Card className="bg-gray-800/50 border-gray-700/50">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Calories Section with Detailed Breakdown */}
            <div className="space-y-4">
              <div className="flex items-center space-x-6">
                <div className="p-4 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20">
                  <Flame className="w-8 h-8 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Daily Calories</h3>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-4xl font-bold text-orange-400">{calories}</span>
                    <span className="text-gray-400">kcal</span>
                  </div>
                </div>
              </div>

              {/* Calculation Breakdown Button */}
              <button
                onClick={() => setShowCalorieCalc(!showCalorieCalc)}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors duration-300"
              >
                <div className="flex items-center space-x-2 text-gray-300">
                  <Calculator className="w-4 h-4" />
                  <span>View Calculation Breakdown</span>
                </div>
                {showCalorieCalc ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>

              {/* Calculation Breakdown */}
              {showCalorieCalc && (
                <div className="space-y-3 p-4 rounded-lg bg-gray-700/20">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">BMR (Base Metabolic Rate)</span>
                      <span className="text-gray-300">{bmr} kcal</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Based on age, weight, height, and gender
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">TDEE (Total Daily Energy Expenditure)</span>
                      <span className="text-gray-300">{tdee} kcal</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      BMR × Activity Level ({formatActivityLevel(userInfo.activity_level)})
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Goal Adjustment</span>
                      <span className="text-gray-300">{goalAdjustment > 0 ? '+' : ''}{goalAdjustment} kcal</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Based on your goal: {userInfo.goal.split('_').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-600">
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-gray-300">Final Daily Target</span>
                      <span className="text-orange-400">{calories} kcal</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Macros Distribution Chart */}
            <div className="flex items-center justify-center">
              <div className="w-48 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={macroData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {macroData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="text-2xl font-bold text-white">
                    {calories}
                  </div>
                  <div className="text-sm text-gray-400">kcal</div>
                </div>
              </div>
              <div className="ml-6 space-y-2">
                {macroData.map((macro) => (
                  <div key={macro.name} className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: macro.color }} />
                    <span className="text-gray-300">{macro.name}</span>
                    <span className="text-gray-400">{calculatePercentage(macro)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Macro Cards with Integrated Tips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MacroCard
          title="Protein"
          grams={protein}
          icon={Beef}
          color="#60A5FA"
          description={`${proteinCalculation.multiplier}g per kg of body weight (${proteinCalculation.total}g total) based on your ${userInfo.goal.replace('_', ' ')} goal`}
          tips="High-quality sources: Chicken breast, fish, eggs, lean beef, Greek yogurt, whey protein, tofu, legumes"
        />
        <MacroCard
          title="Carbohydrates"
          grams={carbs}
          icon={Wheat}
          color="#34D399"
          description="Calculated to fill remaining calories after protein and fat allocations"
          tips="Complex carbs: Brown rice, sweet potatoes, quinoa, oats, whole grain bread, fruits, vegetables"
        />
        <MacroCard
          title="Fats"
          grams={fats}
          icon={Droplet}
          color="#F472B6"
          description="Set to 25% of total daily calories for optimal hormone function"
          tips="Healthy sources: Avocados, nuts, olive oil, fatty fish, seeds, nut butters"
        />
      </div>
    </section>
  );
};

export default NutritionOverview;