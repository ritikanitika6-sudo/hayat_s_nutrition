# Hayat's Nutrition - Modern Clinical Performance (React Platform)

This is the production-ready React digital platform for **Hayat's Nutrition**, converted from the Stitch design specifications.

---

## 🚀 Features & Architecture

### Design System Compliance
- **Design Tokens:** Strict implementation of colors, elevation, border-radii, spacing, and typography specified in `clinical_performance/DESIGN.md`.
- **Typography:** Montserrat (Headlines) & Inter (Body copy and UI labels).
- **Color Palette:**
  - Fresh Green (`#006d37`) - Primary actions & vitality
  - Deep Navy (`#4e6073`) - Clinical stability & navigation
  - Warm Amber (`#865300` / `#f8a018`) - Performance accents
  - Clinical Neutral (`#f8f9fa`) - Background canvas
- **Tailwind CSS:** Configured with custom tokens, ambient shadows (`0 4px 24px rgba(44, 62, 80, 0.04)`), and responsive breakpoints.

---

## 📄 Converted Pages & Routes

1. **Home Page (`/`)**
   - **Hero Section:** "Fuel Your Body. Elevate Your Performance." with clinical badge, CTAs, and hero photography.
   - **Bento Grid:** Peak Performance, Strength & Muscle, Smart Recovery, and Body Composition.
   - **Primary Goal Cards:** Muscle Gain & Fat Loss bento cards with responsive layout.
   - **Hydration Hub (Interactive Tracker):** Live +250ml glass logging, animated fluid level cylinder, percentage calculation, status diagnostics, and reset function.

2. **Sports Nutrition Page (`/sports-nutrition`)**
   - **Hero Section:** "Nutrition That Works With Your Training".
   - **Timeline of Performance Bento Grid:**
     - Pre-Workout (Timing, Carbohydrates, Hydration)
     - During-Workout (Electrolytes, Session duration thresholds)
     - Post-Workout (Protein synthesis, Fluid replacement, Glycogen reload)
     - Rest-Day Adaptation (Anti-inflammatory, Omega-3s, Antioxidants)
   - **Interactive Sport Selector:** 8 specific sport categories (Gym & Hypertrophy, Running, Cycling, Football, Cricket, Swimming, Yoga & Pilates, General Active) with dynamic clinical macro targets and strategies.
   - **Pre vs Post Food Guide:** Visual comparison cards with photography, exact macros, and timing guidance.

3. **Performance Meal Plans (`/meal-plans`)**
   - **Interactive Filter Tabs:** All, Plant-Powered & Vegan, Hypertrophy & Bulking, Fat Loss & Cutting, Endurance & Cardio.
   - **5 Comprehensive Bento Cards:**
     - Vegetarian Athlete (Plant-Powered, Target Goal: Lean Muscle & Recovery)
     - Vegan Athlete (100% Plant-Based, Amino Acid Pairing)
     - Hypertrophy Base (High Calorie Surplus, Leucine Threshold)
     - Lean Performance (Caloric Deficit, Satiety & Preservation)
     - Endurance Protocol (Glycogen Loading, High-Volume Blocks)
   - **Daily Meal Routine Modal:** Clickable daily schedule with timing breakdown from breakfast to dinner.

4. **Clinical Calculators Page (`/calculators`)**
   - **BMI Calculator:** Real-time BMI score calculation with clinical category indicator.
   - **BMR Calculator:** Mifflin-St Jeor formula calculating baseline resting caloric requirements.
   - **TDEE & Energy Needs Calculator:** Activity multiplier with calculated maintenance, fat loss, and muscle gain targets.
   - **Protein Needs Estimator:** Slider-based intensity selector (Endurance 1.4g/kg, Athletic 1.8g/kg, Hypertrophy 2.2g/kg) with daily meal distribution.
   - **Hydration Estimator:** Bodyweight and workout duration fluid calculator (liters and glasses/day).

5. **Performance Goals Page (`/goals`)**
   - Muscle Gain & Hypertrophy, Fat Loss & Preservation, Aerobic & Endurance Peak, Cellular Recovery & Longevity.
   - Clinical physiology guidelines, caloric adjustments, protein rules, and direct links to matched meal plans.

6. **Clinical Recipes Page (`/recipes`)**
   - High-protein athletic recipes with preparation time, macro breakdown, ingredients, and step-by-step instructions.

7. **Shared Layout Components:**
   - **Navbar:** Sticky header with blur backdrop, active links, quick tools shortcut, and "Get Plan" trigger.
   - **NavigationDrawer:** Responsive slide-over menu with smooth overlay and active link highlights.
   - **MobileBottomNav:** Fixed bottom navigation for mobile viewports with Material Symbol icons.
   - **Footer:** Brand mission, Health Safety Disclaimer, Legal & Trust links, and platform navigation.
   - **GetPlanModal:** Interactive 3-step clinical assessment modal that takes user biometrics and outputs personalized caloric prescriptions, protein targets, and matched meal plans.

---

## 🛠️ How to Run Locally

```bash
# 1. Navigate to the frontend directory
cd frontend

# 2. Install dependencies (if not already installed)
npm install

# 3. Start development server
npm run dev

# 4. Build for production
npm run build

# 5. Preview production build
npm run preview
```

