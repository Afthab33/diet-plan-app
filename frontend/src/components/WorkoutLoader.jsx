import React, { useState, useEffect, useCallback } from 'react';
import { 
  UtensilsCrossed, Brain, Calculator, 
  Clock, Dumbbell, Sparkles,
  Apple, Heart, Target
} from 'lucide-react';

const WorkoutLoader = () => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [progressStep, setProgressStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const maxSteps = 4;

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const orbitItems = [
    { icon: '🥗', name: 'Salad', color: 'green', speed: 1 },
    { icon: '🍎', name: 'Apple', color: 'red', speed: 0.8 },
    { icon: '🥑', name: 'Avocado', color: 'green', speed: 1.2 },
    { icon: '💪', name: 'Strength', color: 'blue', speed: 0.9 },
    { icon: '🏋️', name: 'Workout', color: 'purple', speed: 1.1 },
    { icon: '🥩', name: 'Protein', color: 'red', speed: 0.7 },
    { icon: '🥛', name: 'Dairy', color: 'white', speed: 1.3 },
    { icon: '🎯', name: 'Goal', color: 'yellow', speed: 1 }
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

  const animate = useCallback(() => {
    setRotationAngle(prev => (prev + 0.5) % 360);
    requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const animationFrame = requestAnimationFrame(animate);
    
    const progressInterval = setInterval(() => {
      setProgressStep(prev => (prev + 1) % (maxSteps + 1));
    }, 3000);

    return () => {
      cancelAnimationFrame(animationFrame);
      clearInterval(progressInterval);
    };
  }, [animate]);

  const getOrbitRadius = () => {
    return isMobile ? 40 : 80;
  };

  return (
    <div className="fixed inset-0 bg-gray-900/90 backdrop-blur-lg flex items-center justify-center z-50">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse" />
      
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float-particle"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              background: `rgba(${Math.random() * 255}, ${Math.random() * 255}, 255, ${Math.random() * 0.3})`,
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDuration: Math.random() * 3 + 2 + 's',
              animationDelay: Math.random() * 2 + 's'
            }}
          />
        ))}

        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 animate-pulse-slow"
              style={{
                background: `radial-gradient(circle at ${50 + Math.sin(i * Math.PI / 3) * 30}% ${50 + Math.cos(i * Math.PI / 3) * 30}%, rgba(${i * 80}, 100, 255, 0.1), transparent)`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute h-full w-1 animate-light-beam"
              style={{
                background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), transparent)',
                left: `${i * 25}%`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>

        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            animation: 'grid-move 20s linear infinite'
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/20" />
      </div>

      <div className="relative bg-gray-800/90 rounded-2xl p-4 md:p-8 max-w-lg w-full mx-4 shadow-2xl border border-gray-700/50 backdrop-blur-xl">
        <div className="w-full h-48 md:h-64 perspective-1000 mb-4 md:mb-8">
          <div className="relative w-full h-full">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="relative w-12 h-12 md:w-16 md:h-16 animate-pulse flex items-center justify-center">
                <Dumbbell className="w-8 h-8 md:w-10 md:h-10 text-blue-400" />
                <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping" />
              </div>
            </div>

            <div className="absolute top-1/2 left-1/2 transform-gpu">
              {orbitItems.map((item, index) => {
                const angle = (index * (360 / orbitItems.length) + rotationAngle) * (Math.PI / 180);
                const radius = getOrbitRadius();
                const x = Math.cos(angle * item.speed) * radius;
                const y = Math.sin(angle * item.speed) * radius;
                const scale = isMobile ? 0.8 : 1;

                return (
                  <div
                    key={index}
                    className="absolute transition-transform will-change-transform"
                    style={{
                      transform: `translate(${x}px, ${y}px) scale(${scale})`,
                      fontSize: isMobile ? '1.5rem' : '2rem'
                    }}
                  >
                    <div className="relative animate-float">
                      <span>{item.icon}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Processing Steps*/}
        <div className="space-y-2 md:space-y-4">
          {loadingSteps.map((step, index) => {
            const isActive = index === progressStep;
            const isCompleted = index < progressStep;
            const Icon = step.icon;

            return (
              <div
                key={index}
                className={`transform transition-all duration-500 
                  ${isActive ? 'scale-102' : 'scale-100'}
                  ${isCompleted ? 'opacity-50' : 'opacity-100'}`}
              >
                <div className={`relative p-3 md:p-4 rounded-xl bg-gradient-to-r 
                  ${isActive ? step.color : 'from-gray-700 to-gray-800'} 
                  border border-gray-700/50`}
                >
                  <div className="flex items-start space-x-3">
                    <Icon className={`w-5 h-5 md:w-6 md:h-6 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                    <div>
                      <h3 className={`text-sm md:text-base font-semibold ${isActive ? 'text-white' : 'text-gray-300'}`}>
                        {step.title}
                      </h3>
                      <p className={`text-xs md:text-sm ${isActive ? 'text-white/80' : 'text-gray-400'}`}>
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
        <div className="relative h-1.5 md:h-2 bg-gray-700/50 rounded-full overflow-hidden mt-4 md:mt-6">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            style={{ 
              width: `${(progressStep / maxSteps) * 100}%`,
              transition: 'width 0.5s ease-out'
            }}
          />
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .transform-gpu {
          transform: translate(-50%, -50%);
          will-change: transform;
        }

        @keyframes grid-move {
          0% { transform: translateX(-50%) translateY(-50%) rotate(0deg); }
          100% { transform: translateX(-50%) translateY(-50%) rotate(360deg); }
        }

        @keyframes float-particle {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }

        @keyframes light-beam {
          0% { transform: translateX(-100%) skewX(-45deg); }
          100% { transform: translateX(200%) skewX(-45deg); }
        }

        .animate-float-particle {
          animation: float-particle 3s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-light-beam {
          animation: light-beam 3s ease-out infinite;
        }
      `}</style>
    </div>
  );
};

export default WorkoutLoader;