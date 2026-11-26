import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavigationDrawer({ isOpen, onClose, onOpenGetPlan }) {
  const navLinks = [
    { name: 'Home', path: '/', icon: 'home' },
    { name: 'Sports Nutrition', path: '/sports-nutrition', icon: 'fitness_center' },
    { name: 'Goals', path: '/goals', icon: 'target' },
    { name: 'Meal Plans', path: '/meal-plans', icon: 'restaurant_menu' },
    { name: 'Recipes', path: '/recipes', icon: 'receipt_long' },
    { name: 'Calculators', path: '/calculators', icon: 'calculate' },
  ];

  return (
    <>
      {/* Backdrop overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-on-background/50 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer panel */}
      <aside
        className={`fixed inset-y-0 left-0 w-80 max-w-[85vw] z-[70] flex flex-col p-6 bg-surface shadow-2xl rounded-r-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex justify-between items-center pb-6 border-b border-outline-variant/30">
          <div>
            <div className="font-headline font-bold text-xl text-primary tracking-tight flex items-center gap-2">
              <span className="material-symbols-outlined fill-icon text-primary">vital_signs</span>
              Hayat Nutrition
            </div>
            <p className="font-label-sm text-label-sm text-secondary mt-0.5">Clinical Performance</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-full transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Navigation items */}
        <nav className="flex flex-col gap-1.5 py-6 overflow-y-auto flex-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3.5 py-3 px-4 rounded-full font-label-md text-label-md transition-all duration-150 ${
                  isActive
                    ? 'bg-secondary-container text-on-secondary-container font-semibold shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className={`material-symbols-outlined text-[22px] ${isActive ? 'fill-icon text-primary' : ''}`}>
                    {link.icon}
                  </span>
                  <span>{link.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Drawer Actions */}
        <div className="pt-4 border-t border-outline-variant/30 flex flex-col gap-3">
          <button
            onClick={() => {
              onClose();
              onOpenGetPlan();
            }}
            className="w-full bg-primary text-on-primary font-label-md text-label-md py-3 px-4 rounded-xl hover:bg-primary/90 transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">assignment</span>
            <span>Get Your Nutrition Plan</span>
          </button>
          <div className="text-center font-label-sm text-[11px] text-secondary">
            Evidence-Based Sports Medicine &amp; Performance
          </div>
        </div>
      </aside>
    </>
  );
}

