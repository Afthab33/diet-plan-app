const supplementMacros = {
    whey: { calories: 120, protein: 25, carbs: 3, fats: 1 },
    creatine: { calories: 0, protein: 0, carbs: 0, fats: 0 },
    omega3: { calories: 20, protein: 0, carbs: 0, fats: 2 },
    multivitamin: { calories: 0, protein: 0, carbs: 0, fats: 0 }
  };
  
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9
  };
  
  const goalAdjustments = {
    fat_loss: -500,
    muscle_gain: (tdee) => tdee * 0.15,
    maintenance: 0,
    body_recomposition: -200
  };
  
  const proteinFactors = {
    fat_loss: 2.0,
    muscle_gain: 2.2,
    maintenance: 1.6,
    body_recomposition: 2.5
  };
  
  const mealDistributionRatios = {
    3: [0.33, 0.33, 0.34],
    4: [0.25, 0.25, 0.25, 0.25],
    5: [0.2, 0.2, 0.2, 0.2, 0.2],
    6: [0.17, 0.17, 0.17, 0.17, 0.16, 0.16]
  };
  
  export const calculateNutrition = (input) => {
    const genderConstant = input.gender.toLowerCase() === "male" ? 5 : -161;
    const bmr = (10 * input.weight) + (6.25 * input.height) - (5 * input.age) + genderConstant;
  
    const tdee = bmr * (activityMultipliers[input.activityLevel.toLowerCase()] || 1.2);
  
    const goalAdjustment = typeof goalAdjustments[input.goal.toLowerCase()] === 'function'
      ? goalAdjustments[input.goal.toLowerCase()](tdee)
      : goalAdjustments[input.goal.toLowerCase()] || 0;
    
    const totalCalories = tdee + goalAdjustment;
  
    const proteinMultiplier = proteinFactors[input.goal.toLowerCase()] || 1.6;
    const protein = proteinMultiplier * input.weight;
    const proteinCalories = protein * 4;
  
    const fatCalories = totalCalories * 0.25;
    const fats = fatCalories / 9;
  
    const carbCalories = totalCalories - (proteinCalories + fatCalories);
    const carbs = carbCalories / 4;
  
    // Calculate macros percentages from the total (including supplements)
    const macroPercentages = {
      protein: Math.round((proteinCalories / totalCalories) * 100),
      carbs: Math.round((carbCalories / totalCalories) * 100),
      fats: Math.round((fatCalories / totalCalories) * 100)
    };
  
    // For display to user, use total values including supplements
    const displayValues = {
      calories: Math.round(totalCalories),
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fats: Math.round(fats)
    };
  
    // For backend API, subtract supplement values
    const { adjustedCalories, adjustedProtein, adjustedCarbs, adjustedFats } = 
      adjustForSupplements(totalCalories, protein, carbs, fats, input.supplements);
  
    // Distribute meals based on adjusted values (for backend)
    const mealDistribution = distributeMacros(
      adjustedCalories,
      adjustedProtein,
      adjustedCarbs,
      adjustedFats,
      input.mealsPerDay
    );
  
    return {
      // Values for display (including supplements)
      ...displayValues,
      macroPercentages,
      // Store adjusted values to be used when generating API payload
      backendValues: {
        calories: Math.round(adjustedCalories),
        protein: Math.round(adjustedProtein),
        carbs: Math.round(adjustedCarbs),
        fats: Math.round(adjustedFats)
      },
      mealDistribution,
      calculations: {
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        goalAdjustment: Math.round(goalAdjustment),
        proteinCalculation: {
          multiplier: proteinMultiplier,
          total: Math.round(protein)  // Use unadjusted protein for display
        }
      }
    };
  };
  
  const adjustForSupplements = (calories, protein, carbs, fats, supplements) => {
    let adjustedCalories = calories;
    let adjustedProtein = protein;
    let adjustedCarbs = carbs;
    let adjustedFats = fats;
  
    supplements.forEach(supplement => {
      if (supplementMacros[supplement]) {
        adjustedCalories -= supplementMacros[supplement].calories;
        adjustedProtein -= supplementMacros[supplement].protein;
        adjustedCarbs -= supplementMacros[supplement].carbs;
        adjustedFats -= supplementMacros[supplement].fats;
      }
    });
  
    return { adjustedCalories, adjustedProtein, adjustedCarbs, adjustedFats };
  };
  
  const distributeMacros = (calories, protein, carbs, fats, mealsPerDay) => {
    const ratios = mealDistributionRatios[mealsPerDay] || 
      Array(mealsPerDay).fill(1 / mealsPerDay);
  
    return ratios.map((ratio, index) => ({
      meal_number: index + 1,
      calories: Math.round(calories * ratio),
      protein: Math.round(protein * ratio),
      carbs: Math.round(carbs * ratio),
      fats: Math.round(fats * ratio)
    }));
  };
  
  export const generateApiPayload = (nutritionData, formData) => ({
    // Use the adjusted backend values for the API
    calories: nutritionData.backendValues.calories,
    protein: nutritionData.backendValues.protein,
    carbs: nutritionData.backendValues.carbs,
    fats: nutritionData.backendValues.fats,
    meals_per_day: Number(formData.meals_per_day),
    diet_type: formData.diet_type,
    cuisines: formData.cuisines,
    food_restrictions: formData.foodRestrictions,
  });
  