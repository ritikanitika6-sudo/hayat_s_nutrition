import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sportsCategories, foodComparisonGuide } from '../data/nutritionData';

export default function SportsNutritionPage({ onOpenGetPlan }) {
  const [selectedSport, setSelectedSport] = useState(sportsCategories[0]);

  return (
    <div className="pt-20 md:pt-24 max-w-7xl mx-auto px-margin-mobile md:px-gutter pb-xl flex flex-col gap-12 md:gap-16">
      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center mt-2 md:mt-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm rounded-full w-max shadow-sm border border-outline-variant/30 mb-4">
            <span className="material-symbols-outlined text-[16px] text-primary">fitness_center</span>
            <span>Sports Performance Science</span>
          </div>

          <h1 className="font-headline font-bold text-3xl sm:text-4xl md:text-5xl leading-tight text-on-background tracking-tight mb-4">
            Nutrition That Works <br className="hidden md:block" />
            <span className="text-primary">With Your Training</span>
          </h1>

          <p className="font-body-md text-base md:text-lg text-secondary leading-relaxed mb-6 max-w-xl">
            Clinical precision meets athletic performance. Fuel your workouts, optimize recovery, and achieve your goals with science-backed nutritional strategies tailored to your specific sport and lifestyle.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenGetPlan}
              className="bg-primary text-on-primary font-label-md text-label-md px-7 py-3.5 rounded-xl hover:bg-primary/90 transition-all duration-200 shadow-ambient hover:shadow-ambient-md flex items-center gap-2 active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">assignment</span>
              <span>Explore Plans</span>
            </button>

            <Link
              to="/calculators"
              className="border border-outline-variant/60 text-secondary hover:text-primary bg-surface font-label-md text-label-md px-6 py-3.5 rounded-xl hover:bg-surface-container transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">straighten</span>
              <span>Calculate Needs</span>
            </Link>
          </div>
        </div>

        {/* Hero image card */}
        <div className="rounded-3xl overflow-hidden shadow-card-lift h-[300px] sm:h-[380px] md:h-[420px] relative border border-outline-variant/30 group">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDF6ym8yOa4W2iCMGBwzKemST1azjsKwMJePZ6GyJaPkOF2EcFXwkbgIBcXwufRNA2jrMIXF6co5Faj6InbS9k8Ba9p82KCz12wH8XyD3Ac1bSbx1-FEZVASyxKx-PLqoYrmEt1_nlazO-SL6yh5wxzO_Ez9taU-AbUqDJXBTpw1A2BDgtp3q3pKBDXqak0x-K3kAEeShFWVI_M1AWxGufv6Uh_br1s7MKGXLtPACxZS4uf6syRmC280A"
            alt="High-performance clinical sports nutrition display"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute bottom-5 left-5 right-5 z-20 text-white">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/90 text-white font-label-sm text-[11px] uppercase tracking-wider mb-1 backdrop-blur-sm">
              Clinical Standard
            </span>
            <p className="font-headline font-bold text-base sm:text-lg">
              Bioavailable Whole Foods &amp; Target Timing
            </p>
          </div>
        </div>
      </section>

      {/* Workout Phases (Bento Grid: The Timeline of Performance) */}
      <section>
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="font-headline font-bold text-2xl md:text-3xl text-on-background">
            The Timeline of Performance
          </h2>
          <p className="font-body-md text-secondary text-sm md:text-base mt-1">
            Nutrient timing dictates how effectively your muscles uptake glucose, spare protein, and clear metabolic byproducts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pre-Workout */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-ambient hover:shadow-ambient-md transition-all border border-outline-variant/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary-container/20 p-2.5 rounded-xl text-primary">
                  <span className="material-symbols-outlined fill-icon text-[24px]">bolt</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-primary tracking-wider">Phase 01</span>
                  <h3 className="font-headline font-bold text-xl text-on-background">Pre-Workout</h3>
                </div>
              </div>
              <p className="font-body-md text-on-surface-variant text-sm mb-6 leading-relaxed">
                Prime your body for exertion. Focus on readily available intramuscular energy, minimal gastrointestinal stress, and cellular hydration.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary mt-0.5 text-[20px]">schedule</span>
                  <div>
                    <span className="block font-label-md text-label-md text-on-surface">Timing</span>
                    <span className="font-body-md text-on-surface-variant text-xs">1-3 hours prior for meal; 30-45m for light snack</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary mt-0.5 text-[20px]">grain</span>
                  <div>
                    <span className="block font-label-md text-label-md text-on-surface">Carbohydrates</span>
                    <span className="font-body-md text-on-surface-variant text-xs">Low glycemic, complex carbs for sustained release</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary mt-0.5 text-[20px]">water_drop</span>
                  <div>
                    <span className="block font-label-md text-label-md text-on-surface">Hydration</span>
                    <span className="font-body-md text-on-surface-variant text-xs">500ml water with pinch of electrolytes 2h prior</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-outline-variant/20 text-xs text-secondary font-medium">
              Goal: Maximize liver &amp; muscle glycogen
            </div>
          </div>

          {/* During-Workout */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-ambient hover:shadow-ambient-md transition-all border border-outline-variant/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary-container/20 p-2.5 rounded-xl text-primary">
                  <span className="material-symbols-outlined fill-icon text-[24px]">directions_run</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-primary tracking-wider">Phase 02</span>
                  <h3 className="font-headline font-bold text-xl text-on-background">During-Workout</h3>
                </div>
              </div>
              <p className="font-body-md text-on-surface-variant text-sm mb-6 leading-relaxed">
                Maintain continuous output and delay central nervous system fatigue. Essential for training sessions lasting longer than 60 minutes.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary mt-0.5 text-[20px]">science</span>
                  <div>
                    <span className="block font-label-md text-label-md text-on-surface">Electrolytes</span>
                    <span className="font-body-md text-on-surface-variant text-xs">Replenish sodium and potassium lost in sweat</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary mt-0.5 text-[20px]">timer</span>
                  <div>
                    <span className="block font-label-md text-label-md text-on-surface">Short Sessions (&lt; 60m)</span>
                    <span className="font-body-md text-on-surface-variant text-xs">Pure water is typically sufficient for hydration</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary mt-0.5 text-[20px]">update</span>
                  <div>
                    <span className="block font-label-md text-label-md text-on-surface">Prolonged (&gt; 60m)</span>
                    <span className="font-body-md text-on-surface-variant text-xs">30-60g simple dual-transporter carbs per hour</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-outline-variant/20 text-xs text-secondary font-medium">
              Goal: Maintain blood glucose &amp; fluid turnover
            </div>
          </div>

          {/* Post-Workout */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-ambient hover:shadow-ambient-md transition-all border border-outline-variant/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary-container/20 p-2.5 rounded-xl text-primary">
                  <span className="material-symbols-outlined fill-icon text-[24px]">battery_charging_full</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-primary tracking-wider">Phase 03</span>
                  <h3 className="font-headline font-bold text-xl text-on-background">Post-Workout</h3>
                </div>
              </div>
              <p className="font-body-md text-on-surface-variant text-sm mb-6 leading-relaxed">
                Kickstart muscle protein synthesis and rebuild damaged myofibrils. The metabolic window is best capitalized within 2 hours.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary mt-0.5 text-[20px]">egg_alt</span>
                  <div>
                    <span className="block font-label-md text-label-md text-on-surface">Protein</span>
                    <span className="font-body-md text-on-surface-variant text-xs">25-40g high-quality leucine-rich protein</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary mt-0.5 text-[20px]">local_drink</span>
                  <div>
                    <span className="block font-label-md text-label-md text-on-surface">Fluids</span>
                    <span className="font-body-md text-on-surface-variant text-xs">Replace 150% of body fluid weight lost during exertion</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary mt-0.5 text-[20px]">bakery_dining</span>
                  <div>
                    <span className="block font-label-md text-label-md text-on-surface">Glycogen Refill</span>
                    <span className="font-body-md text-on-surface-variant text-xs">Fast-to-moderate carbs paired with protein</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-outline-variant/20 text-xs text-secondary font-medium">
              Goal: Trigger mTOR muscle protein synthesis
            </div>
          </div>

          {/* Rest Day Nutrition (Full Span Banner) */}
          <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl shadow-ambient hover:shadow-ambient-md transition-all border border-outline-variant/30 md:col-span-3 flex flex-col md:flex-row items-center gap-6 lg:gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-primary-container/20 p-2 rounded-xl text-primary">
                  <span className="material-symbols-outlined fill-icon text-[22px]">bedtime</span>
                </div>
                <h3 className="font-headline font-bold text-xl text-on-background">
                  Rest-Day Nutrition &amp; Adaptation
                </h3>
              </div>
              <p className="font-body-md text-on-surface-variant text-sm md:text-base leading-relaxed">
                Physical adaptation happens during rest, not during the workout. Caloric needs may shift down slightly, but micronutrient requirements remain high. Prioritize anti-inflammatory lipids, sustained protein feedings for structural repair, and consistent cellular hydration.
              </p>
            </div>

            <div className="w-full md:w-auto bg-surface-container-low p-5 rounded-2xl border border-outline-variant/30 shrink-0 text-center">
              <span className="block font-headline font-bold text-primary text-sm uppercase tracking-wider mb-2">
                Rest Day Focus Nutrients
              </span>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="px-3.5 py-1.5 bg-white border border-outline-variant/40 rounded-full font-label-sm text-xs font-semibold text-on-surface shadow-xs">
                  Omega-3 EPA/DHA
                </span>
                <span className="px-3.5 py-1.5 bg-white border border-outline-variant/40 rounded-full font-label-sm text-xs font-semibold text-on-surface shadow-xs">
                  Polyphenols
                </span>
                <span className="px-3.5 py-1.5 bg-white border border-outline-variant/40 rounded-full font-label-sm text-xs font-semibold text-on-surface shadow-xs">
                  Fermented Fiber
                </span>
                <span className="px-3.5 py-1.5 bg-white border border-outline-variant/40 rounded-full font-label-sm text-xs font-semibold text-on-surface shadow-xs">
                  Magnesium
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nutrition for Your Sport (Interactive Selector) */}
      <section>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="font-headline font-bold text-2xl md:text-3xl text-on-background">
              Nutrition for Your Sport
            </h2>
            <p className="font-body-md text-secondary text-sm md:text-base mt-1">
              Select your activity to see tailored clinical recommendations and macronutrient ratios.
            </p>
          </div>
          <span className="font-label-sm text-xs text-primary font-semibold hidden md:block">
            Click any sport to view clinical breakdown ↓
          </span>
        </div>

        {/* Sport Grid Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
          {sportsCategories.map((sport) => {
            const isSelected = selectedSport.id === sport.id;
            return (
              <button
                key={sport.id}
                onClick={() => setSelectedSport(sport)}
                className={`p-4 rounded-2xl border transition-all duration-200 text-center flex flex-col items-center justify-center gap-2 ${
                  isSelected
                    ? 'bg-primary text-on-primary border-primary shadow-ambient-md scale-[1.03]'
                    : 'bg-surface-container-lowest border-outline-variant/30 text-on-surface hover:border-primary/50 hover:bg-surface-container-low'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[32px] ${
                    isSelected ? 'text-white' : 'text-secondary'
                  }`}
                >
                  {sport.icon}
                </span>
                <span className="font-label-sm text-xs font-semibold leading-tight line-clamp-2">
                  {sport.name.split('&')[0].trim()}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Sport Detailed Breakdown Card */}
        <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 border border-primary/20 shadow-ambient-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-outline-variant/20">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[32px]">{selectedSport.icon}</span>
              </div>
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-label-sm text-[10px] font-bold uppercase tracking-wider mb-1">
                  {selectedSport.tag}
                </span>
                <h3 className="font-headline font-bold text-2xl text-on-surface">
                  {selectedSport.name}
                </h3>
              </div>
            </div>

            <div className="bg-surface-container p-3 rounded-xl border border-outline-variant/30 text-xs">
              <span className="text-secondary font-semibold block mb-0.5">Clinical Macro Targets:</span>
              <strong className="text-primary font-mono">{selectedSport.targetMacros}</strong>
            </div>
          </div>

          <p className="font-body-md text-secondary text-sm md:text-base my-5 leading-relaxed">
            {selectedSport.summary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-surface p-4 rounded-xl border border-outline-variant/30">
              <div className="flex items-center gap-2 text-primary font-label-md font-semibold text-xs mb-2">
                <span className="material-symbols-outlined text-[18px]">bolt</span>
                <span>Pre-Workout Strategy</span>
              </div>
              <p className="font-body-md text-xs text-secondary leading-relaxed">
                {selectedSport.preWorkout}
              </p>
            </div>

            <div className="bg-surface p-4 rounded-xl border border-outline-variant/30">
              <div className="flex items-center gap-2 text-primary font-label-md font-semibold text-xs mb-2">
                <span className="material-symbols-outlined text-[18px]">directions_run</span>
                <span>During Session</span>
              </div>
              <p className="font-body-md text-xs text-secondary leading-relaxed">
                {selectedSport.duringWorkout}
              </p>
            </div>

            <div className="bg-surface p-4 rounded-xl border border-outline-variant/30">
              <div className="flex items-center gap-2 text-primary font-label-md font-semibold text-xs mb-2">
                <span className="material-symbols-outlined text-[18px]">battery_charging_full</span>
                <span>Post-Workout Recovery</span>
              </div>
              <p className="font-body-md text-xs text-secondary leading-relaxed">
                {selectedSport.postWorkout}
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2 pt-4 border-t border-outline-variant/20">
            <span className="font-label-sm text-xs font-semibold text-secondary mr-2">Key Focus Areas:</span>
            {selectedSport.keyFocus.map((focus, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-surface-container-highest rounded-full text-xs font-medium text-on-surface"
              >
                {focus}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Pre/Post Workout Food Guide (Visual Comparison) */}
      <section className="bg-surface-container-low rounded-3xl p-6 sm:p-10 border border-outline-variant/30 shadow-ambient">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="font-headline font-bold text-2xl md:text-3xl text-on-background">
            Food Guide: Pre vs Post
          </h2>
          <p className="font-body-md text-secondary text-sm md:text-base mt-1">
            Practical, accessible whole-food combinations structured to hit your clinical macronutrient targets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          {/* Pre-Workout Column */}
          <div className="space-y-4">
            <h3 className="font-headline font-bold text-xl text-primary flex items-center justify-center gap-2 pb-2 border-b border-primary/20">
              <span className="material-symbols-outlined">bolt</span>
              <span>Fast Fuel (Pre-Workout)</span>
            </h3>

            {foodComparisonGuide.pre.map((item, idx) => (
              <div
                key={idx}
                className="bg-surface-container-lowest p-4 rounded-2xl shadow-sm border border-outline-variant/20 flex flex-col sm:flex-row items-center sm:items-start gap-4 hover:shadow-ambient transition-all"
              >
                <div className="w-20 h-20 rounded-xl bg-surface-container overflow-hidden shrink-0 shadow-xs">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                    <h4 className="font-headline font-bold text-base text-on-surface">{item.title}</h4>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                      {item.tag}
                    </span>
                  </div>
                  <p className="font-body-md text-xs text-secondary leading-relaxed mb-2">
                    {item.desc}
                  </p>
                  <div className="flex flex-wrap items-center justify-center sm:justify-between gap-1 text-[11px] text-on-surface-variant font-medium pt-1.5 border-t border-outline-variant/10">
                    <span className="text-primary font-mono font-semibold">{item.macros}</span>
                    <span className="text-secondary italic">{item.timing}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Post-Workout Column */}
          <div className="space-y-4">
            <h3 className="font-headline font-bold text-xl text-secondary flex items-center justify-center gap-2 pb-2 border-b border-secondary/20">
              <span className="material-symbols-outlined">build</span>
              <span>Recovery Fuel (Post-Workout)</span>
            </h3>

            {foodComparisonGuide.post.map((item, idx) => (
              <div
                key={idx}
                className="bg-surface-container-lowest p-4 rounded-2xl shadow-sm border border-outline-variant/20 flex flex-col sm:flex-row items-center sm:items-start gap-4 hover:shadow-ambient transition-all"
              >
                <div className="w-20 h-20 rounded-xl bg-surface-container overflow-hidden shrink-0 shadow-xs">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                    <h4 className="font-headline font-bold text-base text-on-surface">{item.title}</h4>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-secondary/10 text-secondary">
                      {item.tag}
                    </span>
                  </div>
                  <p className="font-body-md text-xs text-secondary leading-relaxed mb-2">
                    {item.desc}
                  </p>
                  <div className="flex flex-wrap items-center justify-center sm:justify-between gap-1 text-[11px] text-on-surface-variant font-medium pt-1.5 border-t border-outline-variant/10">
                    <span className="text-secondary font-mono font-semibold">{item.macros}</span>
                    <span className="text-secondary italic">{item.timing}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

