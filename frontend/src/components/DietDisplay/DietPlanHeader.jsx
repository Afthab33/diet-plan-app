import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Target, Activity, User, Calendar, 
  Apple, Heart, Scale, TrendingUp,
  Sparkles, ChevronRight
} from 'lucide-react';

const DietPlanHeader = ({ userInfo }) => {
  const formatActivityLevel = (level) => {
    return level.split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formatDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getBMI = () => {
    const heightInM = userInfo.height_cm ? userInfo.height_cm / 100 : 
      ((userInfo.height_feet * 30.48 + userInfo.height_inches * 2.54) / 100);
    const bmi = (userInfo.weight / (heightInM * heightInM)).toFixed(1);
    return bmi;
  };

  return (
    <div className="space-y-8">
      {/* Hero Section*/}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-500 via-teal-500 to-blue-500 p-8 md:p-12">
        <div className="absolute inset-0 bg-grid-white/10">
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
        
        {/* Floating Icons Animation */}
        <div className="absolute inset-0 overflow-hidden">
          {[Apple, Heart, Target, Scale].map((Icon, index) => (
            <div
              key={index}
              className="absolute opacity-10 animate-float"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${index * 0.5}s`
              }}
            >
              <Icon className="w-12 h-12 text-white" />
            </div>
          ))}
        </div>

        <div className="relative z-10">
          <div className="flex items-center space-x-2 text-teal-100 mb-4">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium tracking-wider uppercase">
              Personalized Nutrition Plan
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your Path to Better Health
          </h1>
          
          <p className="text-teal-100 text-lg max-w-2xl mb-6">
            We've crafted a comprehensive nutrition plan aligned with your goals and preferences. 
            Follow this plan consistently to achieve optimal results.
          </p>
          
          <div className="flex flex-wrap gap-4 text-white">
            <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{formatDate()}</span>
            </div>
            <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
              <TrendingUp className="w-4 h-4 mr-2" />
              <span>BMI: {getBMI()}</span>
            </div>
          </div>
        </div>
      </div>

      {/*Info Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/50 overflow-hidden group hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-teal-500/20 group-hover:from-green-500/30 group-hover:to-teal-500/30 transition-all duration-300">
                <User className="w-6 h-6 text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center justify-between">
                  Profile
                </h3>
                <div className="space-y-2">
                  <ProfileDetail label="Age" value={`${userInfo.age} years`} />
                  <ProfileDetail label="Weight" value={`${userInfo.weight} kg`} />
                  <ProfileDetail 
                    label="Height" 
                    value={userInfo.height_cm ? 
                      `${userInfo.height_cm} cm` : 
                      `${userInfo.height_feet}'${userInfo.height_inches}"`
                    } 
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Level Card */}
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/50 overflow-hidden group hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                <Activity className="w-6 h-6 text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center justify-between">
                  Activity Level
                </h3>
                <div className="space-y-2">
                  <div className="text-gray-100 font-medium">
                    {formatActivityLevel(userInfo.activity_level)}
                  </div>
                  <p className="text-sm text-gray-400">
                    {getActivityDescription(userInfo.activity_level)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Goal Card */}
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/50 overflow-hidden group hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300">
                <Target className="w-6 h-6 text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center justify-between">
                  Your Goal
                </h3>
                <div className="space-y-2">
                  <div className="text-gray-100 font-medium">
                    {userInfo.goal.split('_').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </div>
                  <p className="text-sm text-gray-400">
                    {getGoalDescription(userInfo.goal)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

const ProfileDetail = ({ label, value }) => (
  <div className="flex items-center justify-between">
    <span className="text-gray-400">{label}</span>
    <span className="text-gray-100 font-medium">{value}</span>
  </div>
);

const getActivityDescription = (level) => {
  const descriptions = {
    sedentary: "Little to no regular exercise, desk job",
    light: "Light exercise 1-3 times/week, mostly sedentary",
    moderate: "Moderate exercise 3-5 times/week, active job",
    active: "Active exercise 5-7 times/week, very active job",
    very_active: "Intense exercise/sports & physical job daily"
  };
  return descriptions[level] || "";
};

const getGoalDescription = (goal) => {
  const descriptions = {
    fat_loss: "Strategic caloric deficit while preserving lean muscle mass",
    muscle_gain: "Progressive overload with optimal protein intake for growth",
    maintenance: "Balanced nutrition to maintain current body composition",
    body_recomposition: "Simultaneous fat reduction and muscle development"
  };
  return descriptions[goal] || "";
};

export default DietPlanHeader;