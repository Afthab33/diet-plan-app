import { Weight, Activity, Target, Apple, Trophy } from 'lucide-react';
export const activityLevels = [
    { 
      id: 'sedentary', 
      label: 'Sedentary',
      description: 'Little to no exercise, desk job',
      icon: '🛋️',
      color: 'from-blue-400/20 to-blue-500/20',
    },
    { 
      id: 'light', 
      label: 'Light',
      description: 'Light exercise 1-3 days/week',
      icon: '🚶',
      color: 'from-green-400/20 to-green-500/20',
      factor: 1.375
    },
    { 
      id: 'moderate', 
      label: 'Moderate',
      description: 'Exercise 3-5 days/week',
      icon: '🏃',
      color: 'from-yellow-400/20 to-yellow-500/20',
      factor: 1.55
    },
    { 
      id: 'active', 
      label: 'Active',
      description: 'Hard exercise 6-7 days/week',
      icon: '🏋️',
      color: 'from-orange-400/20 to-orange-500/20',
      factor: 1.725
    },
    { 
      id: 'very_active', 
      label: 'Very Active',
      description: 'Intense daily exercise or physical job',
      icon: '⚡',
      color: 'from-red-400/20 to-red-500/20',
      factor: 1.9
    }
  ];

export const goals = [
    { 
      id: 'fat_loss',
      label: 'Fat Loss',
      description: 'Reduce body fat while maintaining muscle',
      icon: '🔥',
      color: 'from-red-400/20 to-red-500/20',
    },
    { 
      id: 'muscle_gain',
      label: 'Muscle Gain',
      description: 'Build muscle mass and strength',
      icon: '💪',
      color: 'from-blue-400/20 to-blue-500/20',
      adjustment: 500
    },
    { 
      id: 'maintenance',
      label: 'Maintenance',
      description: 'Maintain current weight and composition',
      icon: '⚖️',
      color: 'from-green-400/20 to-green-500/20',
      adjustment: 0
    },
    { 
      id: 'recomp',
      label: 'Body Recomposition',
      description: 'Lose fat and gain muscle simultaneously',
      icon: '🎯',
      color: 'from-purple-400/20 to-purple-500/20',
      adjustment: 0
    }
  ];

export const dietTypes = [
    {
      id: 'vegetarian',
      label: 'Vegetarian',
      icon: '🥗',
      description: 'Plant-based with dairy and eggs',
      color: 'from-green-400/20 to-green-500/20'
    },
    {
      id: 'non-veg',
      label: 'Non-Vegetarian',
      icon: '🍖',
      description: 'Includes all food groups',
      color: 'from-red-400/20 to-red-500/20'
    },
    {
      id: 'vegan',
      label: 'Vegan',
      icon: '🌱',
      description: '100% plant-based diet',
      color: 'from-green-500/20 to-green-600/20'
    },
    {
      id: 'mediterranean',
      label: 'Mediterranean',
      icon: '🫒',
      description: 'Rich in vegetables, fruits, whole grains, and healthy fats',
      color: 'from-blue-400/20 to-blue-500/20'
    },
    {
      id: 'keto',
      label: 'Ketogenic',
      icon: '🥑',
      description: 'High-fat, low-carb diet',
      color: 'from-purple-400/20 to-purple-500/20'
    },
    {
      id: 'paleo',
      label: 'Paleo',
      icon: '🥩',
      description: 'Based on foods similar to what hunter-gatherers ate',
      color: 'from-orange-400/20 to-orange-500/20'
    },
    {
      id: 'pescatarian',
      label: 'Pescatarian',
      icon: '🐟',
      description: 'Vegetarian diet that includes seafood',
      color: 'from-cyan-400/20 to-cyan-500/20'
    },
    {
      id: 'gluten_free',
      label: 'Gluten-Free',
      icon: '🌾',
      description: 'Excludes gluten-containing foods',
      color: 'from-yellow-400/20 to-yellow-500/20'
    }
  ];

export const cuisines = [
    { id: 'indian', label: 'Indian', icon: '🇮🇳' },
    { id: 'korean', label: 'Korean', icon: '🇰🇷' },
    { id: 'chinese', label: 'Chinese', icon: '🇨🇳' },
    { id: 'american', label: 'American', icon: '🍔' },
    { id: 'japanese', label: 'Japanese', icon: '🇯🇵' },
    { id: 'italian', label: 'Italian', icon: '🍝' },
    { id: 'mexican', label: 'Mexican', icon: '🌮' },
    { id: 'mediterranean', label: 'Mediterranean', icon: '🫒' },
    { id: 'thai', label: 'Thai', icon: '🇹🇭' },
    { id: 'vietnamese', label: 'Vietnamese', icon: '🇻🇳' },
    { id: 'french', label: 'French', icon: '🇫🇷' },
    { id: 'greek', label: 'Greek', icon: '🇬🇷' },
    { id: 'middle_eastern', label: 'Middle Eastern', icon: '🫓' },
    { id: 'spanish', label: 'Spanish', icon: '🇪🇸' },
    { id: 'caribbean', label: 'Caribbean', icon: '🌴' }
  ];

export const supplements = [
    { 
      id: 'whey', 
      label: 'Whey Protein',
      description: 'Fast-absorbing protein for recovery',
      icon: '🥛'
    },
    { 
      id: 'creatine',
      label: 'Creatine',
      description: 'Enhances strength and muscle growth',
      icon: '💪'
    },
    { 
      id: 'omega3',
      label: 'Omega-3',
      description: 'Essential fatty acids for health',
      icon: '🐟'
    },
    { 
      id: 'vitamins',
      label: 'Multivitamins',
      description: 'General health support',
      icon: '💊'
    }
  ];

export const formSteps = [
    {
      title: 'Basic Info',
      icon: Weight,
      fields: ['gender','age', 'weight', 'height_feet', 'height_inches'],
      description: 'Let\'s start with your basic information'
    },
    {
      title: 'Activity Level',
      icon: Activity,
      fields: ['activity_level'],
      description: 'Tell us about your activity level'
    },
    {
      title: 'Goals',
      icon: Target,
      fields: ['goal'],
      description: 'What do you want to achieve?'
    },
    {
      title: 'Diet Preferences',
      icon: Apple,
      fields: ['diet_type', 'cuisine', 'meals_per_day'],
      description: 'Your dietary preferences'
    },
    {
      title: 'Supplements',
      icon: Trophy,
      fields: ['supplements'],
      description: 'Optional supplements to support your goals'
    }
  ];

export const mealsPerDay = [
  {
    value: '3',
    label: '3 Meals',
    icon: '🍽️',
    description: 'Traditional meal schedule',
    timing: 'Breakfast, Lunch, Dinner'
  },
  {
    value: '4',
    label: '4 Meals',
    icon: '🥪',
    description: 'Includes afternoon snack',
    timing: 'Breakfast, Lunch, Snack, Dinner'
  },
  {
    value: '5',
    label: '5 Meals',
    icon: '🥗',
    description: 'With morning & afternoon snacks',
    timing: 'Breakfast, AM Snack, Lunch, PM Snack, Dinner'
  },
  {
    value: '6',
    label: '6 Meals',
    icon: '🍱',
    description: 'Frequent smaller portions',
    timing: 'Every 2-3 hours throughout the day'
  }
];

export const foodRestrictions = [
  { 
    id: 'pork', 
    label: 'No Pork', 
    icon: '🐷', 
    description: 'Exclude all pork and pork products',
    details: 'Includes bacon, ham, and other pork derivatives'
  },
  { 
    id: 'beef', 
    label: 'No Beef', 
    icon: '🐮', 
    description: 'Exclude all beef and beef products',
    details: 'Includes steak, ground beef, and beef-based ingredients'
  },
  { 
    id: 'lamb', 
    label: 'No Lamb', 
    icon: '🐑', 
    description: 'Exclude lamb and mutton',
    details: 'All cuts of lamb and mutton meat'
  },
  { 
    id: 'chicken', 
    label: 'No Chicken', 
    icon: '🍗', 
    description: 'Exclude chicken and poultry',
    details: 'Includes chicken, turkey, and other poultry products'
  }
];

export const foodAllergies = [
  { 
    id: 'peanuts', 
    label: 'Peanuts', 
    icon: '🥜', 
    description: 'Allergy to peanuts and peanut derivatives',
    details: 'Including peanut oil, peanut flour, and traces in sauces'
  },
  { 
    id: 'tree_nuts', 
    label: 'Tree Nuts', 
    icon: '🌰', 
    description: 'Almonds, walnuts, cashews, pecans, etc.',
    details: 'Including nut oils, extracts, and traces in desserts'
  },
  { 
    id: 'eggs', 
    label: 'Eggs', 
    icon: '🥚', 
    description: 'Eggs and egg-based products',
    details: 'Including mayonnaise, baked goods, and egg derivatives'
  },
  { 
    id: 'dairy', 
    label: 'Dairy', 
    icon: '🥛', 
    description: 'Milk and all dairy products',
    details: 'Including cheese, yogurt, cream, and milk proteins'
  },
  { 
    id: 'soy', 
    label: 'Soy', 
    icon: '🫘', 
    description: 'Soybeans and soy-based products',
    details: 'Including tofu, soy sauce, and soy lecithin'
  },
  { 
    id: 'wheat', 
    label: 'Wheat/Gluten', 
    icon: '🌾', 
    description: 'Wheat and gluten-containing grains',
    details: 'Including bread, pasta, and many processed foods'
  },
  { 
    id: 'fish', 
    label: 'Fish', 
    icon: '🐟', 
    description: 'All types of fish',
    details: 'Including fish sauce, fish oil, and seafood flavoring'
  },
  { 
    id: 'shellfish', 
    label: 'Shellfish', 
    icon: '🦐', 
    description: 'Shrimp, crab, lobster, etc.',
    details: 'Including shellfish extracts and seafood flavorings'
  },
  { 
    id: 'sesame', 
    label: 'Sesame', 
    icon: '🫘', 
    description: 'Sesame seeds and sesame products',
    details: 'Including tahini, oils, and traces in Asian cuisine'
  }
];
