import React from 'react';
import { Check, Trophy } from 'lucide-react';

const Supplements = ({ 
  formData, 
  handleSupplementToggle,
  showSupplements,
  setShowSupplements,
  supplements 
}) => {
  return (
    <div className="space-y-6">
    {/* Header Section */}
    <div className="text-center mb-8">
      <div className="inline-block p-3 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 mb-4">
        <Trophy className="w-8 h-8 text-purple-400" />
      </div>
      <h3 className="text-xl font-bold text-white">Would you like to include supplements?</h3>
      <p className="text-gray-400 mt-2">This step is optional and can help support your fitness goals</p>
    </div>

    {/* Yes/No Selection */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto mb-8">
      <button
        type="button"
        onClick={() => setShowSupplements(true)}
        className={`
          w-full p-4 rounded-xl text-center transition-all duration-300
          ${showSupplements 
            ? 'bg-gradient-to-r from-green-500/20 to-teal-500/20 transform scale-[1.02] border-2 border-green-500/50' 
            : 'bg-gray-800 hover:bg-gray-700 hover:scale-[1.02] border-2 border-transparent'}
        `}
      >
        <span className="text-2xl mb-2 block">👍</span>
        <span className="font-medium text-white">Yes, I'm interested</span>
      </button>

      <button
        type="button"
        onClick={() => {
          setShowSupplements(false);
          setFormData(prev => ({ ...prev, supplements: [] }));
        }}
        className={`
          w-full p-4 rounded-xl text-center transition-all duration-300
          ${showSupplements === false 
            ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 transform scale-[1.02] border-2 border-purple-500/50' 
            : 'bg-gray-800 hover:bg-gray-700 hover:scale-[1.02] border-2 border-transparent'}
        `}
      >
        <span className="text-2xl mb-2 block">👎</span>
        <span className="font-medium text-white">No, skip this step</span>
      </button>
    </div>

    {/* Show supplements selection only if user clicked Yes */}
    {showSupplements && (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {supplements.map(supplement => (
        <button
          key={supplement.id}
          type="button"
          onClick={() => handleSupplementToggle(supplement.id)}
          className={`
            w-full p-6 rounded-xl text-left transition-all duration-300 relative
            ${formData.supplements.includes(supplement.id)
              ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 transform scale-[1.02] border-2 border-purple-500/50'
              : 'bg-gray-800 hover:bg-gray-700 hover:scale-[1.02] border-2 border-transparent'}
          `}
        >
          {/* Selection Indicator */}
          <div className="absolute top-4 right-4">
            <div className={`
              w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300
              ${formData.supplements.includes(supplement.id)
                ? 'border-purple-500 bg-purple-500'
                : 'border-gray-500'}
            `}>
              {formData.supplements.includes(supplement.id) && (
                <Check className="w-4 h-4 text-white" />
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex items-start space-x-4">
            <div className={`
              p-3 rounded-xl transition-all duration-300
              ${formData.supplements.includes(supplement.id)
                ? 'bg-purple-500/20'
                : 'bg-gray-700/50'}
            `}>
              <span className="text-2xl">{supplement.icon}</span>
            </div>

            <div className="flex-1">
              <h4 className="text-lg font-semibold text-white mb-1">{supplement.label}</h4>
              <p className="text-sm text-gray-300">{supplement.description}</p>

              {/* Selected State Info */}
              {formData.supplements.includes(supplement.id) && (
                <div className="mt-3 p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <div className="flex items-center text-sm text-purple-300">
                    <Check className="w-4 h-4 mr-2" />
                    <span>Added to your plan</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>

    {/* Info Box */}
    <div className="mt-6 p-4 rounded-lg bg-gray-800/50 border border-gray-700">
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-lg bg-yellow-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h5 className="text-sm font-medium text-white mb-1">Important Note</h5>
              <p className="text-sm text-gray-400">
                Supplements are optional and should complement a balanced diet. Always consult with a healthcare professional before starting any supplement regimen.
              </p>
            </div>
          </div>
        </div>
      </>
    )}
  </div>
  );
};

export default Supplements;