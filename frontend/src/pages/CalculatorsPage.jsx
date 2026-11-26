import React, { useState } from 'react';

export default function CalculatorsPage({ onOpenGetPlan }) {
  // 1. BMI Calculator State
  const [bmiWeight, setBmiWeight] = useState(75);
  const [bmiHeight, setBmiHeight] = useState(178);
  const [bmiResult, setBmiResult] = useState(null);

  const calculateBmi = () => {
    const w = parseFloat(bmiWeight);
    const h = parseFloat(bmiHeight) / 100;
    if (w > 0 && h > 0) {
      const val = +(w / (h * h)).toFixed(1);
      let cat = 'Normal Weight';
      let color = 'text-primary';
      if (val < 18.5) {
        cat = 'Underweight';
        color = 'text-secondary';
      } else if (val >= 25 && val < 29.9) {
        cat = 'Overweight';
        color = 'text-tertiary';
      } else if (val >= 30) {
        cat = 'Obese Range';
        color = 'text-error';
      }
      setBmiResult({ val, cat, color });
    }
  };

  // 2. BMR Calculator State
  const [bmrGender, setBmrGender] = useState('male');
  const [bmrAge, setBmrAge] = useState(28);
  const [bmrWeight, setBmrWeight] = useState(75);
  const [bmrHeight, setBmrHeight] = useState(178);
  const [bmrResult, setBmrResult] = useState(null);

  const calculateBmr = () => {
    const w = parseFloat(bmrWeight);
    const h = parseFloat(bmrHeight);
    const a = parseFloat(bmrAge);
    if (w > 0 && h > 0 && a > 0) {
      let b = (10 * w) + (6.25 * h) - (5 * a);
      b = bmrGender === 'male' ? b + 5 : b - 161;
      setBmrResult(Math.round(b));
    }
  };

  // 3. TDEE & Energy Needs State
  const [tdeeBmr, setTdeeBmr] = useState(1750);
  const [activityLevel, setActivityLevel] = useState('1.55');
  const [tdeeResult, setTdeeResult] = useState(null);

  const calculateTdee = () => {
    const base = parseFloat(tdeeBmr);
    const act = parseFloat(activityLevel);
    if (base > 0) {
      const maintenance = Math.round(base * act);
      setTdeeResult({
        maintenance,
        fatLoss: maintenance - 450,
        muscleGain: maintenance + 400
      });
    }
  };

  // 4. Protein Estimator State
  const [proteinWeight, setProteinWeight] = useState(75);
  const [goalIntensity, setGoalIntensity] = useState('2'); // 1: Endurance, 2: Maintenance, 3: Strength
  const [proteinResult, setProteinResult] = useState(null);

  const calculateProtein = () => {
    const w = parseFloat(proteinWeight);
    if (w > 0) {
      let mult = 1.4;
      let label = 'Endurance Conditioning (1.4g/kg)';
      if (goalIntensity === '2') {
        mult = 1.8;
        label = 'Athletic Maintenance (1.8g/kg)';
      } else if (goalIntensity === '3') {
        mult = 2.2;
        label = 'Strength & Hypertrophy (2.2g/kg)';
      }
      setProteinResult({
        grams: Math.round(w * mult),
        label
      });
    }
  };

  // 5. Hydration Estimator State
  const [hydroWeight, setHydroWeight] = useState(75);
  const [hydroExercise, setHydroExercise] = useState(1);
  const [hydroResult, setHydroResult] = useState(null);

  const calculateHydration = () => {
    const w = parseFloat(hydroWeight);
    const ex = parseFloat(hydroExercise) || 0;
    if (w > 0) {
      // Base: 35ml per kg + 600ml per hour of moderate exercise
      const ml = Math.round((w * 35) + (ex * 600));
      const litres = (ml / 1000).toFixed(1);
      const glasses = Math.round(ml / 250);
      setHydroResult({ ml, litres, glasses });
    }
  };

  return (
    <div className="pt-20 md:pt-24 max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop pb-xl flex flex-col gap-10 md:gap-14">
      {/* Header Section */}
      <section className="mt-2 md:mt-6 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm rounded-full w-max shadow-sm border border-outline-variant/30 mb-3 mx-auto md:mx-0">
            <span className="material-symbols-outlined text-[16px] text-primary">calculate</span>
            <span>Clinical Performance Diagnostics</span>
          </div>
          <h1 className="font-headline font-bold text-3xl sm:text-4xl md:text-5xl text-on-background tracking-tight mb-3">
            Nutrition Tools
          </h1>
          <p className="font-body-md text-base md:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
            Clinical-grade calculators designed to optimize your performance. Establish your baselines, determine your requirements, and fuel your goals with precision.
          </p>
        </div>

        <div
          className="hidden md:block w-44 h-44 rounded-3xl overflow-hidden shadow-card-lift border border-outline-variant/30 shrink-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuC7fyjIRjTFrqbz2QkM7xTDVBIFHUcnFq1V1pKQanK4HGx2VvM9L6lRFkTzyoV8jlBmuWop5Rp1SafdAKA-EREcJtnI_c2BKAB-eofvGZiz-cYvbvxgVUwCkriqrBpr6RlZVhAR8hL2jsrP-0FGwlehbOZlVxZf8Qf34nhNDe_f824sFIAzz4zWvI1-giIsUqM9uiQHOgNjvFQ6LDvO4cWqyir0ZCL6jE4cbpOV5avFwnUoquZGWIgUlg')`,
          }}
        />
      </section>

      {/* Bento Grid Calculators: Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* BMI & BMR Cluster (Left Column - 5 cols) */}
        <div className="md:col-span-5 flex flex-col gap-6">
          {/* BMI Calculator */}
          <div className="glass-card rounded-2xl p-6 border border-outline-variant/30">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[22px]">monitor_weight</span>
              </div>
              <div>
                <h2 className="font-headline font-bold text-lg text-on-surface">BMI Calculator</h2>
                <span className="text-[11px] text-secondary font-label-sm">Body Mass Index Screener</span>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                calculateBmi();
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-label-sm text-xs text-on-surface-variant block mb-1 font-semibold">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    value={bmiWeight}
                    onChange={(e) => setBmiWeight(e.target.value)}
                    className="input-field w-full rounded-xl border border-outline-variant bg-surface-bright px-3.5 py-2 font-body-md text-sm text-on-surface"
                    placeholder="75"
                  />
                </div>
                <div>
                  <label className="font-label-sm text-xs text-on-surface-variant block mb-1 font-semibold">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    value={bmiHeight}
                    onChange={(e) => setBmiHeight(e.target.value)}
                    className="input-field w-full rounded-xl border border-outline-variant bg-surface-bright px-3.5 py-2 font-body-md text-sm text-on-surface"
                    placeholder="180"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full font-label-md text-xs font-semibold bg-primary text-on-primary rounded-xl py-3 hover:bg-primary/90 transition-colors shadow-sm"
              >
                Calculate BMI
              </button>

              {bmiResult && (
                <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-center animate-fadeIn">
                  <div className="text-xs text-secondary font-medium">Your BMI Score:</div>
                  <div className={`font-headline font-bold text-2xl ${bmiResult.color}`}>
                    {bmiResult.val}
                  </div>
                  <span className="font-label-sm text-xs font-bold text-on-surface">
                    {bmiResult.cat}
                  </span>
                </div>
              )}
            </form>
          </div>

          {/* BMR Calculator */}
          <div className="glass-card rounded-2xl p-6 border border-outline-variant/30">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[22px]">local_fire_department</span>
              </div>
              <div>
                <h2 className="font-headline font-bold text-lg text-on-surface">BMR Calculator</h2>
                <span className="text-[11px] text-secondary font-label-sm">Basal Metabolic Rate</span>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                calculateBmr();
              }}
              className="space-y-4"
            >
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
                  <input
                    type="radio"
                    name="bmr_gender"
                    checked={bmrGender === 'male'}
                    onChange={() => setBmrGender('male')}
                    className="text-primary focus:ring-primary w-4 h-4"
                  />
                  <span>Male</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
                  <input
                    type="radio"
                    name="bmr_gender"
                    checked={bmrGender === 'female'}
                    onChange={() => setBmrGender('female')}
                    className="text-primary focus:ring-primary w-4 h-4"
                  />
                  <span>Female</span>
                </label>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                <div>
                  <label className="font-label-sm text-[11px] text-on-surface-variant block mb-1 font-semibold">
                    Age
                  </label>
                  <input
                    type="number"
                    value={bmrAge}
                    onChange={(e) => setBmrAge(e.target.value)}
                    className="input-field w-full rounded-xl border border-outline-variant bg-surface-bright px-2.5 py-2 text-xs text-on-surface"
                  />
                </div>
                <div>
                  <label className="font-label-sm text-[11px] text-on-surface-variant block mb-1 font-semibold">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    value={bmrWeight}
                    onChange={(e) => setBmrWeight(e.target.value)}
                    className="input-field w-full rounded-xl border border-outline-variant bg-surface-bright px-2.5 py-2 text-xs text-on-surface"
                  />
                </div>
                <div>
                  <label className="font-label-sm text-[11px] text-on-surface-variant block mb-1 font-semibold">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    value={bmrHeight}
                    onChange={(e) => setBmrHeight(e.target.value)}
                    className="input-field w-full rounded-xl border border-outline-variant bg-surface-bright px-2.5 py-2 text-xs text-on-surface"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full font-label-md text-xs font-semibold bg-primary text-on-primary rounded-xl py-3 hover:bg-primary/90 transition-colors shadow-sm"
              >
                Calculate BMR
              </button>

              {bmrResult && (
                <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-center animate-fadeIn">
                  <div className="text-xs text-secondary font-medium">Estimated Basal Caloric Burn:</div>
                  <div className="font-headline font-bold text-2xl text-primary">
                    {bmrResult} <span className="text-xs font-normal text-secondary">kcal / day</span>
                  </div>
                  <span className="text-[11px] text-secondary">Energy required at complete rest</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Main Energy & Macros (Hero Card Right Column - 7 cols) */}
        <div className="md:col-span-7 flex flex-col">
          <div className="glass-card rounded-2xl p-6 sm:p-8 h-full flex flex-col relative overflow-hidden border border-outline-variant/30">
            <div className="absolute top-0 right-0 w-72 h-72 bg-primary-container/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined fill-icon text-[26px]">bolt</span>
              </div>
              <div>
                <h2 className="font-headline font-bold text-xl sm:text-2xl text-on-surface">
                  Estimated Energy Needs
                </h2>
                <p className="font-label-sm text-xs text-secondary">
                  Total Daily Energy Expenditure (TDEE) &amp; Goal Targets
                </p>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                calculateTdee();
              }}
              className="space-y-6 flex-grow flex flex-col justify-between relative z-10"
            >
              <div className="space-y-4">
                <div>
                  <label className="font-label-sm text-xs text-on-surface-variant block mb-1 font-semibold">
                    Base BMR (kcal)
                  </label>
                  <input
                    type="number"
                    value={tdeeBmr}
                    onChange={(e) => setTdeeBmr(e.target.value)}
                    className="input-field w-full sm:w-1/2 rounded-xl border border-outline-variant bg-surface-bright px-3.5 py-2.5 font-body-md text-sm text-on-surface"
                    placeholder="e.g. 1750"
                  />
                </div>

                <div>
                  <label className="font-label-sm text-xs text-on-surface-variant block mb-2 font-semibold">
                    Activity Level Multiplier
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { val: '1.2', title: 'Sedentary', sub: 'Desk work, little or no exercise' },
                      { val: '1.375', title: 'Light Exercise', sub: '1-3 light sessions per week' },
                      { val: '1.55', title: 'Moderate / Active', sub: '3-5 training sessions/week' },
                      { val: '1.725', title: 'Very Active', sub: '6-7 heavy athletic workouts' },
                    ].map((item) => (
                      <label
                        key={item.val}
                        className={`border rounded-xl p-3.5 cursor-pointer transition-all flex items-start gap-3 ${
                          activityLevel === item.val
                            ? 'border-primary bg-primary/5 ring-1 ring-primary'
                            : 'border-outline-variant/40 hover:bg-surface-container-low'
                        }`}
                      >
                        <input
                          type="radio"
                          name="activity"
                          value={item.val}
                          checked={activityLevel === item.val}
                          onChange={(e) => setActivityLevel(e.target.value)}
                          className="mt-0.5 text-primary focus:ring-primary"
                        />
                        <div>
                          <span className="block font-label-md text-xs font-semibold text-on-surface">
                            {item.title}
                          </span>
                          <span className="block font-label-sm text-[11px] text-secondary mt-0.5">
                            {item.sub}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {tdeeResult && (
                <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 grid grid-cols-3 gap-3 text-center animate-fadeIn">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-secondary block">Maintenance</span>
                    <strong className="text-lg font-headline text-on-surface">{tdeeResult.maintenance}</strong>
                    <span className="text-[10px] text-secondary block">kcal/day</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-secondary block">Fat Loss (-450)</span>
                    <strong className="text-lg font-headline text-secondary">{tdeeResult.fatLoss}</strong>
                    <span className="text-[10px] text-secondary block">kcal/day</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-primary block">Muscle Gain (+400)</span>
                    <strong className="text-lg font-headline text-primary">{tdeeResult.muscleGain}</strong>
                    <span className="text-[10px] text-primary block">kcal/day</span>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-outline/10 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  className="font-label-md text-xs font-semibold bg-primary text-on-primary rounded-xl px-7 py-3 hover:bg-primary/90 transition-colors shadow-sm"
                >
                  Calculate Energy Needs
                </button>
                <button
                  type="button"
                  onClick={onOpenGetPlan}
                  className="font-label-md text-xs font-semibold text-primary hover:underline px-3 py-2"
                >
                  Generate Complete Assessment →
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Secondary Calculators Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Protein Needs Estimator */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-outline-variant/30">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface">
              <span className="material-symbols-outlined text-[22px]">fitness_center</span>
            </div>
            <div>
              <h2 className="font-headline font-bold text-lg text-on-surface">
                Protein Needs Estimator
              </h2>
              <span className="text-[11px] text-secondary font-label-sm">
                Optimized Muscle Protein Synthesis
              </span>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              calculateProtein();
            }}
            className="space-y-4"
          >
            <div>
              <label className="font-label-sm text-xs text-on-surface-variant block mb-1 font-semibold">
                Weight (kg)
              </label>
              <input
                type="number"
                value={proteinWeight}
                onChange={(e) => setProteinWeight(e.target.value)}
                className="input-field w-full rounded-xl border border-outline-variant bg-surface-bright px-3.5 py-2 font-body-md text-sm text-on-surface"
              />
            </div>

            <div>
              <label className="font-label-sm text-xs text-on-surface-variant block mb-2 flex justify-between font-semibold">
                <span>Training Focus</span>
                <span className="text-primary">
                  {goalIntensity === '1' ? 'Endurance' : goalIntensity === '2' ? 'Maintenance' : 'Hypertrophy'}
                </span>
              </label>
              <input
                type="range"
                min="1"
                max="3"
                value={goalIntensity}
                onChange={(e) => setGoalIntensity(e.target.value)}
                className="w-full accent-primary cursor-pointer"
              />
              <div className="flex justify-between font-label-sm text-[11px] text-secondary mt-1">
                <span>Endurance (1.4g/kg)</span>
                <span>Athletic (1.8g/kg)</span>
                <span>Hypertrophy (2.2g/kg)</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full font-label-md text-xs font-semibold bg-primary text-on-primary rounded-xl py-3 hover:bg-primary/90 transition-colors shadow-sm"
            >
              Estimate Protein Target
            </button>

            {proteinResult && (
              <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-center animate-fadeIn">
                <div className="text-xs text-secondary font-medium">{proteinResult.label}</div>
                <div className="font-headline font-bold text-2xl text-primary mt-0.5">
                  {proteinResult.grams} <span className="text-xs font-normal text-secondary">grams / day</span>
                </div>
                <span className="text-[11px] text-secondary">
                  ~{Math.round(proteinResult.grams / 4)}g across 4 daily meals
                </span>
              </div>
            )}
          </form>
        </div>

        {/* Hydration Needs Estimator */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-outline-variant/30">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[22px] text-secondary">water_drop</span>
            </div>
            <div>
              <h2 className="font-headline font-bold text-lg text-on-surface">Hydration Estimator</h2>
              <span className="text-[11px] text-secondary font-label-sm">
                Thermoregulation &amp; Plasma Volume
              </span>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              calculateHydration();
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-label-sm text-xs text-on-surface-variant block mb-1 font-semibold">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={hydroWeight}
                  onChange={(e) => setHydroWeight(e.target.value)}
                  className="input-field w-full rounded-xl border border-outline-variant bg-surface-bright px-3.5 py-2 font-body-md text-sm text-on-surface"
                />
              </div>
              <div>
                <label className="font-label-sm text-xs text-on-surface-variant block mb-1 font-semibold">
                  Exercise (hrs/day)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={hydroExercise}
                  onChange={(e) => setHydroExercise(e.target.value)}
                  className="input-field w-full rounded-xl border border-outline-variant bg-surface-bright px-3.5 py-2 font-body-md text-sm text-on-surface"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full font-label-md text-xs font-semibold bg-primary text-on-primary rounded-xl py-3 hover:bg-primary/90 transition-colors shadow-sm"
            >
              Calculate Hydration Needs
            </button>

            {hydroResult && (
              <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-center animate-fadeIn">
                <div className="text-xs text-secondary font-medium">Daily Fluid Requirement:</div>
                <div className="font-headline font-bold text-2xl text-secondary mt-0.5">
                  {hydroResult.litres} <span className="text-xs font-normal text-secondary">Liters / day</span>
                </div>
                <span className="text-[11px] text-secondary">
                  Equivalent to ~{hydroResult.glasses} glasses (250ml each)
                </span>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Clinical Disclaimer Section */}
      <section className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/30 text-center md:text-left flex items-start gap-4">
        <span className="material-symbols-outlined text-secondary text-[24px] mt-0.5 shrink-0">info</span>
        <p className="font-label-sm text-xs text-on-surface-variant leading-relaxed">
          These tools provide estimates based on general scientific models (Mifflin-St Jeor equation and ACSM athletic guidelines). They are not a substitute for professional medical or personalized clinical nutrition advice. Consult with a Hayat nutritionist for a tailored plan.
        </p>
      </section>
    </div>
  );
}

