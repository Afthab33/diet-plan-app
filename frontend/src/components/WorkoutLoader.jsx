import React, { useState, useEffect } from 'react';
import { 
  UtensilsCrossed, Scale, Brain, Calculator, 
  Clock, Sparkles, Apple, Dumbbell, Salad,
  Heart, Target
} from 'lucide-react';

const WorkoutLoader = () => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [progressStep, setProgressStep] = useState(0);
  const maxSteps = 4;

  // Items that will orbit in 3D space
  const orbitItems = [
    { icon: '🥗', name: 'Salad', color: 'green', radius: 80, speed: 1 },
    { icon: '🍎', name: 'Apple', color: 'red', radius: 80, speed: 0.8 },
    { icon: '🥑', name: 'Avocado', color: 'green', radius: 80, speed: 1.2 },
    { icon: '💪', name: 'Strength', color: 'blue', radius: 80, speed: 0.9 },
    { icon: '🏋️', name: 'Workout', color: 'purple', radius: 80, speed: 1.1 },
    { icon: '🥩', name: 'Protein', color: 'red', radius: 80, speed: 0.7 },
    { icon: '🥛', name: 'Dairy', color: 'white', radius: 80, speed: 1.3 },
    { icon: '🎯', name: 'Goal', color: 'yellow', radius: 80, speed: 1 }
  ];

  const loadingSteps = [
    {
      icon: Brain,
      title: "Analyzing Your Profile",
      description: "Calculating optimal nutritional needs based on your goals",
      color: "from-blue-500 to-purple-500"
    },
    {
      icon: Calculator,
      title: "Crafting Your Macros",
      description: "Balancing proteins, carbs, and healthy fats",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: UtensilsCrossed,
      title: "Designing Meal Plan",
      description: "Creating delicious and nutritious combinations",
      color: "from-pink-500 to-orange-500"
    },
    {
      icon: Clock,
      title: "Optimizing Timeline",
      description: "Scheduling perfect meal timings for your lifestyle",
      color: "from-orange-500 to-yellow-500"
    }
  ];

  useEffect(() => {
    // Rotate the orbit
    const rotationInterval = setInterval(() => {
      setRotationAngle(prev => (prev + 1) % 360);
    }, 50);

    // Progress through steps
    const progressInterval = setInterval(() => {
      setProgressStep(prev => (prev + 1) % (maxSteps + 1));
    }, 3000);

    return () => {
      clearInterval(rotationInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-900/90 backdrop-blur-lg flex items-center justify-center z-50">

      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse" />
        <div 
          className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)] animate-spin-slow"
          style={{ transform: `rotate(${particleCount * 2}deg)` }}
        />
      </div>
      <div className="relative bg-gray-800/90 rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl border border-gray-700/50 backdrop-blur-xl">
        {/* 3D Scene Container */}
        <div className="w-full h-64 perspective-1000 mb-8">
          <div className="relative w-full h-full">
            {/* Center Dumbbell */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="relative w-16 h-16 animate-pulse">
                <Dumbbell className="w-16 h-16 text-blue-400" />
                <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping" />
              </div>
            </div>

            {/* Orbiting Items */}
            <div className="absolute top-1/2 left-1/2 transform-style-3d">
              {orbitItems.map((item, index) => {
                const angle = (index * (360 / orbitItems.length) + rotationAngle) * (Math.PI / 180);
                const orbitRadius = item.radius;
                const x = Math.cos(angle * item.speed) * orbitRadius;
                const y = Math.sin(angle * item.speed) * orbitRadius;
                const z = Math.sin(angle * item.speed) * 20; // Adds some depth variation

                return (
                  <div
                    key={index}
                    className="absolute transform-style-3d transition-transform duration-300"
                    style={{
                      transform: `translate3d(${x}px, ${y}px, ${z}px) scale(${1 + z/200})`,
                      opacity: 0.8 + z/100
                    }}
                  >
                    <div className="relative">
                      <div className="text-4xl transform-style-3d animate-float">
                        {item.icon}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl -z-10" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Processing Steps */}
        <div className="space-y-4">
          {loadingSteps.map((step, index) => {
            const isActive = index === progressStep;
            const isCompleted = index < progressStep;
            const Icon = step.icon;

            return (
              <div
                key={index}
                className={`transform transition-all duration-500 
                  ${isActive ? 'scale-105' : 'scale-100'}
                  ${isCompleted ? 'opacity-50' : 'opacity-100'}`}
              >
                <div className={`relative p-4 rounded-xl bg-gradient-to-r 
                  ${isActive ? step.color : 'from-gray-700 to-gray-800'} 
                  border border-gray-700/50`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="relative">
                      <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                      {isActive && (
                        <div className="absolute inset-0 bg-white/20 animate-ping rounded-full" />
                      )}
                    </div>
                    <div>
                      <h3 className={`font-semibold ${isActive ? 'text-white' : 'text-gray-300'}`}>
                        {step.title}
                      </h3>
                      <p className={`text-sm ${isActive ? 'text-white/80' : 'text-gray-400'}`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="relative h-2 bg-gray-700/50 rounded-full overflow-hidden mt-6">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            style={{ 
              width: `${(progressStep / maxSteps) * 100}%`,
              transition: 'width 0.5s ease-out'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse" />
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default WorkoutLoader;