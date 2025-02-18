import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Bot, Sparkles, UtensilsCrossed, Clock } from 'lucide-react';

const MealPlanLoadingState = () => {
  const loadingStates = [
    {
      icon: Bot,
      title: "Analyzing Preferences",
      description: "Processing your dietary needs and restrictions",
      color: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-400"
    },
    {
      icon: UtensilsCrossed,
      title: "Crafting Meals",
      description: "Designing balanced and nutritious combinations",
      color: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-400"
    },
    {
      icon: Sparkles,
      title: "Optimizing Plan",
      description: "Fine-tuning portions and macronutrients",
      color: "from-amber-500/20 to-orange-500/20",
      iconColor: "text-amber-400"
    }
  ];

  return (
    <section className="space-y-6 mt-8" role="status" aria-label="Loading meal plan">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          Personalizing Your Meal Plan
        </h2>
        <div className="flex items-center space-x-3 bg-gray-800/50 rounded-full px-4 py-2">
          <div className="relative flex items-center justify-center">
            <div className="absolute inline-flex h-8 w-8 rounded-full bg-blue-400/20 animate-ping"></div>
            <div className="relative rounded-full bg-blue-500/20 p-2">
              <Clock className="w-5 h-5 text-blue-400 animate-spin" />
            </div>
          </div>
          <span className="text-blue-400 font-medium">
            Generating your personalized plan...
          </span>
        </div>
      </div>

      <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="space-y-8">
            {loadingStates.map((state, index) => (
              <div
                key={index}
                className="flex items-start space-x-4"
                style={{
                  animation: 'fadeInUp 0.6s ease-out forwards',
                  animationDelay: `${index * 0.2}s`
                }}
              >
                <div className={`p-3 rounded-xl bg-gradient-to-br ${state.color} animate-pulse`}>
                  <state.icon className={`w-6 h-6 ${state.iconColor}`} />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="h-5 bg-gray-700 rounded w-32 animate-pulse"></div>
                    <div className="h-2 w-2 rounded-full bg-gray-600 animate-ping"></div>
                  </div>
                  <div className="h-4 bg-gray-700/50 rounded w-64 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 space-y-6">
            {[1, 2, 3].map((meal) => (
              <div
                key={meal}
                className="p-4 rounded-lg bg-gradient-to-r from-gray-700/30 to-gray-800/30 backdrop-blur-sm"
                style={{
                  animation: 'fadeInUp 0.6s ease-out forwards',
                  animationDelay: `${0.6 + meal * 0.15}s`
                }}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gray-600/50 to-gray-700/50 animate-pulse"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-5 bg-gray-600 rounded w-32 animate-pulse"></div>
                    <div className="flex space-x-2">
                      <div className="h-4 bg-gray-600/70 rounded w-16 animate-pulse"></div>
                      <div className="h-4 bg-gray-600/70 rounded w-16 animate-pulse"></div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 pl-20">
                  <div className="h-3 bg-gray-600/50 rounded w-full animate-pulse"></div>
                  <div className="h-3 bg-gray-600/50 rounded w-5/6 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default MealPlanLoadingState;