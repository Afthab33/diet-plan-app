import React from 'react';
import DietPlanHeader from './DietPlanHeader';
import NutritionOverview from './NutritionOverview';
import MealPlanSection from './MealPlanSection';
import SupplementPlanSection from './SupplementPlanSection';
import HydrationSection from './HydrationSupplements';
import WaitlistSection from './WaitlistSection';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronUp, Download, RefreshCcw } from 'lucide-react';
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

const DietPlanDisplay = ({ dietPlan, formData, setFormData, userInfo, onReset }) => {
  const generatePDF = async () => {
    const content = document.getElementById('diet-plan-content');
    if (!content) return;

    try {
      const canvas = await html2canvas(content, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#111827'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('diet-plan.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const userInfoWithCalculations = {
    ...formData,
    nutritionCalc: {
      ...dietPlan.daily_summary,
      calculations: dietPlan.daily_summary.calculations
    }
  };

  return (
    <div className="min-h-screen">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 p-3 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition-all duration-300 z-50"
      >
        <ChevronUp className="w-6 h-6" />
      </button>

      <div id="diet-plan-content" className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-6xl">
        {/* Header Section */}
        <DietPlanHeader userInfo={userInfoWithCalculations} />

        {/* Nutrition Overview */}
        <NutritionOverview 
          calories={dietPlan.daily_summary.calories}
          protein={dietPlan.daily_summary.protein}
          carbs={dietPlan.daily_summary.carbs}
          fats={dietPlan.daily_summary.fats}
          userInfo={userInfo}
        />

        {/* Meal Plan */}
        <MealPlanSection mealPlan={dietPlan.meal_plan} />

        {/* Supplements Section*/}
        <SupplementPlanSection supplements={formData.supplements || []} />

        {/* Hydration Section*/}
        <HydrationSection 
          weight={formData.weight}
          activityLevel={formData.activity_level}
        />

        {/* Actions Card */}
        <Card className="bg-gray-800/50 border-gray-700/50 mt-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-end space-x-4">
              <button
                onClick={generatePDF}
                className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200"
              >
                <Download className="w-5 h-5" />
                <span>Download Plan</span>
              </button>
              <button
                onClick={onReset}
                className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white transition-all duration-200"
              >
                <RefreshCcw className="w-5 h-5" />
                <span>Generate New Plan</span>
              </button>
            </div>
          </CardContent>
        </Card>
        <WaitlistSection />
      </div>
    </div>
  );
};

export default DietPlanDisplay;