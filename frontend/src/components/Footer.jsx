import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-inverse-surface text-surface-variant border-t border-outline/10 mt-16 md:mt-24 pb-24 md:pb-12 pt-12 px-margin-mobile md:px-gutter">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
        {/* Left Column: Brand & Health Safety Requirement */}
        <div className="flex flex-col gap-3 max-w-md">
          <div className="font-headline font-bold text-2xl text-primary-fixed tracking-tight flex items-center gap-2">
            <span className="material-symbols-outlined fill-icon text-primary-fixed text-[26px]">vital_signs</span>
            <span>HAYAT</span>
          </div>

          <div className="p-3.5 rounded-xl bg-inverse-surface/80 border border-outline/20">
            <div className="flex items-center gap-2 text-primary-fixed-dim font-label-sm font-semibold mb-1">
              <span className="material-symbols-outlined text-[16px]">health_and_safety</span>
              <span>Health Safety Requirement</span>
            </div>
            <p className="font-label-sm text-xs text-surface-variant/80 leading-relaxed">
              The information provided on this platform is for general educational and athletic conditioning purposes only. It is not intended to substitute professional medical advice, clinical diagnosis, or medical treatment. Always consult with a qualified healthcare provider before adopting new dietary protocols.
            </p>
          </div>

          <p className="font-body-md text-xs text-surface-variant/70 mt-2">
            © {new Date().getFullYear()} Hayat's Nutrition. All rights reserved. Modern Clinical Performance.
          </p>
        </div>

        {/* Right Columns: Navigation & Platform */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-12 w-full md:w-auto">
          {/* Platform Links */}
          <div className="flex flex-col gap-3">
            <span className="font-label-md text-xs text-inverse-on-surface uppercase tracking-widest font-semibold opacity-70">
              Platform
            </span>
            <Link to="/" className="text-sm hover:text-primary-fixed-dim transition-colors">
              Home
            </Link>
            <Link to="/sports-nutrition" className="text-sm hover:text-primary-fixed-dim transition-colors">
              Sports Nutrition
            </Link>
            <Link to="/goals" className="text-sm hover:text-primary-fixed-dim transition-colors">
              Goals
            </Link>
            <Link to="/meal-plans" className="text-sm hover:text-primary-fixed-dim transition-colors">
              Meal Plans
            </Link>
            <Link to="/recipes" className="text-sm hover:text-primary-fixed-dim transition-colors">
              Recipes
            </Link>
            <Link to="/calculators" className="text-sm hover:text-primary-fixed-dim transition-colors">
              Calculators
            </Link>
          </div>

          {/* Calculators Quick Access */}
          <div className="flex flex-col gap-3">
            <span className="font-label-md text-xs text-inverse-on-surface uppercase tracking-widest font-semibold opacity-70">
              Tools
            </span>
            <Link to="/calculators" className="text-sm hover:text-primary-fixed-dim transition-colors">
              BMI Calculator
            </Link>
            <Link to="/calculators" className="text-sm hover:text-primary-fixed-dim transition-colors">
              BMR Calculator
            </Link>
            <Link to="/calculators" className="text-sm hover:text-primary-fixed-dim transition-colors">
              TDEE &amp; Energy Needs
            </Link>
            <Link to="/calculators" className="text-sm hover:text-primary-fixed-dim transition-colors">
              Protein Estimator
            </Link>
            <Link to="/calculators" className="text-sm hover:text-primary-fixed-dim transition-colors">
              Hydration Estimator
            </Link>
          </div>

          {/* Legal Links */}
          <div className="flex flex-col gap-3 col-span-2 sm:col-span-1">
            <span className="font-label-md text-xs text-inverse-on-surface uppercase tracking-widest font-semibold opacity-70">
              Legal &amp; Trust
            </span>
            <a href="#privacy" onClick={(e) => { e.preventDefault(); alert("Hayat's Nutrition: All personal data is processed in accordance with clinical privacy standards."); }} className="text-sm hover:text-primary-fixed-dim transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" onClick={(e) => { e.preventDefault(); alert("Hayat's Nutrition: Platform terms of service for athletic conditioning and nutrition education."); }} className="text-sm hover:text-primary-fixed-dim transition-colors">
              Terms of Service
            </a>
            <a href="#disclaimer" onClick={(e) => { e.preventDefault(); alert("Hayat's Nutrition: Evidence-based educational resources. Consult your physician for medical guidance."); }} className="text-sm hover:text-primary-fixed-dim transition-colors">
              Health Disclaimer
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

