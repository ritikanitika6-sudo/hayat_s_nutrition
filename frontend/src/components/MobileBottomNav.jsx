import React from 'react';
import { NavLink } from 'react-router-dom';

export default function MobileBottomNav() {
  const bottomItems = [
    { name: 'Home', path: '/', icon: 'home' },
    { name: 'Nutrition', path: '/sports-nutrition', icon: 'fitness_center' },
    { name: 'Plans', path: '/meal-plans', icon: 'restaurant_menu' },
    { name: 'Calc', path: '/calculators', icon: 'straighten' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 md:hidden bg-surface/95 backdrop-blur-lg border-t border-outline-variant/30 shadow-[0_-4px_16px_rgba(44,62,80,0.08)]">
      <div className="flex justify-around items-center px-2 py-1.5 max-w-md mx-auto">
        {bottomItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-primary font-bold bg-primary-container/20 scale-95'
                  : 'text-secondary hover:text-primary hover:bg-surface-container'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`material-symbols-outlined text-[22px] mb-0.5 ${
                    isActive ? 'fill-icon text-primary' : ''
                  }`}
                >
                  {item.icon}
                </span>
                <span className="font-label-sm text-[11px] leading-tight">{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

