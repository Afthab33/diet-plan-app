import React from 'react';
import { Check, User} from 'lucide-react';

const BasicInfo = ({ 
  formData, 
  fieldErrors, 
  handleInputChange, 
  weightUnit, 
  setWeightUnit, 
  convertWeight,
  heightUnit,
  setHeightUnit,
  convertHeight,
  displayWeight,
  setDisplayWeight 
}) => {
  return (
    <div className="space-y-6">
    {/* Gender Selection Card */}
    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 backdrop-blur-xl border border-gray-700/50">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
        
        <div className="relative z-10 space-y-4">
          {/* Header */}
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-indigo-500/20">
              <User className="h-5 w-5 text-indigo-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">Gender</label>
              <p className="text-xs text-gray-400">Select your gender for accurate calculations</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { 
                id: 'male', 
                label: 'Male',
                icon: '👨',
                gradient: 'from-blue-500/20 to-indigo-500/20',
                hoverGradient: 'hover:from-blue-500/30 hover:to-indigo-500/30',
                activeColor: 'blue'
              },
              { 
                id: 'female', 
                label: 'Female',
                icon: '👩',
                gradient: 'from-pink-500/20 to-purple-500/20',
                hoverGradient: 'hover:from-pink-500/30 hover:to-purple-500/30',
                activeColor: 'pink'
              }
            ].map((gender) => (
              <button
                key={gender.id}
                onClick={() => handleInputChange('gender', gender.id)}
                className={`
                  relative group/button overflow-hidden rounded-xl p-6
                  transition-all duration-300 hover:scale-[1.02]
                  ${formData.gender === gender.id 
                    ? `bg-gradient-to-br ${gender.gradient} ring-2 ring-${gender.activeColor}-500` 
                    : `bg-gray-700/50 ${gender.hoverGradient}`}
                `}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover/button:opacity-100 transition-all duration-300" />
                
                <div className="relative z-10 flex flex-col items-center space-y-3">
                  <div className={`
                    p-3 rounded-full 
                    ${formData.gender === gender.id 
                      ? `bg-${gender.activeColor}-500/20` 
                      : 'bg-gray-600/50'}
                    transition-all duration-300
                    group-hover/button:scale-110
                  `}>
                    <span className="text-4xl transform transition-transform duration-300 group-hover/button:scale-110">
                      {gender.icon}
                    </span>
                  </div>
                  
                  <span className={`
                    font-medium text-base
                    ${formData.gender === gender.id 
                      ? 'text-white' 
                      : 'text-gray-400'}
                    transition-colors duration-300
                  `}>
                    {gender.label}
                  </span>
                </div>

                {formData.gender === gender.id && (
                  <div className="absolute top-3 right-3">
                    <div className={`
                      p-1 rounded-full bg-${gender.activeColor}-500/20
                    `}>
                      <Check className={`w-4 h-4 text-${gender.activeColor}-400`} />
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Error Message */}
          {fieldErrors.gender && (
            <div className="flex items-center space-x-2 text-red-400 text-sm mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{fieldErrors.gender}</span>
            </div>
          )}
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
            if (displayWeight) {
              const newValue = weightUnit === 'kg' && unit === 'lbs' 
                ? (parseFloat(displayWeight) * 2.20462).toFixed(1)
                : weightUnit === 'lbs' && unit === 'kg'
                ? (parseFloat(displayWeight) / 2.20462).toFixed(1)
                : displayWeight;
              setDisplayWeight(newValue);
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
        type="text"
        value={displayWeight}
        onChange={(e) => {
          const value = e.target.value;
          if (!/^\d*\.?\d*$/.test(value)) return;
          setDisplayWeight(value);
          handleInputChange('weight', value);
        }}
        placeholder={`Enter weight in ${weightUnit}`}
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
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-lg bg-cyan-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7l4-4m0 0l4 4m-4-4v18" />
          </svg>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200">Height</label>
          <p className="text-xs text-gray-400">Enter your height</p>
        </div>
      </div>

      {/* Unit Toggle */}
      <div className="flex items-center bg-gray-700/50 rounded-lg p-1">
        {[
          { value: 'ft', label: 'FT' },
          { value: 'cm', label: 'CM' }
        ].map((unit) => (
          <button
            key={unit.value}
            onClick={() => {
              if (heightUnit === 'ft' && unit.value === 'cm' && formData.height_feet) {
                const cm = convertHeight.feetToCm(formData.height_feet, formData.height_inches);
                handleInputChange('height_cm', cm.toString());
              } else if (heightUnit === 'cm' && unit.value === 'ft' && formData.height_cm) {
                const { feet, inches } = convertHeight.cmToFeet(formData.height_cm);
                handleInputChange('height_feet', feet.toString());
                handleInputChange('height_inches', inches.toString());
              }
              setHeightUnit(unit.value);
            }}
            className={`
              px-3 py-1 rounded-md text-sm font-medium transition-all duration-300
              ${heightUnit === unit.value 
                ? 'bg-cyan-500/20 text-cyan-400' 
                : 'text-gray-400 hover:text-white'}
            `}
          >
            {unit.label}
          </button>
        ))}
      </div>
    </div>

    {heightUnit === 'ft' ? (
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
        {fieldErrors.height_feet && (
          <span className="text-xs text-red-400">{fieldErrors.height_feet}</span>
        )}
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
        {fieldErrors.height_inches && (
          <span className="text-xs text-red-400">{fieldErrors.height_inches}</span>
        )}
      </div>

      <div className="col-span-2 flex justify-between text-xs text-gray-400">
        <span>Range: 3'0" - 8'11"</span>
      </div>
    </div>
    ) : (
      <div className="space-y-2">
        <input
          type="number"
          step="0.1"
          value={formData.height_cm}
          onChange={(e) => handleInputChange('height_cm', e.target.value)}
          placeholder="Enter height in cm"
          min="91"
          max="243"
          className={`
            w-full px-4 py-3 rounded-xl bg-gray-700/50 border-2 
            focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent 
            text-gray-100 transition-all duration-300
            ${fieldErrors.height_cm ? 'border-red-500 animate-shake' : 'border-gray-600'}
          `}
        />
        <div className="flex justify-between text-xs">
          <span className="text-gray-400">Range: 91-243 cm</span>
          {fieldErrors.height_cm && (
            <span className="text-red-400">{fieldErrors.height_cm}</span>
          )}
        </div>
      </div>
    )}
  </div>
</div>
  </div>
  );
};

export default BasicInfo;

