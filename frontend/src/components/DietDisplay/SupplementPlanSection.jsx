import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Package, 
  Clock, 
  Activity,
  Dumbbell,
  Info
} from 'lucide-react';

const SupplementPlanSection = ({ supplements = [] }) => {
  const supplementInfo = {
    whey: {
      name: "Whey Protein",
      timing: "Post-workout or between meals",
      dosage: "1 scoop (30g)",
      macros: {
        calories: 120,
        protein: 25,
        carbs: 3,
        fats: 1
      },
      benefits: "Supports muscle recovery and growth",
      tips: [
        "Take within 30 minutes after workout for optimal recovery",
        "Can be used as a protein-rich snack between meals",
        "Mix with cold water or milk for best consistency",
        "Can be added to smoothies or oatmeal"
      ],
      icon: Package,
      color: "blue"
    },
    creatine: {
      name: "Creatine Monohydrate",
      timing: "Any time of day, consistently",
      dosage: "5g daily",
      macros: {
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0
      },
      benefits: "Enhances strength and muscle performance",
      tips: [
        "Take consistently every day",
        "No loading phase required",
        "Mix with water or your protein shake",
        "Can be taken pre or post workout"
      ],
      icon: Package,
      color: "purple"
    }
  };

  if (!supplements || supplements.length === 0) return null;

  return (
    <section className="space-y-6 mt-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20">
            <Package className="w-6 h-6 text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Supplement Plan</h2>
        </div>
      </div>

      {/* Tips Card */}
      <Card className="bg-gray-800/50 border-gray-700/50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 text-lg font-semibold text-white mb-4">
            <Info className="w-5 h-5 text-blue-400" />
            <span>Supplement Timing Guide</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Activity className="w-4 h-4 text-green-400 mt-1" />
                <p className="text-gray-300">
                  Take supplements consistently for optimal results
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-blue-400 mt-1" />
                <p className="text-gray-300">
                  Time protein intake around your workouts
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Dumbbell className="w-4 h-4 text-purple-400 mt-1" />
                <p className="text-gray-300">
                  Post-workout nutrition is crucial for recovery
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Supplement Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {supplements.map((supplementId) => {
          const supplement = supplementInfo[supplementId];
          if (!supplement) return null;

          const IconComponent = supplement.icon;

          return (
            <Card key={supplementId} className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg bg-${supplement.color}-500/20`}>
                      <IconComponent className={`w-6 h-6 text-${supplement.color}-400`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{supplement.name}</h3>
                      <p className="text-sm text-gray-400 mt-1">{supplement.benefits}</p>
                    </div>
                  </div>

                  {/* Macros if applicable */}
                  {Object.values(supplement.macros).some(value => value > 0) && (
                    <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-gray-900/50">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-white">
                          {supplement.macros.calories}
                        </div>
                        <div className="text-sm text-gray-400">Calories</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-white">
                          {supplement.macros.protein}g
                        </div>
                        <div className="text-sm text-gray-400">Protein</div>
                      </div>
                      {supplement.macros.carbs > 0 && (
                        <div className="text-center">
                          <div className="text-lg font-semibold text-white">
                            {supplement.macros.carbs}g
                          </div>
                          <div className="text-sm text-gray-400">Carbs</div>
                        </div>
                      )}
                      {supplement.macros.fats > 0 && (
                        <div className="text-center">
                          <div className="text-lg font-semibold text-white">
                            {supplement.macros.fats}g
                          </div>
                          <div className="text-sm text-gray-400">Fats</div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Usage Details */}
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-gray-400 mb-2">Recommended Dosage</div>
                      <div className="text-white">{supplement.dosage}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-400 mb-2">Timing</div>
                      <div className="text-white">{supplement.timing}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-400 mb-2">Usage Tips</div>
                      <ul className="space-y-2">
                        {supplement.tips.map((tip, index) => (
                          <li key={index} className="flex items-start space-x-2 text-sm text-gray-300">
                            <span className="text-blue-400 mt-1">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
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

export default SupplementPlanSection;