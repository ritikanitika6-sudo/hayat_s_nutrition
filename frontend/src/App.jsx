import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import NavigationDrawer from './components/NavigationDrawer';
import MobileBottomNav from './components/MobileBottomNav';
import Footer from './components/Footer';
import GetPlanModal from './components/GetPlanModal';

import HomePage from './pages/HomePage';
import SportsNutritionPage from './pages/SportsNutritionPage';
import MealPlansPage from './pages/MealPlansPage';
import CalculatorsPage from './pages/CalculatorsPage';
import GoalsPage from './pages/GoalsPage';
import RecipesPage from './pages/RecipesPage';

// Scroll to top on every navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGetPlanOpen, setIsGetPlanOpen] = useState(false);

  const handleOpenMenu = () => setIsMenuOpen(true);
  const handleCloseMenu = () => setIsMenuOpen(false);

  const handleOpenGetPlan = () => setIsGetPlanOpen(true);
  const handleCloseGetPlan = () => setIsGetPlanOpen(false);

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      <ScrollToTop />

      {/* Top App Bar */}
      <Navbar
        onOpenMenu={handleOpenMenu}
        onOpenGetPlan={handleOpenGetPlan}
      />

      {/* Side Navigation Drawer */}
      <NavigationDrawer
        isOpen={isMenuOpen}
        onClose={handleCloseMenu}
        onOpenGetPlan={handleOpenGetPlan}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage onOpenGetPlan={handleOpenGetPlan} />} />
          <Route path="/sports-nutrition" element={<SportsNutritionPage onOpenGetPlan={handleOpenGetPlan} />} />
          <Route path="/meal-plans" element={<MealPlansPage onOpenGetPlan={handleOpenGetPlan} />} />
          <Route path="/calculators" element={<CalculatorsPage onOpenGetPlan={handleOpenGetPlan} />} />
          <Route path="/goals" element={<GoalsPage onOpenGetPlan={handleOpenGetPlan} />} />
          <Route path="/recipes" element={<RecipesPage onOpenGetPlan={handleOpenGetPlan} />} />
        </Routes>
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav />

      {/* Desktop & Tablet Footer */}
      <Footer />

      {/* Interactive Clinical Plan Assessment Modal */}
      <GetPlanModal
        isOpen={isGetPlanOpen}
        onClose={handleCloseGetPlan}
      />
    </div>
  );
}

