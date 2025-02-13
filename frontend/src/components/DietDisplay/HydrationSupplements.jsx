import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Droplet, 
  Package, 
  Clock, 
  AlertCircle, 
  Check,
  Sun,
  Moon,
  Coffee
} from 'lucide-react';
import WaterIntakeSection from './WaterIntakeSection';
import Supplements from '@/Steps/Supplements.jsx';

const HydrationSupplements = ({ weight, activityLevel, supplements = [], formData, setFormData }) => {
  const supplementInfo = {
    whey: {
      name: "Whey Protein",
      timing: "Post-workout or between meals",
      dosage: "1 scoop (30g)",
      benefits: "Supports muscle recovery and growth",
      tips: "Mix with water or milk. Can be added to smoothies.",
      icon: Package,
      color: "blue"
    },
    creatine: {
      name: "Creatine Monohydrate",
      timing: "Any time of day, consistently",
      dosage: "5g daily",
      benefits: "Enhances strength and muscle performance",
      tips: "No need to cycle. Mix with water or your protein shake.",
      icon: Package,
      color: "purple"
    },
    // Add more supplements as needed
  };

  return (
    <div className="space-y-8 mt-8">
      {/* Water Intake Section */}
      <WaterIntakeSection weight={weight} activityLevel={activityLevel} />
      <Supplements 
        formData={formData}
        setFormData={setFormData}
        supplements={supplements}
      />
      {/* Supplements Section - Only show if supplements are selected */}
      {supplements.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <Package className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Supplement Plan</h2>
          </div>

          {/* Supplements Info Card */}
          <Card className="bg-gray-800/50 border-gray-700/50">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Daily Schedule */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Daily Schedule</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-3 rounded-lg bg-gray-700/30">
                      <Sun className="w-5 h-5 text-yellow-400" />
                      <div>
                        <p className="text-white font-medium">Morning</p>
                        <p className="text-sm text-gray-400">With breakfast</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-3 rounded-lg bg-gray-700/30">
                      <Clock className="w-5 h-5 text-blue-400" />
                      <div>
                        <p className="text-white font-medium">Post-Workout</p>
                        <p className="text-sm text-gray-400">Within 30 minutes</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-3 rounded-lg bg-gray-700/30">
                      <Moon className="w-5 h-5 text-purple-400" />
                      <div>
                        <p className="text-white font-medium">Evening</p>
                        <p className="text-sm text-gray-400">Before bed</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tips */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Important Notes</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-400 mt-0.5" />
                      <p className="text-gray-300">Consistency is key - take supplements at the same time each day</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
                      <p className="text-gray-300">Always follow recommended dosages on the product label</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Coffee className="w-5 h-5 text-orange-400 mt-0.5" />
                      <p className="text-gray-300">Some supplements may interact with caffeine or medications</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Individual Supplement Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {supplements.map((supplementId) => {
              const supplement = supplementInfo[supplementId];
              if (!supplement) return null;

              const IconComponent = supplement.icon;

              return (
                <Card key={supplementId} className="bg-gray-800/50 border-gray-700/50">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg bg-${supplement.color}-500/20`}>
                        <IconComponent className={`w-6 h-6 text-${supplement.color}-400`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-2">{supplement.name}</h3>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">Dosage:</span>
                            <span className="text-white">{supplement.dosage}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">Timing:</span>
                            <span className="text-white">{supplement.timing}</span>
                          </div>
                          <div className="mt-3 pt-3 border-t border-gray-700">
                            <p className="text-sm text-gray-300">{supplement.tips}</p>
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
      )}
    </div>
  );
};

export default HydrationSupplements;