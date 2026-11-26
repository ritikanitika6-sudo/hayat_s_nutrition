import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { primaryGoals } from '../data/nutritionData';

export default function GoalsPage({ onOpenGetPlan }) {
  const [selectedGoal, setSelectedGoal] = useState(primaryGoals[0]);

  return (
    <div className="pt-20 md:pt-24 max-w-7xl mx-auto px-margin-mobile md:px-gutter pb-xl flex flex-col gap-10 md:gap-14">
      {/* Header */}
      <section className="text-center md:text-left mt-2 md:mt-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm rounded-full w-max shadow-sm border border-outline-variant/30 mb-3">
            <span className="material-symbols-outlined text-[16px] text-primary">target</span>
            <span>Targeted Clinical Directives</span>
          </div>
          <h1 className="font-headline font-bold text-3xl sm:text-4xl md:text-5xl text-on-surface tracking-tight mb-3">
            Performance Goals
          </h1>
          <p className="font-body-md text-base md:text-lg text-secondary max-w-2xl leading-relaxed">
            Select your athletic focus to uncover physiological mechanisms, exact caloric rules, protein targets, and tailored meal structures.
          </p>
        </div>

        <button
          onClick={onOpenGetPlan}
          className="bg-primary text-on-primary font-label-md text-sm font-semibold px-6 py-3.5 rounded-xl hover:bg-primary/90 transition-all shadow-ambient hover:shadow-ambient-md shrink-0 self-start md:self-end flex items-center gap-2 active:scale-95"
        >
          <span className="material-symbols-outlined text-[18px]">assignment</span>
          <span>Generate Plan For My Goal</span>
        </button>
      </section>

      {/* Goal Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {primaryGoals.map((goal) => {
          const isSelected = selectedGoal.id === goal.id;
          return (
            <div
              key={goal.id}
              onClick={() => setSelectedGoal(goal)}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-primary ring-2 ring-primary/40 bg-surface shadow-ambient-md'
                  : 'border-outline-variant/30 bg-surface-container-lowest hover:border-primary/40 hover:shadow-ambient'
              }`}
            >
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[26px]">{goal.icon}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-primary tracking-wider block">
                        {goal.badge}
                      </span>
                      <h3 className="font-headline font-bold text-xl text-on-surface">{goal.title}</h3>
                    </div>
                  </div>
                  {isSelected && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary bg-primary-container/20 px-2.5 py-1 rounded-full">
                      <span className="material-symbols-outlined text-[16px]">check</span>
                      <span>Active Focus</span>
                    </span>
                  )}
                </div>

                <p className="font-body-md text-sm text-secondary leading-relaxed mb-6">
                  {goal.desc}
                </p>

                {/* Key Metrics */}
                <div className="space-y-3 bg-surface-container-low p-4 rounded-xl border border-outline-variant/20 text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-secondary font-semibold">Caloric Strategy:</span>
                    <strong className="text-on-surface text-right font-medium">{goal.caloricRule}</strong>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-secondary font-semibold">Protein Target:</span>
                    <strong className="text-primary text-right font-medium">{goal.proteinTarget}</strong>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-secondary font-semibold">Carbohydrate Role:</span>
                    <strong className="text-secondary text-right font-medium">{goal.carbTarget}</strong>
                  </div>
                </div>
              </div>

              <div className="px-6 md:px-8 py-4 bg-surface-container-low border-t border-outline-variant/20 flex items-center justify-between text-xs">
                <span className="text-secondary italic line-clamp-1">{goal.clinicalFocus}</span>
                <Link
                  to="/meal-plans"
                  className="font-semibold text-primary hover:underline shrink-0 flex items-center gap-1"
                >
                  <span>Matched Plans</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Goal Deep Dive */}
      <section className="bg-surface-container-low rounded-3xl p-6 sm:p-10 border border-outline-variant/30 shadow-ambient">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-xs font-bold uppercase tracking-wider">
              Clinical Physiology
            </span>
            <h2 className="font-headline font-bold text-2xl md:text-3xl text-on-surface">
              Optimizing {selectedGoal.title}
            </h2>
            <p className="font-body-md text-secondary leading-relaxed text-sm md:text-base">
              {selectedGoal.clinicalFocus} Adhering to structured meal intervals maintains amino acid availability and prevents endocrine downregulation during intense training blocks.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/calculators"
                className="bg-primary text-on-primary font-label-md text-xs font-semibold px-5 py-3 rounded-xl hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">straighten</span>
                <span>Calculate Target Calories For This Goal</span>
              </Link>
              <Link
                to="/meal-plans"
                className="border border-outline-variant/40 bg-surface text-secondary hover:text-on-surface font-label-md text-xs font-semibold px-5 py-3 rounded-xl hover:bg-surface-container transition-colors flex items-center gap-1.5"
              >
                <span>View Recommended Meal Plans</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
          </div>

          <div className="w-full md:w-1/3 h-56 rounded-2xl overflow-hidden shadow-ambient shrink-0 border border-outline-variant/30">
            <img
              src={selectedGoal.image}
              alt={selectedGoal.title}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

