import React, { useState } from 'react';
import { mealPlans } from '../data/nutritionData';

export default function MealPlansPage({ onOpenGetPlan }) {
  const [filter, setFilter] = useState('all');
  const [selectedPlanDetail, setSelectedPlanDetail] = useState(null);

  const filteredPlans = mealPlans.filter((plan) => {
    if (filter === 'all') return true;
    if (filter === 'plant') return plan.id === 'vegetarian-athlete' || plan.id === 'vegan-athlete';
    if (filter === 'muscle') return plan.id === 'hypertrophy-base' || plan.id === 'vegetarian-athlete';
    if (filter === 'fatloss') return plan.id === 'lean-performance';
    if (filter === 'endurance') return plan.id === 'endurance-protocol';
    return true;
  });

  return (
    <div className="pt-20 md:pt-24 max-w-7xl mx-auto px-margin-mobile md:px-gutter pb-xl flex flex-col gap-10 md:gap-14">
      {/* Header Section */}
      <section className="text-center md:text-left mt-2 md:mt-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm rounded-full w-max shadow-sm border border-outline-variant/30 mb-3">
            <span className="material-symbols-outlined text-[16px] text-primary">restaurant_menu</span>
            <span>Evidence-Based Dietary Protocols</span>
          </div>
          <h1 className="font-headline font-bold text-3xl sm:text-4xl md:text-5xl text-on-surface tracking-tight mb-3">
            Performance Meal Plans
          </h1>
          <p className="font-body-md text-base md:text-lg text-secondary max-w-2xl leading-relaxed">
            Scientifically structured nutrition protocols designed to optimize your training, enhance recovery, and support your specific athletic goals.
          </p>
        </div>

        <button
          onClick={onOpenGetPlan}
          className="bg-primary text-on-primary font-label-md text-sm font-semibold px-6 py-3.5 rounded-xl hover:bg-primary/90 transition-all shadow-ambient hover:shadow-ambient-md shrink-0 self-start md:self-end flex items-center gap-2 active:scale-95"
        >
          <span className="material-symbols-outlined text-[18px]">tune</span>
          <span>Match With My Goal</span>
        </button>
      </section>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-outline-variant/20 pb-4">
        {[
          { id: 'all', label: 'All Protocols' },
          { id: 'plant', label: 'Plant-Powered & Vegan' },
          { id: 'muscle', label: 'Hypertrophy & Bulking' },
          { id: 'fatloss', label: 'Fat Loss & Cutting' },
          { id: 'endurance', label: 'Endurance & Cardio' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-4 py-2 rounded-full font-label-md text-xs font-semibold transition-all duration-150 ${
              filter === tab.id
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container hover:bg-surface-container-high text-secondary hover:text-on-surface'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Bento Grid Layout for Plans */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {filteredPlans.map((plan) => {
          const isLargeCard = plan.cols.includes('col-span-8');
          return (
            <article
              key={plan.id}
              className={`col-span-1 ${
                filter !== 'all' ? 'md:col-span-6' : plan.cols
              } bg-surface-container-lowest rounded-2xl shadow-ambient overflow-hidden border border-outline-variant/30 hover:shadow-ambient-md transition-all duration-300 flex flex-col group`}
            >
              <div className={`${isLargeCard && filter === 'all' ? 'md:flex md:h-full' : 'flex flex-col h-full'}`}>
                {/* Image container */}
                <div
                  className={`${
                    isLargeCard && filter === 'all' ? 'md:w-2/5 h-64 md:h-auto' : 'h-52'
                  } relative overflow-hidden shrink-0`}
                >
                  <img
                    src={plan.image}
                    alt={plan.title}
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 z-20">
                    <span
                      className={`${plan.tagColor} font-label-sm text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md shadow-xs`}
                    >
                      {plan.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 z-20 bg-black/60 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg font-mono text-xs font-semibold">
                    {plan.macros.calories}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 md:p-7 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-primary">
                      <span className="material-symbols-outlined text-[22px]">restaurant</span>
                      <h2 className="font-headline font-bold text-xl text-on-surface">{plan.title}</h2>
                    </div>

                    <p className="font-body-md text-sm text-on-surface-variant mb-5 leading-relaxed">
                      {plan.description}
                    </p>

                    {/* Macro snapshot */}
                    <div className="grid grid-cols-3 gap-2 bg-surface-container-low p-3 rounded-xl border border-outline-variant/20 mb-5 text-center">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-secondary block">Protein</span>
                        <strong className="text-xs font-headline text-primary">{plan.macros.protein}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-secondary block">Carbs</span>
                        <strong className="text-xs font-headline text-tertiary">{plan.macros.carbs}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-secondary block">Fats</span>
                        <strong className="text-xs font-headline text-secondary">{plan.macros.fats}</strong>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                      <div className="bg-surface p-3.5 rounded-xl border border-outline-variant/30">
                        <h3 className="font-label-sm text-[11px] text-secondary uppercase font-semibold mb-0.5">Target Goal</h3>
                        <p className="font-label-md text-xs font-semibold text-on-surface">{plan.targetGoal}</p>
                      </div>
                      <div className="bg-surface p-3.5 rounded-xl border border-outline-variant/30">
                        <h3 className="font-label-sm text-[11px] text-secondary uppercase font-semibold mb-0.5">Ideal For</h3>
                        <p className="font-label-md text-xs font-semibold text-on-surface">{plan.idealFor}</p>
                      </div>
                    </div>
                  </div>

                  {/* Timing & Ingredients */}
                  <div className="space-y-3 border-t border-outline-variant/20 pt-4 mt-auto">
                    <div className="flex items-start gap-2.5">
                      <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">schedule</span>
                      <div className="text-xs">
                        <strong className="text-on-surface block font-semibold">Timing Strategy:</strong>
                        <span className="text-secondary">{plan.timing}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">grocery</span>
                      <div className="text-xs">
                        <strong className="text-on-surface block font-semibold">Key Ingredients:</strong>
                        <span className="text-secondary">{plan.ingredients}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedPlanDetail(plan)}
                      className="w-full mt-3 py-2.5 px-4 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>View Daily Meal Routine</span>
                      <span className="material-symbols-outlined text-[16px]">visibility</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Clinical Disclaimer Section */}
      <section className="bg-surface-container-low p-6 sm:p-8 rounded-2xl border border-outline-variant/30 flex items-start gap-4">
        <span className="material-symbols-outlined text-secondary text-[26px] mt-0.5">info</span>
        <div>
          <h4 className="font-headline font-bold text-base text-on-surface mb-1">
            Clinical Disclaimer &amp; Individual Variation
          </h4>
          <p className="font-body-md text-secondary text-sm leading-relaxed">
            These macronutrient templates are designed for healthy adults engaging in structured physical training. They do not constitute individualized clinical prescriptions. Athletes with specific metabolic parameters, renal considerations, or digestive profiles should review meal targets with our sports nutrition specialists.
          </p>
        </div>
      </section>

      {/* Daily Routine Modal */}
      {selectedPlanDetail && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-on-background/60 backdrop-blur-sm"
            onClick={() => setSelectedPlanDetail(null)}
          />
          <div className="relative w-full max-w-2xl bg-surface rounded-2xl shadow-2xl border border-outline-variant/30 overflow-hidden z-10 max-h-[85vh] flex flex-col">
            <div className="px-6 py-4 bg-surface-container-low border-b border-outline-variant/20 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-primary tracking-wider">
                  Full Day Schedule
                </span>
                <h3 className="font-headline font-bold text-lg text-on-surface">
                  {selectedPlanDetail.title} Daily Protocol
                </h3>
              </div>
              <button
                onClick={() => setSelectedPlanDetail(null)}
                className="p-1.5 text-secondary hover:text-on-surface rounded-full"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div className="flex items-center justify-between bg-primary/10 p-3.5 rounded-xl border border-primary/20">
                <span className="text-xs font-semibold text-primary">Daily Energy Target:</span>
                <span className="font-mono font-bold text-sm text-primary">{selectedPlanDetail.macros.calories}</span>
              </div>

              <div className="space-y-3">
                {selectedPlanDetail.schedule.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex items-start gap-4"
                  >
                    <span className="px-2.5 py-1 bg-surface-container rounded-lg font-mono text-xs font-bold text-primary shrink-0">
                      {item.time}
                    </span>
                    <div>
                      <h5 className="font-headline font-semibold text-xs text-on-surface">{item.meal}</h5>
                      <p className="text-xs text-secondary mt-0.5 leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-6 py-4 bg-surface-container-low border-t border-outline-variant/20 flex justify-end">
              <button
                onClick={() => setSelectedPlanDetail(null)}
                className="bg-primary text-on-primary px-5 py-2 rounded-xl text-xs font-semibold shadow-sm"
              >
                Close Routine
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

