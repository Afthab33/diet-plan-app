import React from 'react';
import { Brain, Sparkles, Bot, ArrowRight, Book } from 'lucide-react';

export const AiExplainerTab = ({ onLearnMore }) => {
  return (
    <button
      onClick={onLearnMore}
      className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 border border-blue-500/20 transition-all duration-300 group"
    >
      <Brain className="w-5 h-5 text-blue-400 group-hover:rotate-12 transition-transform duration-300" />
      <span className="text-blue-400 font-medium">
        Want to know how we generate AI based diet plan?
      </span>
      <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform duration-300" />
    </button>
  );
};

export const AiExplainerBlog = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-900/95 backdrop-blur-lg z-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="fixed top-4 right-4 p-2 rounded-full bg-gray-800/50 text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Blog Content */}
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-500/10 mb-6">
              <Bot className="w-5 h-5 text-blue-400" />
              <span className="text-blue-400">AI-Powered Diet Planning</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              How We Generate Your AI-Based Diet Plan
            </h1>
            <p className="text-xl text-gray-400">
              A deep dive into our intelligent nutrition planning system
            </p>
          </div>

          {/* Main Content */}
          <div className="prose prose-invert max-w-none">
            <div className="space-y-12">
              {/* Section 1: Data Collection */}
              <section className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <span className="p-2 rounded-lg bg-blue-500/20 mr-3">
                    <Book className="w-6 h-6 text-blue-400" />
                  </span>
                  Data Collection & Analysis
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  We start by collecting essential information about you, including age, 
                  weight, height, activity level, and dietary preferences. This data forms 
                  the foundation of your personalized plan.
                </p>
              </section>

              {/* Section 2: Calculation */}
              <section className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <span className="p-2 rounded-lg bg-purple-500/20 mr-3">
                    <Calculator className="w-6 h-6 text-purple-400" />
                  </span>
                  Scientific Calculations
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  Our system calculates your Base Metabolic Rate (BMR) and Total Daily 
                  Energy Expenditure (TDEE) using scientifically validated formulas. We then 
                  adjust these calculations based on your specific goals.
                </p>
              </section>

              {/* Section 3: AI Processing */}
              <section className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <span className="p-2 rounded-lg bg-green-500/20 mr-3">
                    <Brain className="w-6 h-6 text-green-400" />
                  </span>
                  AI-Powered Meal Generation
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  Our advanced AI model processes your data and preferences to create a 
                  customized meal plan. It considers factors like:
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center text-gray-300">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    Macro and micronutrient balance
                  </li>
                  <li className="flex items-center text-gray-300">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    Food preferences and restrictions
                  </li>
                  <li className="flex items-center text-gray-300">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    Meal timing and frequency
                  </li>
                </ul>
              </section>

              {/* Section 4: Optimization */}
              <section className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <span className="p-2 rounded-lg bg-pink-500/20 mr-3">
                    <Sparkles className="w-6 h-6 text-pink-400" />
                  </span>
                  Plan Optimization
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  The final plan is optimized for sustainability and enjoyment while 
                  meeting your nutritional needs. Our AI ensures variety in your meals 
                  while maintaining consistency with your goals.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};