import React, { useState } from 'react';
import { performanceRecipes } from '../data/nutritionData';

export default function RecipesPage({ onOpenGetPlan }) {
  const [activeRecipe, setActiveRecipe] = useState(null);

  return (
    <div className="pt-20 md:pt-24 max-w-7xl mx-auto px-margin-mobile md:px-gutter pb-xl flex flex-col gap-10 md:gap-14">
      {/* Header */}
      <section className="text-center md:text-left mt-2 md:mt-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm rounded-full w-max shadow-sm border border-outline-variant/30 mb-3">
            <span className="material-symbols-outlined text-[16px] text-primary">receipt_long</span>
            <span>Performance Kitchen</span>
          </div>
          <h1 className="font-headline font-bold text-3xl sm:text-4xl md:text-5xl text-on-surface tracking-tight mb-3">
            Clinical Recipes
          </h1>
          <p className="font-body-md text-base md:text-lg text-secondary max-w-2xl leading-relaxed">
            High-protein, micronutrient-dense recipes crafted to fuel grueling workouts, accelerate glycogen restoration, and support muscle remodeling.
          </p>
        </div>

        <button
          onClick={onOpenGetPlan}
          className="bg-primary text-on-primary font-label-md text-sm font-semibold px-6 py-3.5 rounded-xl hover:bg-primary/90 transition-all shadow-ambient hover:shadow-ambient-md shrink-0 self-start md:self-end flex items-center gap-2 active:scale-95"
        >
          <span className="material-symbols-outlined text-[18px]">assignment</span>
          <span>Get Custom Meal Plan</span>
        </button>
      </section>

      {/* Recipes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {performanceRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-ambient p-6 sm:p-8 flex flex-col justify-between hover:shadow-ambient-md transition-all group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {recipe.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-secondary font-medium">
                  <span className="material-symbols-outlined text-[16px]">timer</span>
                  <span>{recipe.time}</span>
                </span>
              </div>

              <h3 className="font-headline font-bold text-xl text-on-surface mb-3 group-hover:text-primary transition-colors">
                {recipe.title}
              </h3>

              {/* Macro Bar */}
              <div className="grid grid-cols-4 gap-2 bg-surface-container-low p-3 rounded-xl border border-outline-variant/20 mb-5 text-center">
                <div>
                  <span className="text-[10px] uppercase font-bold text-secondary block">Calories</span>
                  <strong className="text-xs font-headline text-on-surface">{recipe.calories}</strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-primary block">Protein</span>
                  <strong className="text-xs font-headline text-primary">{recipe.protein}</strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-tertiary block">Carbs</span>
                  <strong className="text-xs font-headline text-tertiary">{recipe.carbs}</strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-secondary block">Fats</span>
                  <strong className="text-xs font-headline text-secondary">{recipe.fats}</strong>
                </div>
              </div>

              {/* Ingredients preview */}
              <div className="space-y-1.5 mb-5">
                <span className="font-label-sm text-xs font-bold text-on-surface block">
                  Key Ingredients:
                </span>
                <ul className="text-xs text-secondary space-y-1 pl-4 list-disc">
                  {recipe.ingredients.slice(0, 4).map((ing, idx) => (
                    <li key={idx}>{ing}</li>
                  ))}
                  {recipe.ingredients.length > 4 && (
                    <li className="text-primary font-medium italic">+{recipe.ingredients.length - 4} more ingredients...</li>
                  )}
                </ul>
              </div>
            </div>

            <button
              onClick={() => setActiveRecipe(recipe)}
              className="w-full mt-4 py-2.5 px-4 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <span>View Full Recipe &amp; Instructions</span>
              <span className="material-symbols-outlined text-[16px]">visibility</span>
            </button>
          </div>
        ))}
      </div>

      {/* Recipe Modal */}
      {activeRecipe && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-on-background/60 backdrop-blur-sm"
            onClick={() => setActiveRecipe(null)}
          />
          <div className="relative w-full max-w-xl bg-surface rounded-2xl shadow-2xl border border-outline-variant/30 overflow-hidden z-10 max-h-[85vh] flex flex-col">
            <div className="px-6 py-4 bg-surface-container-low border-b border-outline-variant/20 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-primary tracking-wider">
                  {activeRecipe.category}
                </span>
                <h3 className="font-headline font-bold text-lg text-on-surface">
                  {activeRecipe.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveRecipe(null)}
                className="p-1.5 text-secondary hover:text-on-surface rounded-full"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5">
              <div className="flex items-center justify-around bg-surface-container-low p-3.5 rounded-xl border border-outline-variant/20 text-center">
                <div>
                  <span className="text-[10px] text-secondary font-bold uppercase block">Calories</span>
                  <strong className="text-sm font-headline text-on-surface">{activeRecipe.calories}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-primary font-bold uppercase block">Protein</span>
                  <strong className="text-sm font-headline text-primary">{activeRecipe.protein}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-tertiary font-bold uppercase block">Carbs</span>
                  <strong className="text-sm font-headline text-tertiary">{activeRecipe.carbs}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-secondary font-bold uppercase block">Fats</span>
                  <strong className="text-sm font-headline text-secondary">{activeRecipe.fats}</strong>
                </div>
              </div>

              <div>
                <h4 className="font-headline font-bold text-sm text-on-surface mb-2">Ingredients</h4>
                <ul className="text-xs text-secondary space-y-1.5 pl-4 list-disc bg-surface-container-lowest p-3.5 rounded-xl border border-outline-variant/20">
                  {activeRecipe.ingredients.map((ing, idx) => (
                    <li key={idx}>{ing}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-headline font-bold text-sm text-on-surface mb-2">
                  Preparation &amp; Cooking Instructions
                </h4>
                <p className="text-xs text-secondary leading-relaxed bg-surface-container-lowest p-3.5 rounded-xl border border-outline-variant/20">
                  {activeRecipe.instructions}
                </p>
              </div>
            </div>

            <div className="px-6 py-4 bg-surface-container-low border-t border-outline-variant/20 flex justify-end">
              <button
                onClick={() => setActiveRecipe(null)}
                className="bg-primary text-on-primary px-5 py-2 rounded-xl text-xs font-semibold shadow-sm"
              >
                Close Recipe
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

