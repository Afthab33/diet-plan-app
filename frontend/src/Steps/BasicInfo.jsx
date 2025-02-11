import React from 'react';
import { Check } from 'lucide-react';

const BasicInfo = ({ 
  formData, 
  fieldErrors, 
  handleInputChange, 
  weightUnit, 
  setWeightUnit, 
  convertWeight 
}) => {
  return (
    <div className="space-y-6">
    {/* Gender Selection Card */}
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 backdrop-blur-xl border border-gray-700/50">
      <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
      
      <div className="relative z-10 space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Gender</h3>
            <p className="text-sm text-gray-400">Select your gender for personalized recommendations</p>
          </div>
        </div>

        {/* Gender Buttons */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { id: 'male', icon: '👨', label: 'Male', gradient: 'from-blue-500/20 to-blue-600/20', hoverGradient: 'hover:from-blue-500/30 hover:to-blue-600/30' },
            { id: 'female', icon: '👩', label: 'Female', gradient: 'from-pink-500/20 to-purple-500/20', hoverGradient: 'hover:from-pink-500/30 hover:to-purple-500/30' }
          ].map((gender) => (
            <button
              key={gender.id}
              onClick={() => handleInputChange('gender', gender.id)}
              className={`
                relative group/button overflow-hidden rounded-xl p-5 transition-all duration-300 hover:scale-[1.02]
                ${formData.gender === gender.id 
                  ? `bg-gradient-to-br ${gender.gradient} ring-2 ring-${gender.id === 'male' ? 'blue' : 'pink'}-500/50` 
                  : `bg-gray-800/50 ${gender.hoverGradient}`}
              `}
            >
              <div className="relative z-10 flex flex-col items-center space-y-3">
                <span className="text-4xl transform transition-transform duration-300 group-hover/button:scale-110">
                  {gender.icon}
                </span>
                <span className="font-medium text-white">{gender.label}</span>
              </div>
              {formData.gender === gender.id && (
                <div className="absolute top-2 right-2 flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  <span className="text-xs text-blue-400">Selected</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>

    {/* Personal Details Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Age Input */}
      <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 backdrop-blur-xl border border-gray-700/50">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
        
        <div className="relative z-10 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-amber-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">Age</label>
              <p className="text-xs text-gray-400">Enter your current age</p>
            </div>
          </div>

          <div className="space-y-2">
            <input
              type="number"
              value={formData.age}
              onChange={(e) => handleInputChange('age', e.target.value)}
              placeholder="Enter your age"
              min="13"
              max="120"
              className={`
                w-full px-4 py-3 rounded-xl bg-gray-700/50 border-2 
                focus:ring-2 focus:ring-amber-500/50 focus:border-transparent 
                text-gray-100 transition-all duration-300
                ${fieldErrors.age ? 'border-red-500 animate-shake' : 'border-gray-600'}
              `}
            />
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">Age range: 13-120 years</span>
              {fieldErrors.age && (
                <span className="text-red-400 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {fieldErrors.age}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Weight Input */}
      {/* Weight Input */}
<div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 backdrop-blur-xl border border-gray-700/50">
  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
  
  <div className="relative z-10 space-y-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-lg bg-emerald-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
          </svg>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200">Weight</label>
          <p className="text-xs text-gray-400">Enter your current weight</p>
        </div>
      </div>

      {/* Unit Toggle */}
      <div className="flex items-center bg-gray-700/50 rounded-lg p-1">
        {['kg', 'lbs'].map((unit) => (
          <button
            key={unit}
            onClick={() => {
              if (formData.weight) {
                // Convert the current weight to the new unit for display
                const converted = convertWeight(formData.weight, weightUnit, unit);
                setFormData(prev => ({
                  ...prev,
                  weight: converted
                }));
              }
              setWeightUnit(unit);
            }}
            className={`
              px-3 py-1 rounded-md text-sm font-medium transition-all duration-300
              ${weightUnit === unit 
                ? 'bg-emerald-500/20 text-emerald-400' 
                : 'text-gray-400 hover:text-white'}
            `}
          >
            {unit.toUpperCase()}
          </button>
        ))}
      </div>
    </div>

    <div className="space-y-2">
      <input
        type="number"
        value={weightUnit === 'lbs' ? convertWeight(formData.weight, 'kg', 'lbs') : formData.weight}
        onChange={(e) => handleInputChange('weight', e.target.value)}
        placeholder={`Enter weight in ${weightUnit}`}
        min={weightUnit === 'kg' ? "30" : "66"}
        max={weightUnit === 'kg' ? "300" : "660"}
        className={`
          w-full px-4 py-3 rounded-xl bg-gray-700/50 border-2 
          focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent 
          text-gray-100 transition-all duration-300
          ${fieldErrors.weight ? 'border-red-500 animate-shake' : 'border-gray-600'}
        `}
      />
      <div className="flex justify-between text-xs">
        <div className="space-x-3 text-gray-400">
          <span>Min: {weightUnit === 'kg' ? '30kg' : '66lbs'}</span>
          <span>Max: {weightUnit === 'kg' ? '300kg' : '660lbs'}</span>
        </div>
        {fieldErrors.weight && (
          <span className="text-red-400 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {fieldErrors.weight}
          </span>
        )}
      </div>
    </div>
  </div>
</div>
    </div>

    {/* Height Input */}
    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 backdrop-blur-xl border border-gray-700/50">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
      
      <div className="relative z-10 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-cyan-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7l4-4m0 0l4 4m-4-4v18" />
            </svg>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200">Height</label>
            <p className="text-xs text-gray-400">Enter your height in feet and inches</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Feet Input */}
          <div className="space-y-2">
            <input
              type="number"
              value={formData.height_feet}
              onChange={(e) => handleInputChange('height_feet', e.target.value)}
              placeholder="Feet"
              min="3"
              max="8"
              className={`
                w-full px-4 py-3 rounded-xl bg-gray-700/50 border-2 
                focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent 
                text-gray-100 transition-all duration-300
                ${fieldErrors.height_feet ? 'border-red-500 animate-shake' : 'border-gray-600'}
              `}
            />
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Range: 3-8 feet</span>
              {fieldErrors.height_feet && (
                <span className="text-red-400">{fieldErrors.height_feet}</span>
              )}
            </div>
          </div>

          {/* Inches Input */}
          <div className="space-y-2">
            <input
              type="number"
              value={formData.height_inches}
              onChange={(e) => handleInputChange('height_inches', e.target.value)}
              placeholder="Inches"
              min="0"
              max="11"
              className={`
                w-full px-4 py-3 rounded-xl bg-gray-700/50 border-2 
                focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent 
                text-gray-100 transition-all duration-300
                ${fieldErrors.height_inches ? 'border-red-500 animate-shake' : 'border-gray-600'}
              `}
            />
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Range: 0-11 inches</span>
              {fieldErrors.height_inches && (
                <span className="text-red-400">{fieldErrors.height_inches}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default BasicInfo;

