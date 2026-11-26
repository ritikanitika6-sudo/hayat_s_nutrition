import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { hydrationService } from '../services/api';

export default function HomePage({ onOpenGetPlan }) {
  // Hydration Tracker state
  const [currentWater, setCurrentWater] = useState(750);
  const [isSyncing, setIsSyncing] = useState(false);
  const maxWater = 2500;
  const step = 250;

  useEffect(() => {
    hydrationService.get()
      .then((res) => {
        if (res.success && typeof res.data.currentWater === 'number') {
          setCurrentWater(res.data.currentWater);
        }
      })
      .catch(() => {
        // graceful offline fallback
      });
  }, []);

  const handleAddWater = async () => {
    const nextAmount = Math.min(currentWater + step, maxWater);
    setCurrentWater(nextAmount);
    setIsSyncing(true);
    try {
      await hydrationService.log(step);
    } catch {
      // offline fallback
    } finally {
      setIsSyncing(false);
    }
  };

  const handleResetWater = async () => {
    setCurrentWater(0);
    setIsSyncing(true);
    try {
      await hydrationService.reset();
    } catch {
      // offline fallback
    } finally {
      setIsSyncing(false);
    }
  };

  const waterPercentage = Math.min(Math.round((currentWater / maxWater) * 100), 100);
  const isFull = currentWater >= maxWater;

  return (
    <div className="pt-20 md:pt-24 max-w-7xl mx-auto px-margin-mobile md:px-gutter pb-xl flex flex-col gap-12 md:gap-16">
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mt-2 md:mt-6">
        <div className="flex flex-col gap-4 md:gap-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm rounded-full w-max shadow-sm border border-outline-variant/30">
            <span className="material-symbols-outlined text-[16px] text-primary">science</span>
            <span>Clinical Performance Nutrition</span>
          </div>

          <h1 className="font-headline font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[52px] leading-tight text-on-background tracking-tight">
            Fuel Your Body. <br className="hidden sm:block" />
            <span className="text-primary">Elevate Your Performance.</span>
          </h1>

          <p className="font-body-md text-base md:text-lg text-secondary max-w-xl leading-relaxed">
            Evidence-based sports nutrition designed to help you perform better, recover smarter, and build a healthier relationship with food. Precision formulations for everyday athletes.
          </p>

          <div className="flex flex-col sm:flex-row gap-3.5 mt-2">
            <button
              onClick={onOpenGetPlan}
              className="bg-primary text-on-primary font-label-md text-label-md px-7 py-3.5 rounded-xl hover:bg-primary/90 transition-all duration-200 shadow-[0_4px_14px_0_rgba(0,109,55,0.39)] hover:shadow-lg flex items-center justify-center gap-2 active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px]">assignment</span>
              <span>Get Your Nutrition Plan</span>
            </button>

            <Link
              to="/sports-nutrition"
              className="border-2 border-secondary text-secondary bg-transparent font-label-md text-label-md px-6 py-3.5 rounded-xl hover:bg-secondary/10 transition-colors flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Explore Sports Nutrition</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>

          {/* Quick Metrics Banner */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-outline-variant/30 mt-2">
            <div>
              <div className="font-headline font-bold text-xl md:text-2xl text-primary">100%</div>
              <div className="font-label-sm text-xs text-secondary mt-0.5">Clinical Rigor</div>
            </div>
            <div>
              <div className="font-headline font-bold text-xl md:text-2xl text-primary">5+</div>
              <div className="font-label-sm text-xs text-secondary mt-0.5">Performance Plans</div>
            </div>
            <div>
              <div className="font-headline font-bold text-xl md:text-2xl text-primary">8</div>
              <div className="font-label-sm text-xs text-secondary mt-0.5">Sport Frameworks</div>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative w-full h-[360px] sm:h-[440px] lg:h-[480px] rounded-3xl overflow-hidden shadow-card-lift border border-outline-variant/30 group">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent z-10" />
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyRtJwpFaY1YvA36aNxXLGYchSdW3ke35gO7O_M3rY71Ow4jhZqp9n4crDoKJ3sDqLtBxIx3-mhVbNDlIargzJKIJeC8INBPHsuXwF79tFcshs81lgd9mJHXDULIpjk2YfdrvQgQw9FEl72GnGcYb7RQOhl9NsC1Fiz02jfHaPHWfuYh-yAhpxljecFHhfnbwP_LZiV7jaH12mk4rFTNWUpggYe13Kyxhnjqx8UespNr9IDK25W2H4vw"
            alt="Athletic nutrition preparation in minimalist clinical kitchen"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute bottom-5 left-5 right-5 z-20 text-white flex justify-between items-end">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-primary/90 text-white font-label-sm text-[11px] uppercase tracking-wider mb-2 backdrop-blur-sm">
                Clean Scientific Aesthetic
              </span>
              <p className="font-headline font-bold text-base sm:text-lg">
                Precision Post-Workout Fueling
              </p>
            </div>
            <Link
              to="/meal-plans"
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold bg-white/20 hover:bg-white/30 backdrop-blur-md px-3.5 py-2 rounded-xl text-white transition-all"
            >
              <span>Explore Plans</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Benefits Bento Grid */}
      <section>
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-8">
          <h2 className="font-headline font-bold text-2xl md:text-3xl text-on-background">
            Engineered For Clinical Efficacy
          </h2>
          <p className="font-body-md text-sm md:text-base text-secondary mt-1">
            Built on physiological science to support human training demands without guesswork.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Benefit 1 */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-ambient border border-surface-container hover:shadow-ambient-md hover:-translate-y-0.5 transition-all flex flex-col gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-primary-container/20 group-hover:bg-primary-container/30 flex items-center justify-center text-primary transition-colors">
              <span className="material-symbols-outlined text-[26px]">speed</span>
            </div>
            <h3 className="font-headline font-bold text-lg text-on-surface">Peak Performance</h3>
            <p className="font-body-md text-secondary text-sm leading-relaxed">
              Optimize cellular energy systems for sustained output and delayed lactic fatigue during high-intensity blocks.
            </p>
          </div>

          {/* Benefit 2 */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-ambient border border-surface-container hover:shadow-ambient-md hover:-translate-y-0.5 transition-all flex flex-col gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-primary-container/20 group-hover:bg-primary-container/30 flex items-center justify-center text-primary transition-colors">
              <span className="material-symbols-outlined text-[26px]">fitness_center</span>
            </div>
            <h3 className="font-headline font-bold text-lg text-on-surface">Strength &amp; Muscle</h3>
            <p className="font-body-md text-secondary text-sm leading-relaxed">
              Targeted macronutrient profiles designed to support myofibrillar hypertrophy, power output, and structural remodeling.
            </p>
          </div>

          {/* Benefit 3 */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-ambient border border-surface-container hover:shadow-ambient-md hover:-translate-y-0.5 transition-all flex flex-col gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-primary-container/20 group-hover:bg-primary-container/30 flex items-center justify-center text-primary transition-colors">
              <span className="material-symbols-outlined text-[26px]">health_and_safety</span>
            </div>
            <h3 className="font-headline font-bold text-lg text-on-surface">Smart Recovery</h3>
            <p className="font-body-md text-secondary text-sm leading-relaxed">
              Accelerate tissue repair, down-regulate oxidative stress, and replenish depleted intramuscular glycogen stores.
            </p>
          </div>

          {/* Benefit 4 */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-ambient border border-surface-container hover:shadow-ambient-md hover:-translate-y-0.5 transition-all flex flex-col gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-primary-container/20 group-hover:bg-primary-container/30 flex items-center justify-center text-primary transition-colors">
              <span className="material-symbols-outlined text-[26px]">monitor_weight</span>
            </div>
            <h3 className="font-headline font-bold text-lg text-on-surface">Body Composition</h3>
            <p className="font-body-md text-secondary text-sm leading-relaxed">
              Sustainable protocols for fat oxidation and lean mass retention without severe or metabolic-damaging restriction.
            </p>
          </div>
        </div>
      </section>

      {/* Primary Goal Bento Cards */}
      <section className="flex flex-col gap-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="font-headline font-bold text-2xl md:text-3xl text-on-background">
              What's Your Primary Goal?
            </h2>
            <p className="font-body-md text-secondary text-sm md:text-base mt-1">
              Select your focus area to discover tailored nutrition strategies and precise macronutrient guidance.
            </p>
          </div>
          <Link
            to="/goals"
            className="text-primary font-semibold text-sm flex items-center gap-1 hover:underline"
          >
            <span>View All Goal Protocols</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Goal Card 1: Muscle Gain */}
          <Link
            to="/goals"
            className="group relative overflow-hidden rounded-2xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col md:flex-row shadow-sm hover:shadow-ambient-md transition-all duration-300 hover:border-primary/40 cursor-pointer"
          >
            <div className="p-6 md:p-8 flex flex-col justify-between flex-1 z-10 bg-white">
              <div>
                <div className="w-11 h-11 rounded-full bg-surface-container flex items-center justify-center text-primary mb-4 group-hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined text-[22px]">add_circle</span>
                </div>
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-label-sm text-[10px] uppercase font-bold tracking-wider mb-2">
                  Hypercaloric Protocol
                </div>
                <h3 className="font-headline font-bold text-xl md:text-2xl text-on-surface mb-2">
                  Muscle Gain
                </h3>
                <p className="font-body-md text-secondary text-sm mb-6 leading-relaxed">
                  Hypercaloric protocols and precise protein timing for maximal tissue synthesis and strength gains.
                </p>
              </div>

              <span className="font-label-md text-label-md text-primary font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                <span>Explore Protocol</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </span>
            </div>

            <div className="w-full md:w-2/5 h-48 md:h-auto bg-surface-container-high relative overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgY9twl5cWwkbK55EHDqDlrrgwOUEddmi7YT7H62NJlBIikXOobBGYzIftUD-BcXiMw0WIJKyOgl1AllcdsU_QKbNC8PCtA50jUY7DNc4y-wsqVoZKliO7N4RfwNypWHN6nC6h_GpXkVrvXKU1U2y_67elKQ9Q-jr3bMPvYZOZEcGAmg0_X3RCyaNTH38P4Iwc0uUCNTDUFZ80x6DXRgXp9zV7dJcyy8HeGtGIr542pDq8FsbjU1NTBQ"
                alt="Strength dumbbells in modern fitness environment"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </Link>

          {/* Goal Card 2: Fat Loss */}
          <Link
            to="/goals"
            className="group relative overflow-hidden rounded-2xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col md:flex-row shadow-sm hover:shadow-ambient-md transition-all duration-300 hover:border-primary/40 cursor-pointer"
          >
            <div className="p-6 md:p-8 flex flex-col justify-between flex-1 z-10 bg-white">
              <div>
                <div className="w-11 h-11 rounded-full bg-surface-container flex items-center justify-center text-primary mb-4 group-hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined text-[22px]">trending_down</span>
                </div>
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-secondary/10 text-secondary font-label-sm text-[10px] uppercase font-bold tracking-wider mb-2">
                  Hypocaloric Strategy
                </div>
                <h3 className="font-headline font-bold text-xl md:text-2xl text-on-surface mb-2">
                  Fat Loss
                </h3>
                <p className="font-body-md text-secondary text-sm mb-6 leading-relaxed">
                  Hypocaloric strategies focusing on high satiety, micronutrient density, and complete lean mass preservation.
                </p>
              </div>

              <span className="font-label-md text-label-md text-primary font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                <span>Explore Protocol</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </span>
            </div>

            <div className="w-full md:w-2/5 h-48 md:h-auto bg-surface-container-high relative overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaTGGz3RAWPXYcxVfNE-IZb2mJlu4c0BZgBCDuftxd-WqzzhM8j9jEicp3Ux8WnmHgnKBdMccfe44BtJZOaL9ShiV9hEQYoU6PkPF31KVImgNWxoLCokp2MF5yvpHk7RhSe9wdb857Zbm5qF5pkANjgRH2kpJMdX4AKy_3100S0cC7gqus6xxMdWzbcD3OBSiQDH9_uqRxQZ0dKupQ-dUut9J-v0RvG24BRt01WH0N3-T19osBbStXDg"
                alt="Precision portioned meal with lean protein and greens"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </Link>
        </div>
      </section>

      {/* Hydration Hub (Interactive UI Tracker) */}
      <section className="bg-surface-container-low rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row gap-8 lg:gap-12 items-center border border-outline-variant/30 shadow-ambient">
        <div className="flex-1 flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary font-label-sm text-label-sm rounded-full w-max">
            <span className="material-symbols-outlined text-[16px] text-primary">water_drop</span>
            <span>Interactive Daily Tracker</span>
          </div>

          <h2 className="font-headline font-bold text-2xl md:text-3xl text-on-background">
            Hydrate. Perform. Recover.
          </h2>

          <p className="font-body-md text-secondary leading-relaxed max-w-xl">
            Proper cellular hydration is critical for nutrient transport, temperature regulation, blood volume maintenance, and athletic output. Log each intake to maintain optimal hydration.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-2">
            <button
              onClick={handleAddWater}
              disabled={isFull}
              className={`px-5 py-3 rounded-xl font-label-md text-sm font-semibold flex items-center gap-2 shadow-sm transition-all duration-200 ${isFull
                ? 'bg-outline-variant text-secondary cursor-not-allowed opacity-60'
                : 'bg-primary text-on-primary hover:bg-primary/90 hover:shadow-subtle active:scale-95'
                }`}
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
              <span>+250ml Glass</span>
            </button>

            <button
              onClick={handleResetWater}
              className="px-4 py-3 rounded-xl font-label-sm text-xs font-semibold text-secondary hover:text-on-surface border border-outline-variant/40 hover:bg-surface-container transition-colors"
            >
              Reset Tracker
            </button>
          </div>

          {/* Hydration status indicator */}
          <div className="flex items-center gap-2 mt-2 text-xs font-medium">
            <span className={`w-2.5 h-2.5 rounded-full ${isFull ? 'bg-primary-container animate-pulse' : 'bg-secondary'}`} />
            <span className="text-secondary">
              {isFull
                ? 'Target achieved! Optimal cellular fluid balance reached.'
                : `${maxWater - currentWater}ml remaining until daily athletic hydration target.`}
            </span>
          </div>
        </div>

        {/* Visual Water Tank Tracker */}
        <div className="w-full md:w-auto flex justify-center shrink-0">
          <div className="relative w-52 h-72 bg-surface-container-highest rounded-[2.5rem] border-4 border-surface shadow-inner overflow-hidden flex flex-col justify-end items-center pb-4">
            {/* Water Fill Level with Smooth Animation */}
            <div
              className={`water-fill absolute bottom-0 left-0 right-0 ${isFull ? 'bg-primary-container/85' : 'bg-secondary-fixed/85'
                }`}
              style={{ height: `${waterPercentage}%` }}
            />

            {/* Bubble effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />

            {/* Numeric Tracker Overlay */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full w-full pointer-events-none text-center px-4">
              <span className="font-headline font-bold text-4xl text-on-surface">
                {currentWater}
              </span>
              <span className="font-label-md text-xs text-secondary mt-0.5">
                / {maxWater} ml
              </span>
              <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-surface/80 text-[11px] font-semibold text-primary backdrop-blur-xs">
                {waterPercentage}% Complete
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access to Tools Banner */}
      <section className="bg-primary text-on-primary rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-ambient-md">
        <div className="max-w-xl">
          <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white font-label-sm text-[11px] uppercase tracking-wider mb-2">
            Clinical Tools
          </span>
          <h3 className="font-headline font-bold text-2xl sm:text-3xl">
            Calculate Your Baselines In Seconds
          </h3>
          <p className="text-white/80 text-sm md:text-base mt-2 leading-relaxed">
            Establish your BMI, Resting Metabolic Rate (BMR), Total Daily Energy Expenditure (TDEE), and daily protein target.
          </p>
        </div>
        <Link
          to="/calculators"
          className="bg-white text-primary font-label-md text-sm font-bold px-6 py-3.5 rounded-xl hover:bg-white/90 transition-all shadow-md shrink-0 flex items-center gap-2 active:scale-95"
        >
          <span className="material-symbols-outlined text-[20px]">calculate</span>
          <span>Open Calculators</span>
        </Link>
      </section>
    </div>
  );
}

