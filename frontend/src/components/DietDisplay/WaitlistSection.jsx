import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Calendar,
  ChevronRight, 
  Bell,
  Sparkles,
  ArrowRight,
  Target,
  BarChart3
} from 'lucide-react';

const WaitlistSection = () => {
  const handleJoinWaitlist = () => {
    window.open('https://forms.gle/aUC39e7sMsDZJcKr6', '_blank');
  };

  const upcomingFeatures = [
    {
      title: "Weekly Meal Plans",
      description: "Plan your entire week with balanced, diverse meals tailored to your preferences",
      icon: Calendar,
      gradient: "from-blue-500/20 to-purple-500/20",
      iconColor: "text-blue-400"
    },
    {
      title: "Monthly Progress Tracking",
      description: "Track your nutrition journey with detailed analytics and progress reports",
      icon: BarChart3,
      gradient: "from-green-500/20 to-emerald-500/20",
      iconColor: "text-green-400"
    },
    {
      title: "Goal-based Modifications",
      description: "Automatically adjust your meal plans as your fitness goals evolve",
      icon: Target,
      gradient: "from-orange-500/20 to-red-500/20",
      iconColor: "text-orange-400"
    }
  ];

  return (
    <section className="space-y-6 mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Upcoming Features</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <Bell className="w-4 h-4" />
          <span>Join Waitlist</span>
        </div>
      </div>

      <Card className="bg-gray-800/50 border-gray-700/50">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {upcomingFeatures.map((feature, index) => (
              <div 
                key={index}
                className="rounded-xl bg-gray-900/50 border border-gray-700/50 overflow-hidden transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="p-6">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4`}>
                    <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center text-center px-4 py-6 bg-gray-900/50 rounded-xl border border-gray-700/50">
            <Sparkles className="w-8 h-8 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">
              Be First to Know
            </h3>
            <p className="text-gray-400 max-w-2xl mb-6">
              We're expanding our features to provide you with more comprehensive nutrition planning tools. 
              Join our waitlist to get early access and special offers when we launch new features!
            </p>
            
            <button
              onClick={handleJoinWaitlist}
              className="group flex items-center space-x-2 px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-all duration-300"
            >
              <span>Join the Waitlist</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default WaitlistSection;