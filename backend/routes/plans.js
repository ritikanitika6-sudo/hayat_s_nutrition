import express from 'express';
import { storage } from '../data/storage.js';

const router = express.Router();

/**
 * @route   POST /api/plans/generate
 * @desc    Generate and save a personalized clinical nutrition plan
 * @access  Public
 */
router.post('/generate', (req, res) => {
  try {
    const {
      userName = 'Athlete',
      goal = 'muscle-gain',
      diet = 'vegetarian',
      gender = 'male',
      age = 26,
      weight = 75,
      height = 178,
      activity = 1.55
    } = req.body;

    const numWeight = parseFloat(weight) || 75;
    const numHeight = parseFloat(height) || 178;
    const numAge = parseFloat(age) || 26;
    const numActivity = parseFloat(activity) || 1.55;

    // 1. Calculate BMR (Mifflin-St Jeor)
    let bmr = (10 * numWeight) + (6.25 * numHeight) - (5 * numAge);
    bmr = String(gender).toLowerCase() === 'female' ? bmr - 161 : bmr + 5;
    const roundedBmr = Math.round(bmr);

    // 2. Calculate TDEE
    const tdee = Math.round(roundedBmr * numActivity);

    // 3. Goal Caloric Strategy & Protein targets
    let targetCalories = tdee;
    let proteinMultiplier = 1.8;
    let goalStrategy = 'Iso-caloric athletic maintenance';
    let recommendedPlanId = 'vegetarian-athlete';
    let recommendedPlanName = 'Vegetarian Athlete';

    if (goal === 'muscle-gain') {
      targetCalories = tdee + 400;
      proteinMultiplier = 2.0;
      goalStrategy = '+400 kcal lean surplus to optimize myofibrillar protein synthesis';
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
      targetCalories = Math.max(1250, tdee - 450);
      proteinMultiplier = 2.2;
      goalStrategy = '-450 kcal deficit with elevated protein to preserve lean muscle tissue';
      recommendedPlanId = 'lean-performance';
      recommendedPlanName = 'Lean Performance Plan';
    } else if (goal === 'endurance') {
      targetCalories = tdee + 150;
      proteinMultiplier = 1.6;
      goalStrategy = 'High carbohydrate intake to maximize glycogen replenishment';
      recommendedPlanId = 'endurance-protocol';
      recommendedPlanName = 'Endurance Protocol';
    } else {
      // recovery / general wellness
      targetCalories = tdee;
      proteinMultiplier = 1.7;
      goalStrategy = 'Nutrient-dense anti-inflammatory whole food protocol';
      recommendedPlanId = diet === 'vegan' ? 'vegan-athlete' : 'vegetarian-athlete';
      recommendedPlanName = 'Balanced Clinical Protocol';
    }

    // 4. Calculate Exact Macronutrient Split
    const targetProtein = Math.round(numWeight * proteinMultiplier);
    const targetFats = Math.round((targetCalories * 0.25) / 9); // 25% of calories from fat
    const targetCarbs = Math.max(
      50,
      Math.round((targetCalories - (targetProtein * 4) - (targetFats * 9)) / 4)
    );

    // 5. Daily Hydration
    const hydrationLitres = +((numWeight * 0.035) + 0.6).toFixed(1);
    const hydrationMl = Math.round(hydrationLitres * 1000);
    const glasses = Math.round(hydrationMl / 250);

    // 6. Match Detailed Meal Plan
    const matchedPlanDetails = storage.getItemById('mealPlans', recommendedPlanId) || null;

    const generatedPlan = {
      userName,
      createdAt: new Date().toISOString(),
      inputs: {
        goal,
        diet,
        gender,
        age: numAge,
        weight: numWeight,
        height: numHeight,
        activity: numActivity
      },
      prescription: {
        bmr: roundedBmr,
        tdee,
        targetCalories,
        goalStrategy,
        macros: {
          protein: `${targetProtein}g (${proteinMultiplier}g/kg)`,
          carbs: `${targetCarbs}g`,
          fats: `${targetFats}g`
        },
        hydration: {
          litres: hydrationLitres,
          ml: hydrationMl,
          glasses
        },
        recommendedPlan: {
          id: recommendedPlanId,
          name: recommendedPlanName,
          details: matchedPlanDetails
        }
      }
    };

    const saved = storage.savePlan(generatedPlan);

    res.status(201).json({
      success: true,
      message: 'Clinical nutrition prescription generated successfully',
      data: saved
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   GET /api/plans/saved
 * @desc    Get all saved generated plans
 * @access  Public
 */
router.get('/saved', (req, res) => {
  try {
    const plans = storage.getSavedPlans();
    res.json({
      success: true,
      count: plans.length,
      data: plans
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   GET /api/plans/saved/:id
 * @desc    Get a specific saved generated plan by ID
 * @access  Public
 */
router.get('/saved/:id', (req, res) => {
  try {
    const plan = storage.getItemById('generatedPlans', req.params.id);
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: `Plan with ID '${req.params.id}' was not found`
      });
    }

    res.json({
      success: true,
      data: plan
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;

