import React, { useState, useEffect } from 'react';
import { 
  Brain, Sparkles, Bot, ArrowRight, ChevronRight,
  Utensils, Heart, Clock, Leaf, Scale, Activity,
  Code, Linkedin, Apple, Trophy, Target, ArrowDown
} from 'lucide-react';
import profileImage from '/Users/aftab/Projects/diet-app/frontend/src/assets/images/profileImage.jpg';
import { Link } from 'react-router-dom';
import openAiLogo from '../assets/openai-logo.svg';

const LandingPage = ({ onGetStarted, onShowNutritionGuide }) => {
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

  // Food emojis for floating animation
  const foodEmojis = ['🥗', '🥑', '🥦', '🍎', '🥕', '🍗', '🥚', '🥩', '🍚', '🥜'];

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Smart Meal Planning",
      description: "Intelligent system that learns your preferences and dietary needs",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Personalized Nutrition",
      description: "Custom recommendations based on your health goals",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Dietary Flexibility",
      description: "Support for all dietary preferences and restrictions",
      gradient: "from-green-500 to-emerald-500"
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
        {[...Array(3)].map((_, index) => (
          <path
            key={index}
            d="M0 50 Q 25 45, 50 50 T 100 50"
            fill="none"
            stroke="url(#ribbon-gradient)"
            strokeWidth="0.5"
            strokeLinecap="round"
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

  return (
    <div className="min-h-screen">
  {/* Dynamic Background */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent)]" />
    <div 
      className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 animate-pulse-slow"
      style={{
        transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`,
        transition: 'transform 0.6s ease-out'
      }}
    />
    {/* Subtle gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-500/3 to-transparent" />
  </div>

      {/* Static Food Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        {[
          { emoji: '🥗', left: '10%', top: '20%', delay: '0s' },
          { emoji: '🍲', left: '85%', top: '15%', delay: '0.3s' },
          { emoji: '🥑', left: '75%', top: '60%', delay: '0.6s' },
          { emoji: '🥪', left: '15%', top: '70%', delay: '0.9s' },
          { emoji: '🥕', left: '80%', top: '35%', delay: '1.2s' },
          { emoji: '🥚', left: '20%', top: '45%', delay: '1.5s' },
          { emoji: '🥦', left: '70%', top: '75%', delay: '1.8s' },
          { emoji: '🍗', left: '5%', top: '85%', delay: '2.1s' },
          { emoji: '🍎', left: '80%', top: '85%', delay: '0s' },
        ].map((item, index) => (
          <div
            key={index}
            className="absolute transform hover:scale-110 transition-all duration-700"
            style={{
              fontSize: '4rem',
              left: item.left,
              top: item.top,
              filter: 'drop-shadow(0 0 15px rgba(50,50,50,0.4))',
              opacity: 2.0,
              animation: 'gentle-float 3s ease-in-out infinite',
              animationDelay: item.delay
            }}
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-white/10 rounded-full blur-xl group-hover:bg-white/20 transition-all duration-700" />
              <span className="relative z-10">{item.emoji}</span>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes gentle-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

  {/* Header */}
  <header className="relative z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center py-6 space-y-4 md:space-y-0">

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" />
            <img
              src={profileImage}
              alt="Aftab Hussain"
              className="relative w-12 h-12 rounded-full object-cover border-2 border-gray-700"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900" />
          </div>
          <div className="flex items-center space-x-3">
          <div>
            <p className="text-sm text-blue-400 font-medium tracking-wide">Developed by</p>
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
              Aftab Hussain
            </h2>
          </div>
          <a 
            href="https://www.linkedin.com/in/aftabhussain33/" 
            className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 text-blue-400 hover:text-white transition-all duration-300 transform hover:scale-110"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
          <Brain className="w-5 h-5 text-blue-400" />
          <span className="text-blue-400 font-medium">Want to know how we generate AI based diet plan?</span>
            <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
        
        <button
          onClick={() => onShowNutritionGuide()}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 border border-purple-500/20 transition-all duration-300 group"
        >
          <span className="text-purple-400 font-medium">Learn Now</span>
        </button>
      </div>
    </div>
  </div>
</header>

      {/* Hero Section */}
      <div className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center relative z-10 max-w-7xl mx-auto" style={{ zIndex: 1 }}>
          
        <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 mb-8">
          <img src={openAiLogo} alt="OpenAI Logo" className="w-6 h-6" />
          <span className="text-white/90 text-base font-medium ml-2">Powered by OpenAI</span>
        </div>

          {/* Ribbon Flow positioned behind the title */}
          <div className="absolute inset-0 -z-10 top-32">
            <RibbonFlow />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI-Driven
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl animate-pulse" />
            </span>
            <br />
            <span className="text-white">Diet Planning</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-300 mb-8 sm:mb-12 leading-relaxed px-4">
            Transform your nutrition journey with our advanced meal planning system.
            Get personalized recommendations that adapt to your lifestyle.
          </p>

          {/* CTA Button */}
          <div className="relative inline-block group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
            <button
              onClick={onGetStarted}
              className="relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full font-medium text-white text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
            >
              <span className="flex items-center">
                Create Your Diet Plan
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 sm:mt-24 px-4">
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

      <style jsx>{`
  @keyframes gentle-float {
    0%, 100% { 
      transform: translateY(0) rotate(0deg);
      filter: drop-shadow(0 0 15px rgba(255,255,255,0.4));
    }
    50% { 
      transform: translateY(-10px) rotate(5deg);
      filter: drop-shadow(0 0 20px rgba(255,255,255,0.6));
    }
  }

  @keyframes pulse-slow {
    0%, 100% { 
      opacity: 0.6; 
      transform: scale(1); 
    }
    50% { 
      opacity: 0.8; 
      transform: scale(1.02); 
    }
  }

  .animate-pulse-slow {
    animation: pulse-slow 4s ease-in-out infinite;
  }

  @media (max-width: 640px) {
    .animate-pulse-slow {
      animation: none;
    }
    
    .food-emoji {
      font-size: 3rem;
    }
  }
`}</style>
    </div>
  );
};

export default LandingPage;