import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Download, 
  RefreshCcw, 
  Mail, 
  Calendar,
  Printer,
  Share2,
  AlertCircle
} from 'lucide-react';

const PlanActions = ({ onReset }) => {
  const [email, setEmail] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const handleDownload = () => {
    window.print();
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send this to your backend
    setEmailSubmitted(true);
    setTimeout(() => {
      setShowEmailInput(false);
      setEmailSubmitted(false);
      setEmail('');
    }, 3000);
  };

  return (
    <section className="space-y-6 mt-8">
      <Card className="bg-gray-800/50 border-gray-700/50">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Download and Print Options */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Save Your Plan</h3>
              
              <button
                onClick={handleDownload}
                className="w-full flex items-center justify-center space-x-2 p-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200"
              >
                <Download className="w-5 h-5" />
                <span>Download PDF</span>
              </button>
              
              <button
                onClick={handleDownload}
                className="w-full flex items-center justify-center space-x-2 p-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors duration-200"
              >
                <Printer className="w-5 h-5" />
                <span>Print Plan</span>
              </button>

              <button
                className="w-full flex items-center justify-center space-x-2 p-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors duration-200"
              >
                <Share2 className="w-5 h-5" />
                <span>Share Plan</span>
              </button>
            </div>

            {/* Future Plans Feature */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Coming Soon</h3>
              
              <div className="p-4 rounded-lg bg-gray-700/30">
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-purple-400 mt-1" />
                  <div>
                    <h4 className="text-white font-medium">Weekly & Monthly Plans</h4>
                    <p className="text-sm text-gray-400 mt-1">
                      Get notified when we launch extended meal planning features
                    </p>
                    
                    {!emailSubmitted ? (
                      <button
                        onClick={() => setShowEmailInput(true)}
                        className="mt-3 text-sm text-purple-400 hover:text-purple-300 transition-colors duration-200"
                      >
                        Join waitlist →
                      </button>
                    ) : (
                      <div className="mt-3 flex items-center space-x-2 text-green-400">
                        <Check className="w-4 h-4" />
                        <span className="text-sm">You're on the list!</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {showEmailInput && !emailSubmitted && (
                <form onSubmit={handleEmailSubmit} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center space-x-2 p-3 rounded-lg bg-purple-500 hover:bg-purple-600 text-white transition-colors duration-200"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Notify Me</span>
                  </button>
                </form>
              )}

              <button
                onClick={onReset}
                className="w-full flex items-center justify-center space-x-2 p-3 rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white transition-all duration-200"
              >
                <RefreshCcw className="w-5 h-5" />
                <span>Generate New Plan</span>
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <div className="flex items-start space-x-3 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
        <AlertCircle className="w-5 h-5 text-yellow-400 mt-1" />
        <p className="text-sm text-gray-300">
          This meal plan is generated based on general guidelines and calculations. 
          Always consult with a healthcare provider or registered dietitian before starting any new diet plan, 
          especially if you have any health conditions or specific dietary requirements.
        </p>
      </div>
    </section>
  );
};

export default PlanActions;