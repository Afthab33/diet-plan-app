import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Droplet, 
  Activity, 
  Scale, 
  Info,
  Sun,
  Moon,
  Coffee
} from 'lucide-react';

const calculateWaterIntake = (weight, activityLevel) => {
  // Base calculation: 30ml per kg of body weight
  let baseIntake = weight * 30;
  
  // Activity level adjustments
  const activityMultipliers = {
    sedentary: 1,
    light: 1.1,
    moderate: 1.2,
    active: 1.3,
    very_active: 1.4
  };

  const adjustedIntake = baseIntake * activityMultipliers[activityLevel];
  return Math.round(adjustedIntake / 100) / 10;
};

const HydrationSection = ({ weight, activityLevel }) => {
  const dailyWaterIntake = calculateWaterIntake(weight, activityLevel);
  const glassesOfWater = Math.ceil(dailyWaterIntake * 4); // Assuming 250ml per glass

  const waterTips = [
    { time: "Upon waking", amount: "500ml", reason: "Rehydrate after sleep" },
    { time: "Before meals", amount: "250ml", reason: "Aid digestion" },
    { time: "During workout", amount: "500-750ml", reason: "Replace sweat loss" },
    { time: "Between meals", amount: "250ml", reason: "Maintain hydration" }
  ];

  return (
    <section className="space-y-6 mt-8">
      {/* Section Header */}
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
          <Droplet className="w-6 h-6 text-blue-400" />
        </div>
        <h2 className="text-2xl font-semibold text-white">Daily Hydration Plan</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Main Water Intake Card */}
        <Card className="bg-gray-800/50 overflow-hidden">
          <CardContent className="p-6">
            <div className="relative">
              {/* Water Wave Animation Background */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent animate-pulse" />
              
              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-white mb-4">Daily Water Target</h3>
                
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-4xl font-bold text-blue-400">{dailyWaterIntake}L</p>
                    <p className="text-sm text-gray-400 mt-1">or {glassesOfWater} glasses</p>
                  </div>
                  <div className="grid grid-cols-4 gap-1">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-4 h-12 bg-gray-700 rounded-t-lg relative overflow-hidden">
                        <div 
                          className="absolute bottom-0 w-full bg-blue-400 transition-all duration-500"
                          style={{ 
                            height: '100%',
                            animation: `wave ${1 + i * 0.2}s ease-in-out infinite alternate`
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-start space-x-3 bg-blue-500/10 rounded-lg p-4">
                  <Info className="w-5 h-5 text-blue-400 mt-0.5" />
                  <p className="text-sm text-gray-300">
                    Based on your weight of {weight}kg and {activityLevel.replace('_', ' ')} activity level
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hydration Schedule Card */}
        <Card className="bg-gray-800/50">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Daily Hydration Schedule</h3>
            
            <div className="space-y-4">
              {waterTips.map((tip, index) => (
                <div 
                  key={index}
                  className="flex items-start space-x-3 p-3 rounded-lg bg-gray-700/30 hover:bg-gray-700/70 transition-colors duration-300"
                >
                  <div className="p-2 rounded-lg bg-blue-500/20">
                    <Droplet className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-white">{tip.time}</p>
                      <span className="text-sm px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400">
                        {tip.amount}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">{tip.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Tips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
          <div className="flex items-center space-x-2 text-yellow-400 mb-2">
            <Activity className="w-4 h-4" />
            <p className="font-medium">During Exercise</p>
          </div>
          <p className="text-sm text-gray-300">Drink 200-300ml every 15-20 minutes during workouts</p>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
          <div className="flex items-center space-x-2 text-green-400 mb-2">
            <Scale className="w-4 h-4" />
            <p className="font-medium">Weight Check</p>
          </div>
          <p className="text-sm text-gray-300">Monitor morning weight - sudden increases may indicate dehydration</p>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
          <div className="flex items-center space-x-2 text-blue-400 mb-2">
            <Droplet className="w-4 h-4" />
            <p className="font-medium">Hydration Check</p>
          </div>
          <p className="text-sm text-gray-300">Urine should be light yellow to clear in color</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes wave {
          0% { transform: translateY(100%); }
          100% { transform: translateY(0%); }
        }
      `}</style>
    </section>
  );
};

export default HydrationSection;