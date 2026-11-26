/**
 * Hayat's Nutrition - Frontend API Service Client
 * 
 * Provides unified data access to the Express backend with graceful fallback
 * to local clinical data if the backend server is temporarily offline.
 */

import {
  sportsCategories,
  mealPlans,
  foodComparisonGuide,
  primaryGoals,
  performanceRecipes
} from '../data/nutritionData';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Generic safe fetch with timeout and fallback
 */
async function safeFetch(endpoint, options = {}, fallbackData = null) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000); // 4s timeout

    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const json = await res.json();
    return json.data !== undefined ? json.data : json;
  } catch (err) {
    // Return local fallback data gracefully
    if (fallbackData !== null) {
      return fallbackData;
    }
    throw err;
  }
}

// ----------------- CONTENT & PROTOCOLS -----------------

export async function getSports() {
  return safeFetch('/sports', {}, sportsCategories);
}

export async function getMealPlans(category = 'all') {
  const query = category && category !== 'all' ? `?category=${category}` : '';
  return safeFetch(`/meal-plans${query}`, {}, mealPlans);
}

export async function getRecipes(category = '', search = '') {
  const params = new URLSearchParams();
  if (category) params.append('category', category);
  if (search) params.append('search', search);
  const query = params.toString() ? `?${params.toString()}` : '';
  return safeFetch(`/recipes${query}`, {}, performanceRecipes);
}

export async function getGoals() {
  return safeFetch('/goals', {}, primaryGoals);
}

export async function getFoodGuides() {
  return safeFetch('/food-guides', {}, foodComparisonGuide);
}

// ----------------- CLINICAL CALCULATORS -----------------

export async function calculateBmi(weight, height) {
  return safeFetch('/calculators/bmi', {
    method: 'POST',
    body: JSON.stringify({ weight, height })
  });
}

export async function calculateBmr(gender, age, weight, height) {
  return safeFetch('/calculators/bmr', {
    method: 'POST',
    body: JSON.stringify({ gender, age, weight, height })
  });
}

export async function calculateTdee(bmr, activityMultiplier) {
  return safeFetch('/calculators/tdee', {
    method: 'POST',
    body: JSON.stringify({ bmr, activityMultiplier })
  });
}

export async function calculateProtein(weight, intensity) {
  return safeFetch('/calculators/protein', {
    method: 'POST',
    body: JSON.stringify({ weight, intensity })
  });
}

export async function calculateHydration(weight, exerciseHours) {
  return safeFetch('/calculators/hydration', {
    method: 'POST',
    body: JSON.stringify({ weight, exerciseHours })
  });
}

// ----------------- LIVE HYDRATION TRACKER -----------------

export async function getHydrationStatus() {
  return safeFetch('/hydration', {}, { currentWater: 750, maxWater: 2500, percentage: 30 });
}

export async function logWaterIntake(amount = 250) {
  return safeFetch('/hydration/add', {
    method: 'POST',
    body: JSON.stringify({ amount })
  }, null);
}

export async function resetWaterTracker() {
  return safeFetch('/hydration/reset', {
    method: 'POST'
  }, null);
}

// ----------------- PLAN GENERATION -----------------

export async function generatePersonalizedPlan(inputs) {
  return safeFetch('/plans/generate', {
    method: 'POST',
    body: JSON.stringify(inputs)
  });
}

// ----------------- CONSULTATIONS -----------------

export async function bookConsultation(details) {
  return safeFetch('/consultations', {
    method: 'POST',
    body: JSON.stringify(details)
  });
}

// ----------------- HEALTH CHECK -----------------

export async function checkServerHealth() {
  try {
    const res = await fetch(`${API_BASE_URL}/health`);
    return res.ok;
  } catch {
    return false;
  }
}

