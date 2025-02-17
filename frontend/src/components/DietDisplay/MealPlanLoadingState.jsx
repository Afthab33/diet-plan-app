import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Bot, Sparkles, UtensilsCrossed } from 'lucide-react';

const MealPlanLoadingState = () => {
  const loadingStates = [
    {
      icon: Bot,
      title: "Analyzing Your Preferences",
      description: "Processing your dietary preferences and restrictions",
    },
    {
      icon: UtensilsCrossed,
      title: "Crafting Your Meals",
      description: "Designing balanced and delicious meal combinations",
    },
    {
      icon: Sparkles,
      title: "Optimizing Portions",
      description: "Fine-tuning portions to match your macro goals",
    },
  ];

  return (
    <section className="space-y-6 mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Your Daily Meal Plan</h2>
        {/* Glowing, pulsing icon with "Please wait" text */}
        <div className="flex items-center space-x-2">
          <div className="relative flex items-center justify-center">
            {/* The 'animate-ping' element behind the icon for the glowing effect */}
            <div className="absolute inline-flex h-8 w-8 rounded-full bg-blue-400 opacity-75 animate-ping"></div>
            {/* Main icon wrapper */}
            <div className="relative p-2 rounded-full bg-blue-500/20">
              <Bot className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <span className="text-blue-400">
            Generating your plan... Please wait
          </span>
        </div>
      </div>

      <Card className="bg-gray-800/50 border-gray-700/50">
        <CardContent className="p-6">
          <div className="space-y-8">
            {loadingStates.map((state, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 animate-pulse"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                  <state.icon className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-gray-700 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-700/50 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-4">
            {[1, 2, 3].map((meal) => (
              <div
                key={meal}
                className="p-4 rounded-lg bg-gray-700/30 animate-pulse"
                style={{ animationDelay: `${meal * 0.15}s` }}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gray-600"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-600 rounded w-1/4"></div>
                    <div className="h-3 bg-gray-600/70 rounded w-1/3"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-600/50 rounded w-full"></div>
                  <div className="h-3 bg-gray-600/50 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default MealPlanLoadingState;
