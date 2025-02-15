import { Routes, Route } from 'react-router-dom';
import AppWrapper from './components/AppWrapper';
import NutritionLearningCenter from './components/NutritionLearningCenter';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppWrapper />} />
      <Route path="/nutrition-guide" element={<NutritionLearningCenter />} />
    </Routes>
  );
}

export default App;