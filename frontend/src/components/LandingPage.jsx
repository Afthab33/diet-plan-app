import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Sparkles,
  Bot,
  Cpu,
  ArrowRight,
  ChevronRight,
  Utensils,
  Heart,
  Clock,
  Leaf,
  Scale,
  Activity,
  Code,
  Linkedin
} from 'lucide-react';

const GeometricBackground = () => (
  <div className="absolute inset-0 overflow-hidden opacity-20">
    <div className="absolute w-full h-full">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-white/5"
          style={{
            width: Math.random() * 30 + 10 + 'px',
            height: Math.random() * 30 + 10 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            transform: `rotate(${Math.random() * 360}deg)`,
            opacity: Math.random() * 0.5 + 0.5
          }}
        />
      ))}
    </div>
  </div>
);

const LandingPage = ({ onGetStarted }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Smart Meal Planning",
      description: "Intelligent system that learns your preferences and dietary needs to create perfect meal plans",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Personalized Nutrition",
      description: "Custom recommendations based on your health goals, allergies, and lifestyle",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Dietary Flexibility",
      description: "Support for all dietary preferences including vegan, keto, paleo, and more",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  const benefits = [
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Balanced Nutrition",
      description: "Perfect macro and micronutrient distribution"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Time-Saving",
      description: "Quick meal suggestions and prep instructions"
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Goal Tracking",
      description: "Monitor your progress and adjust accordingly"
    }
  ];

  const RibbonFlow = () => (
    <div className="absolute inset-0 overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="ribbon-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.4)">
              <animate 
                attributeName="stop-color" 
                values="rgba(59, 130, 246, 0.4); rgba(147, 51, 234, 0.4); rgba(59, 130, 246, 0.4)" 
                dur="8s" 
                repeatCount="indefinite" 
              />
            </stop>
            <stop offset="100%" stopColor="rgba(236, 72, 153, 0.4)">
              <animate 
                attributeName="stop-color" 
                values="rgba(236, 72, 153, 0.4); rgba(59, 130, 246, 0.4); rgba(236, 72, 153, 0.4)" 
                dur="8s" 
                repeatCount="indefinite" 
              />
            </stop>
          </linearGradient>
        </defs>

        {/* Dynamic Flowing Ribbons */}
        {[...Array(3)].map((_, index) => (
          <path
            key={index}
            d="M0 50 Q 25 45, 50 50 T 100 50"
            fill="none"
            stroke="url(#ribbon-gradient)"
            strokeWidth="0.5"
            strokeLinecap="round"
            className={`animate-ribbon-flow-${index + 1}`}
            style={{
              transform: `translateY(${index * 20}px)`,
              opacity: 0.3
            }}
          >
            <animate
              attributeName="d"
              values={`
                M0 ${50 + index * 5} Q 25 ${45 + index * 5}, 50 ${50 + index * 5} T 100 ${50 + index * 5};
                M0 ${50 + index * 5} Q 25 ${55 + index * 5}, 50 ${50 + index * 5} T 100 ${50 + index * 5};
                M0 ${50 + index * 5} Q 25 ${45 + index * 5}, 50 ${50 + index * 5} T 100 ${50 + index * 5}
              `}
              dur={`${10 + index * 2}s`}
              repeatCount="indefinite"
            />
          </path>
        ))}
      </svg>
    </div>
  );

  const DynamicGradient = () => (
    <div className="absolute inset-0 overflow-hidden">
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse-slow"
        style={{
          transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`,
          transition: 'transform 0.6s ease-out'
        }}
      />
      <div 
        className="absolute inset-0 bg-gradient-to-tr from-blue-600/5 via-purple-600/5 to-pink-600/5 animate-pulse-slow-reverse"
        style={{
          transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`,
          transition: 'transform 0.6s ease-out'
        }}
      />
    </div>
  );

  const GlowingOrbs = () => (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="absolute w-64 h-64 rounded-full animate-float-orb"
          style={{
            background: `radial-gradient(circle at center, rgba(147, 51, 234, 0.1) 0%, transparent 70%)`,
            left: `${20 + i * 30}%`,
            top: `${20 + i * 20}%`,
            transform: `translate(${mousePosition.x * (i + 1) * 10}px, ${mousePosition.y * (i + 1) * 10}px)`,
            transition: 'transform 0.8s ease-out',
            animationDelay: `${i * 1}s`
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Background Effects */}
      <DynamicGradient />
      <GlowingOrbs />
      
      {/* Developer Brand Header */}
      <header className="relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            {/* Developer Brand */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Code className="w-6 h-6 text-blue-400" />
                <div>
                  <p className="text-sm text-blue-400 font-mono">Developed by</p>
                  <h2 className="text-xl font-bold font-mono bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Aftab Hussain
                  </h2>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a href="https://www.linkedin.com/in/aftabhussain33/" className="p-2 rounded-lg hover:bg-gray-800/50 text-gray-400 hover:text-white transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center relative z-10 max-w-7xl mx-auto">
          {/* Smart Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-md border border-blue-500/20 mb-8">
            <Sparkles className="w-5 h-5 text-blue-400 mr-2" />
            <span className="text-blue-400 font-medium">Smart Diet Planning</span>
            <div className="w-2 h-2 rounded-full bg-blue-400 ml-3 animate-pulse" />
          </div>

          {/* Ribbon Flow positioned behind the title */}
          <div className="absolute inset-0 -z-10 top-32">
            <RibbonFlow />
          </div>

          {/* Main Title */}
          <h1 className="text-5xl sm:text-7xl font-bold mb-8 leading-tight">
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI-Driven
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl animate-pulse" />
            </span>
            <br />
            <span className="text-white">Diet Planning</span>
          </h1>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-xl text-gray-300 mb-12 leading-relaxed">
            Transform your nutrition journey with our advanced meal planning system.
            Get personalized recommendations that adapt to your lifestyle and preferences.
          </p>

          {/* Smart System Visual */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="relative p-8 rounded-2xl bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl animate-pulse" />
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-blue-500/10">
                      <Utensils className="w-6 h-6 text-blue-400" />
                    </div>
                    <span className="text-gray-300 font-medium">Smart Planning System</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-green-400 text-sm">Active</span>
                  </div>
                </div>

                {/* Analysis Visualization */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="p-4 rounded-xl bg-gray-800/50 border border-gray-700/50">
                      <div className="flex items-center space-x-2 text-blue-400 mb-2">
                        {benefit.icon}
                        <span className="font-medium text-sm">{benefit.title}</span>
                      </div>
                      <p className="text-gray-400 text-sm">{benefit.description}</p>
                    </div>
                  ))}
                </div>

                {/* Processing Bars */}
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="mb-4 last:mb-0">
                    <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-progress"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Button moved here */}
          <div className="relative inline-block group mb-20">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
            <button
              onClick={onGetStarted}
              className="relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full font-medium text-white text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
            >
              <span className="flex items-center">
                Create Your Meal Plan
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group relative"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur opacity-0 group-hover:opacity-100 transition duration-500" />
                <div className="relative p-8 rounded-2xl bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 transition-all duration-300 group-hover:scale-[1.02] group-hover:bg-gray-800/80">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} bg-opacity-10 mb-4`}>
                    <div className="text-white">{feature.icon}</div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-gradient" />
            <div className="relative p-12 text-center backdrop-blur-xl border border-gray-700/50">
              <Brain className="w-12 h-12 mx-auto text-blue-400 mb-6" />
              <h2 className="text-3xl font-bold mb-4 text-white">
                Start Your Smart Diet Journey Today
              </h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Experience the future of personalized nutrition planning
              </p>
              <button
                onClick={onGetStarted}
                className="inline-flex items-center px-8 py-4 rounded-full bg-white text-gray-900 font-medium hover:bg-gray-100 transition-all duration-300 hover:scale-105"
              >
                Get Started Now
                <ChevronRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Added Developer Signature */}
      <div className="absolute bottom-4 right-4 text-sm text-gray-500 font-mono">
        <div className="flex items-center space-x-2">
          <Code className="w-4 h-4" />
          <span>with ❤️ by Aftab Hussain</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes ribbon-flow-1 {
          0%, 100% { transform: translateY(0) scaleY(1); }
          50% { transform: translateY(2px) scaleY(1.1); }
        }

        @keyframes ribbon-flow-2 {
          0%, 100% { transform: translateY(0) scaleY(1.1); }
          50% { transform: translateY(-2px) scaleY(1); }
        }

        @keyframes ribbon-flow-3 {
          0%, 100% { transform: translateY(0) scaleY(1); }
          50% { transform: translateY(3px) scaleY(0.9); }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.02);
          }
        }

        @keyframes pulse-slow-reverse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1.02);
          }
          50% {
            opacity: 0.5;
            transform: scale(1);
          }
        }

        @keyframes float-orb {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(10px, -10px) scale(1.05); }
          50% { transform: translate(0, -20px) scale(1); }
          75% { transform: translate(-10px, -10px) scale(0.95); }
        }

        .animate-ribbon-flow-1 {
          animation: ribbon-flow-1 8s ease-in-out infinite;
        }

        .animate-ribbon-flow-2 {
          animation: ribbon-flow-2 12s ease-in-out infinite;
        }

        .animate-ribbon-flow-3 {
          animation: ribbon-flow-3 10s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }

        .animate-pulse-slow-reverse {
          animation: pulse-slow-reverse 8s ease-in-out infinite;
        }

        .animate-float-orb {
          animation: float-orb 15s ease-in-out infinite;
        }

        /* Your existing animations */
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-progress {
          animation: progress 2s linear infinite;
        }

        .animate-gradient {
          animation: gradient 15s ease infinite;
          background-size: 400% 400%;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;