import { Routes, Route } from 'react-router-dom';
import AppWrapper from './components/AppWrapper';
import NutritionLearningCenter from './components/NutritionLearningCenter';
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
  <>
    <Routes>
      <Route path="/" element={<AppWrapper />} />
      <Route path="/nutrition-guide" element={<NutritionLearningCenter />} />
    </Routes>
    <Analytics />
  </> 
  );
}

export default App;