import React, { useState, useEffect } from 'react';
import { 
  Dumbbell, Brain, Calculator, Heart,
  Check, Bot, AlertCircle, RefreshCcw, 
  Activity, Target, Apple, Trophy, 
  ChevronRight, X 
} from 'lucide-react';

const WorkoutLoader = () => {
  const [repCount, setRepCount] = useState(0);
  const [weightLoss, setWeightLoss] = useState(105);
  const [particleCount, setParticleCount] = useState(0);
  const maxReps = 10;

  const loadingMessages = [
    "Meet Aftab: The developer who coded his way to fitness💻💪",
    "Fun fact: Lost 35kg while mastering Full Stack Development 🎯",
    "Powered by React and approved by a real Doctor (my brother!) 👨‍⚕️",
    "From 105kg to 70kg: Same guy, less bytes 😄",
    "Loading fitness tips from my viral transformation story... 📈",
    "Mixing algorithms with dumbbells since 2019 🏋️‍♂️",
    "Warning: Side effects include job offers and weight loss 💼",
    "OpenToWork and OpenToWorkout: Story of a tech transformation 🚀",
    "Join 10,000+ people on my fitness + tech journey! 🎥",
    "Fun fact: I lost weight faster than my code compiles 😅",
    "Building apps & building muscles: Full Stack Transformation 💪",
    "PS: Check out my journey on LinkedIn & YouTube! 🎯"
  ];

  const achievements = [
    { icon: Target, text: "105kg → 70kg", color: "text-green-400" },
    { icon: Brain, text: "Full Stack Dev", color: "text-blue-400" },
    { icon: Heart, text: "Content Creator", color: "text-red-400" },
    { icon: Activity, text: "Fitness Journey", color: "text-yellow-400" },
    { icon: Trophy, text: "OpenToWork", color: "text-cyan-400" },
    { icon: Apple, text: "Doctor Approved", color: "text-pink-400" }
  ];

  const [messageIndex, setMessageIndex] = useState(0);
  const [achievementIndex, setAchievementIndex] = useState(0);

  useEffect(() => {
    const intervals = [
      setInterval(() => setRepCount(prev => (prev + 1) % (maxReps + 1)), 1000),
      setInterval(() => setMessageIndex(prev => (prev + 1) % loadingMessages.length), 3000),
      setInterval(() => setAchievementIndex(prev => (prev + 1) % achievements.length), 2000),
      setInterval(() => setParticleCount(prev => prev + 1), 200),
      setInterval(() => {
        setWeightLoss(prev => {
          if (prev > 70) return prev - 1;
          return 105;
        });
      }, 100)
    ];

    return () => intervals.forEach(clearInterval);
  }, []);

  const Achievement = ({ icon: Icon, text, color }) => (
    <div className={`flex items-center space-x-2 ${color} animate-bounce px-4 py-2 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50`}>
      <Icon className="w-5 h-5" />
      <span className="font-semibold">{text}</span>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-lg flex items-center justify-center z-50">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse" />
        <div 
          className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)] animate-spin-slow"
          style={{ transform: `rotate(${particleCount * 2}deg)` }}
        />
      </div>

      <div className="relative bg-gray-800/90 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-gray-700/50 backdrop-blur-xl">
        {/* Glowing Corner Accents */}
        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-transparent rounded-tl-2xl" />
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-purple-500/20 to-transparent rounded-tr-2xl" />
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-green-500/20 to-transparent rounded-bl-2xl" />
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-pink-500/20 to-transparent rounded-br-2xl" />

        {/* Weight Loss Animation */}
        <div className="relative mb-8 transform hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-center space-x-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
              <Dumbbell 
                className="w-16 h-16 text-blue-400 transform transition-transform duration-300 relative z-10"
                style={{ transform: `rotate(${repCount * 36}deg)` }}
              />
              <div className="absolute inset-0 bg-blue-500/20 animate-ping rounded-full" />
            </div>
            <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
              {weightLoss}kg
            </div>
          </div>
        </div>

        {/* Current Achievement */}
        <div className="mb-6 flex justify-center transform hover:scale-105 transition-transform duration-300">
          <Achievement {...achievements[achievementIndex]} />
        </div>

        {/* Loading Message with Gradient Background */}
        <div className="relative mb-6 p-4 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600/30">
          <p className="text-lg text-gray-300 text-center h-12 flex items-center justify-center font-medium">
            {loadingMessages[messageIndex]}
          </p>
        </div>

        {/* Enhanced Progress Bar */}
        <div className="w-full h-3 bg-gray-700/50 rounded-full overflow-hidden mb-6 p-0.5">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative"
            style={{ 
              width: `${(repCount / maxReps) * 100}%`,
              transition: 'width 1s ease-in-out'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse" />
          </div>
        </div>

        {/* Animated Social Links */}
        <div className="flex justify-center space-x-6 mb-6">
          {[Brain, Heart, Trophy].map((Icon, index) => (
            <div key={index} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Icon className={`w-8 h-8 ${index === 0 ? 'text-blue-400' : index === 1 ? 'text-red-400' : 'text-green-400'} transform transition-all duration-300 hover:scale-125 hover:rotate-12`} />
            </div>
          ))}
        </div>

        {/* Enhanced Fun Tips */}
        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600/30 transform hover:scale-105 transition-transform duration-300">
            <p className="text-sm text-gray-300 italic text-center">
              "While this AI thinks, check out Aftab's Profile on LinkedIn and Connect! 🚀"
            </p>
          </div>
          <div className="p-3 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600/30 transform hover:scale-105 transition-transform duration-300">
            <p className="text-sm text-gray-300 text-center">
              P.S. Did you know? This diet plan is approved by a real doctor 
              (Aftab's brother!) 👨‍⚕️
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutLoader;