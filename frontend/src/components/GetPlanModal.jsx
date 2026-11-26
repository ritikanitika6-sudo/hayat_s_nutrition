import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { generatePersonalizedPlan } from '../services/api';

export default function GetPlanModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState('muscle-gain');
  const [diet, setDiet] = useState('vegetarian');
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('26');
  const [weight, setWeight] = useState('75');
  const [height, setHeight] = useState('178');
  const [activity, setActivity] = useState('1.55'); // moderate
  const [savedToBackend, setSavedToBackend] = useState(false);

  if (!isOpen) return null;

  // Calculate results on Step 3/4
  const numWeight = parseFloat(weight) || 70;
  const numHeight = parseFloat(height) || 175;
  const numAge = parseFloat(age) || 25;
  const numActivity = parseFloat(activity) || 1.55;

  // Mifflin-St Jeor equation
  let bmr = (10 * numWeight) + (6.25 * numHeight) - (5 * numAge);
  bmr = gender === 'male' ? bmr + 5 : bmr - 161;
  const tdee = Math.round(bmr * numActivity);

  let targetCalories = tdee;
  let proteinMultiplier = 1.8;
  let recommendedPlanId = 'vegetarian-athlete';
  let recommendedPlanName = 'Vegetarian Athlete';

  if (goal === 'muscle-gain') {
    targetCalories = tdee + 400;
    proteinMultiplier = 2.0;
    if (diet === 'vegan') {
      recommendedPlanId = 'vegan-athlete';
      recommendedPlanName = 'Vegan Athlete Protocol';
    } else if (diet === 'omnivore') {
      recommendedPlanId = 'hypertrophy-base';
      recommendedPlanName = 'Hypertrophy Base';
    } else {
      recommendedPlanId = 'vegetarian-athlete';
      recommendedPlanName = 'Vegetarian Athlete';
    }
  } else if (goal === 'fat-loss') {
    targetCalories = tdee - 450;
    proteinMultiplier = 2.2;
    recommendedPlanId = 'lean-performance';
    recommendedPlanName = 'Lean Performance Plan';
  } else if (goal === 'endurance') {
    targetCalories = tdee + 150;
    proteinMultiplier = 1.6;
    recommendedPlanId = 'endurance-protocol';
    recommendedPlanName = 'Endurance Protocol';
  } else {
    // recovery / wellness
    targetCalories = tdee;
    proteinMultiplier = 1.7;
    recommendedPlanId = diet === 'vegan' ? 'vegan-athlete' : 'vegetarian-athlete';
    recommendedPlanName = 'Balanced Clinical Protocol';
  }

  const targetProtein = Math.round(numWeight * proteinMultiplier);
  const targetFats = Math.round((targetCalories * 0.25) / 9);
  const targetCarbs = Math.round((targetCalories - (targetProtein * 4) - (targetFats * 9)) / 4);
  const hydrationLitres = ((numWeight * 0.035) + 0.6).toFixed(1);

  const resetModal = () => {
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-on-background/60 backdrop-blur-sm transition-opacity"
        onClick={resetModal}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-surface rounded-2xl shadow-2xl border border-outline-variant/30 overflow-hidden z-10 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-outline-variant/20 flex items-center justify-between bg-surface-container-low">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">assignment_turned_in</span>
              <h3 className="font-headline font-bold text-lg text-on-surface">Clinical Plan Generator</h3>
            </div>
            <p className="font-label-sm text-xs text-secondary">Step {step} of 3 • Personalized Sports Nutrition</p>
          </div>
          <button
            onClick={resetModal}
            className="p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-full transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h4 className="font-headline font-semibold text-base text-on-surface mb-1">
                  1. Select Your Primary Objective
                </h4>
                <p className="font-body-md text-xs text-secondary">
                  Your energy availability and macro distribution will be structured around this baseline.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'muscle-gain', label: 'Muscle Gain & Hypertrophy', icon: 'add_circle', sub: 'Caloric surplus for tissue growth' },
                  { id: 'fat-loss', label: 'Fat Loss & Preservation', icon: 'trending_down', sub: 'Deficit prioritizing lean mass' },
                  { id: 'endurance', label: 'Endurance & Stamina', icon: 'directions_run', sub: 'High glycogen turnover' },
                  { id: 'recovery', label: 'Recovery & Longevity', icon: 'health_and_safety', sub: 'Anti-inflammatory balance' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setGoal(item.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                      goal === item.id
                        ? 'border-primary bg-primary/5 shadow-sm ring-1 ring-primary'
                        : 'border-outline-variant/40 hover:bg-surface-container-low'
                    }`}
                  >
                    <span className={`material-symbols-outlined text-[24px] ${goal === item.id ? 'text-primary' : 'text-secondary'}`}>
                      {item.icon}
                    </span>
                    <div>
                      <div className="font-label-md font-semibold text-xs text-on-surface">{item.label}</div>
                      <div className="font-label-sm text-[11px] text-secondary mt-0.5">{item.sub}</div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <label className="block font-label-md text-xs text-on-surface mb-2 font-semibold">
                  Dietary Framework
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'vegetarian', label: 'Vegetarian' },
                    { id: 'vegan', label: '100% Vegan' },
                    { id: 'omnivore', label: 'Omnivore' },
                  ].map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setDiet(d.id)}
                      className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all ${
                        diet === d.id
                          ? 'border-primary bg-primary text-on-primary'
                          : 'border-outline-variant/40 bg-surface text-on-surface hover:bg-surface-container-low'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h4 className="font-headline font-semibold text-base text-on-surface mb-1">
                  2. Biometric Data &amp; Activity
                </h4>
                <p className="font-body-md text-xs text-secondary">
                  Precision calculations utilize the clinically validated Mifflin-St Jeor formula.
                </p>
              </div>

              {/* Gender toggle */}
              <div className="flex gap-4 p-1 bg-surface-container-low rounded-lg w-max">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${
                    gender === 'male' ? 'bg-primary text-on-primary shadow-sm' : 'text-secondary'
                  }`}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${
                    gender === 'female' ? 'bg-primary text-on-primary shadow-sm' : 'text-secondary'
                  }`}
                >
                  Female
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-label-sm text-xs text-secondary mb-1">Age (yrs)</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="input-field w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface-bright text-sm"
                  />
                </div>
                <div>
                  <label className="block font-label-sm text-xs text-secondary mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="input-field w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface-bright text-sm"
                  />
                </div>
                <div>
                  <label className="block font-label-sm text-xs text-secondary mb-1">Height (cm)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="input-field w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface-bright text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-label-sm text-xs text-secondary mb-1.5">
                  Training Frequency / Activity
                </label>
                <select
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  className="input-field w-full px-3 py-2.5 rounded-lg border border-outline-variant bg-surface-bright text-xs font-medium text-on-surface"
                >
                  <option value="1.2">Sedentary (Desk job, little to no exercise)</option>
                  <option value="1.375">Lightly Active (1-3 training sessions/week)</option>
                  <option value="1.55">Moderately Active (3-5 sessions/week, moderate intensity)</option>
                  <option value="1.725">Very Active (6-7 hard training sessions/week)</option>
                  <option value="1.9">Elite / Extreme (Two sessions per day or heavy physical labor)</option>
                </select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 text-center">
                <span className="inline-block px-3 py-0.5 rounded-full bg-primary text-on-primary text-[10px] font-bold uppercase tracking-wider mb-1.5">
                  Your Prescription
                </span>
                <div className="font-headline font-bold text-3xl text-primary">
                  {targetCalories} <span className="text-base font-normal text-secondary">kcal / day</span>
                </div>
                <p className="text-xs text-on-surface-variant mt-1">
                  Baseline TDEE: {tdee} kcal • Adjustment based on {goal.replace('-', ' ')}
                </p>
              </div>

              {/* Macronutrient Breakdown */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-surface-container-lowest p-3.5 rounded-xl border border-outline-variant/30 text-center">
                  <span className="font-label-sm text-[11px] text-secondary uppercase font-semibold">Protein</span>
                  <div className="font-headline font-bold text-xl text-primary mt-0.5">{targetProtein}g</div>
                  <span className="text-[10px] text-secondary block mt-0.5">{proteinMultiplier}g / kg</span>
                </div>
                <div className="bg-surface-container-lowest p-3.5 rounded-xl border border-outline-variant/30 text-center">
                  <span className="font-label-sm text-[11px] text-secondary uppercase font-semibold">Carbs</span>
                  <div className="font-headline font-bold text-xl text-tertiary mt-0.5">{targetCarbs}g</div>
                  <span className="text-[10px] text-secondary block mt-0.5">Energy &amp; Glycogen</span>
                </div>
                <div className="bg-surface-container-lowest p-3.5 rounded-xl border border-outline-variant/30 text-center">
                  <span className="font-label-sm text-[11px] text-secondary uppercase font-semibold">Healthy Fats</span>
                  <div className="font-headline font-bold text-xl text-secondary mt-0.5">{targetFats}g</div>
                  <span className="text-[10px] text-secondary block mt-0.5">Hormone Balance</span>
                </div>
              </div>

              {/* Recommended Meal Plan Card */}
              <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-primary tracking-wider">Matched Meal Plan</span>
                  <h5 className="font-headline font-semibold text-sm text-on-surface mt-0.5">
                    {recommendedPlanName}
                  </h5>
                  <p className="text-xs text-secondary mt-0.5">
                    Recommended daily hydration: <strong className="text-on-surface">{hydrationLitres} Liters</strong>
                  </p>
                </div>
                <Link
                  to="/meal-plans"
                  onClick={resetModal}
                  className="shrink-0 bg-primary text-on-primary font-label-md text-xs px-3.5 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
                >
                  View Plan
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 bg-surface-container-lowest border-t border-outline-variant/20 flex justify-between items-center">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-secondary hover:text-on-surface border border-outline-variant/40 hover:bg-surface-container transition-colors"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={() => {
                if (step === 2) {
                  generatePersonalizedPlan({
                    goal,
                    diet,
                    gender,
                    age: numAge,
                    weight: numWeight,
                    height: numHeight,
                    activity: numActivity
                  }).then(() => setSavedToBackend(true)).catch(() => {});
                }
                setStep(step + 1);
              }}
              className="bg-primary text-on-primary font-label-md text-xs px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-1.5"
            >
              <span>Continue</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={resetModal}
              className="bg-primary text-on-primary font-label-md text-xs px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

