import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function Navbar({ onOpenMenu, onOpenGetPlan }) {
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Sports Nutrition', path: '/sports-nutrition' },
    { name: 'Goals', path: '/goals' },
    { name: 'Meal Plans', path: '/meal-plans' },
    { name: 'Recipes', path: '/recipes' },
    { name: 'Calculators', path: '/calculators' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-surface/90 backdrop-blur-md border-b border-outline-variant/30 shadow-sm transition-all duration-300">
      <div className="flex justify-between items-center px-margin-mobile md:px-gutter max-w-7xl mx-auto py-3.5">
        {/* Left: Mobile menu button & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMenu}
            aria-label="Toggle navigation menu"
            className="p-2 -ml-1 text-on-surface hover:text-primary transition-colors focus:outline-none rounded-lg hover:bg-surface-container"
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>

          <Link
            to="/"
            className="font-headline font-bold text-2xl tracking-tight text-primary hover:opacity-90 transition-opacity flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined fill-icon text-primary text-[26px]">vital_signs</span>
            <span>HAYAT</span>
          </Link>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `font-label-md text-label-md px-3.5 py-2 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'text-primary font-bold bg-primary-container/20 border-b-2 border-primary'
                    : 'text-secondary hover:text-primary hover:bg-surface-container-high font-medium'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Right: Get Plan CTA */}
        <div className="flex items-center gap-3">
          <Link
            to="/calculators"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-secondary hover:text-primary px-3 py-1.5 rounded-lg border border-outline-variant/40 hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">calculate</span>
            <span>Tools</span>
          </Link>

          <button
            onClick={onOpenGetPlan}
            className="bg-primary text-on-primary font-label-md text-label-md px-5 py-2 rounded-lg hover:bg-primary/90 hover:shadow-subtle transition-all duration-200 shadow-sm active:scale-95 flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">assignment</span>
            <span>Get Plan</span>
          </button>
        </div>
      </div>
    </header>
  );
}

