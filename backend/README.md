# Hayat's Nutrition - Backend REST API

This is the Express & Node.js backend server designed for **Hayat's Nutrition Digital Platform**. It serves evidence-based sports nutrition protocols, clinical calculators, persistent hydration tracking, plan generation, and nutritionist consultation requests.

---

## 🏗️ Architecture & Directory Structure

```
backend/
├── config/
├── data/
│   ├── seedData.js        # Default clinical and sports dataset
│   ├── storage.js         # JSON storage engine & persistence manager
│   └── storage.json       # Live database file (auto-seeded)
├── middleware/
│   ├── auth.js            # Optional API key authorization & role assignment
│   └── errorHandler.js    # 404 handler and global exception handler
├── routes/
│   ├── sports.js          # Sports performance endpoints (/api/sports)
│   ├── mealPlans.js       # Meal plan protocols (/api/meal-plans)
│   ├── recipes.js         # Athletic recipes (/api/recipes)
│   ├── goals.js           # Clinical performance goals (/api/goals)
│   ├── foodGuides.js      # Pre & Post workout food guides (/api/food-guides)
│   ├── calculators.js     # Clinical calculators (/api/calculators/*)
│   ├── hydration.js       # Live hydration tracker (/api/hydration/*)
│   ├── plans.js           # Assessment & plan generator (/api/plans/*)
│   └── consultations.js   # Consultation appointment bookings (/api/consultations)
├── server.js              # Express app entrypoint, CORS & middleware
├── package.json           # Dependencies & run scripts
├── .env.example           # Environment variable template
└── .env                   # Local configuration
```

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
Create or edit `.env`:
```env
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000,http://localhost:5173
API_SECRET_KEY=hayat-clinical-secret-2026
```

### 3. Start the Server
```bash
# Production mode
npm start

# Development mode (with live reload)
npm run dev
```

The server will boot up at: **`http://localhost:5000`**

---

## 📚 API Reference

### Health & Diagnostics
- **`GET /api/health`**
  - Returns server health status, uptime, node version, and catalog of active endpoints.
- **`GET /api/stats`**
  - Returns platform metrics (total meal plans, sports supported, generated plans, hydration intake).

---

### Sports Nutrition (`/api/sports`)
- **`GET /api/sports`**
  - Returns all 8 athletic categories (Gym & Hypertrophy, Running, Cycling, Football, Cricket, Swimming, Yoga, General Active) with pre/intra/post workout guidelines.
- **`GET /api/sports/:id`**
  - Returns recommendations for a specific sport (e.g. `gym`, `running`).

---

### Meal Plans (`/api/meal-plans`)
- **`GET /api/meal-plans`**
  - Returns structured performance meal plans.
  - Supports query parameters: `?category=plant|muscle|fatloss|endurance` and `?search=quinoa`.
- **`GET /api/meal-plans/:id`**
  - Returns full meal plan details including the complete daily meal schedule.
- **`POST /api/meal-plans`**
  - Create a new meal plan template.
- **`PUT /api/meal-plans/:id`**
  - Update an existing meal plan.
- **`DELETE /api/meal-plans/:id`**
  - Delete a meal plan.

---

### Clinical Performance Recipes (`/api/recipes`)
- **`GET /api/recipes`**
  - Returns high-protein performance recipes. Supports `?category=Breakfast` and `?search=smoothie`.
- **`GET /api/recipes/:id`**
  - Returns single recipe with full ingredients list and cooking directions.
- **`POST /api/recipes`**
  - Add a new performance recipe.
- **`PUT /api/recipes/:id`** / **`DELETE /api/recipes/:id`**
  - Update or delete recipes.

---

### Goals & Physiology (`/api/goals`)
- **`GET /api/goals`**
  - Returns 4 primary performance goals (Muscle Gain, Fat Loss, Endurance Peak, Cellular Recovery).
- **`GET /api/goals/:id`**
  - Returns targeted physiology guidelines, caloric rules, and protein thresholds.

---

### Food Guides (`/api/food-guides`)
- **`GET /api/food-guides`**
  - Returns Pre vs Post workout visual comparison food guide.
- **`GET /api/food-guides/pre`** or **`GET /api/food-guides/post`**
  - Filter specifically by timing window.

---

### Clinical Calculators (`/api/calculators`)
- **`POST /api/calculators/bmi`**
  - Body: `{ "weight": 75, "height": 180 }`
  - Returns: BMI score, clinical classification (Underweight, Normal, Overweight, Obese), and ideal healthy weight range.
- **`POST /api/calculators/bmr`**
  - Body: `{ "gender": "male", "age": 26, "weight": 75, "height": 180 }`
  - Returns: Basal Metabolic Rate via Mifflin-St Jeor equation.
- **`POST /api/calculators/tdee`**
  - Body: `{ "bmr": 1750, "activityMultiplier": 1.55 }`
  - Returns: Maintenance, fat loss (-450 kcal), and muscle gain (+400 kcal) targets.
- **`POST /api/calculators/protein`**
  - Body: `{ "weight": 75, "intensity": "hypertrophy" }`
  - Returns: Daily protein target in grams and per-meal leucine threshold distribution.
- **`POST /api/calculators/hydration`**
  - Body: `{ "weight": 75, "exerciseHours": 1.5 }`
  - Returns: Fluid requirement in liters and number of 250ml glasses.
- **`POST /api/calculators/all`**
  - Runs all 5 calculations in a single composite payload.

---

### Live Hydration Tracker (`/api/hydration`)
- **`GET /api/hydration`**
  - Returns current logged intake, percentage towards 2500ml goal, and status.
- **`POST /api/hydration/add`**
  - Body: `{ "amount": 250 }`
  - Increments intake and logs a timestamped entry.
- **`POST /api/hydration/reset`**
  - Resets today's water tracker to 0.
- **`GET /api/hydration/history`**
  - Returns all timestamped logs.

---

### Personalized Plan Generator (`/api/plans`)
- **`POST /api/plans/generate`**
  - Body:
    ```json
    {
      "userName": "Athlete",
      "goal": "muscle-gain",
      "diet": "vegetarian",
      "gender": "male",
      "age": 26,
      "weight": 75,
      "height": 180,
      "activity": 1.55
    }
    ```
  - Returns: Personalized clinical prescription (BMR, TDEE, exact calorie surplus/deficit, protein/carb/fat split, hydration requirement, and matched meal plan). Automatically saved in storage.
- **`GET /api/plans/saved`**
  - Returns all generated user plans.

---

### Consultations (`/api/consultations`)
- **`POST /api/consultations`**
  - Body: `{ "name": "Alex", "email": "alex@example.com", "phone": "555-1234", "sport": "Gym", "goal": "Muscle Gain", "notes": "Need competition prep" }`
  - Submits an appointment request to a Hayat clinical sports nutritionist.
- **`GET /api/consultations`**
  - Lists pending consultation requests.

