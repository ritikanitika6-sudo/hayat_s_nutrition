import express from 'express';
import { storage } from '../data/storage.js';

const router = express.Router();

/**
 * @route   POST /api/calculators/bmi
 * @desc    Calculate Body Mass Index (BMI) and clinical classification
 */
router.post('/bmi', (req, res) => {
  try {
    const { weight, height } = req.body;
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (!w || !h || w <= 0 || h <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide valid positive numbers for weight (kg) and height (cm)'
      });
    }

    const heightInMeters = h / 100;
    const bmi = +(w / (heightInMeters * heightInMeters)).toFixed(1);

    let category = 'Normal Weight';
    let riskLevel = 'Low Risk';
    let color = 'primary';

    if (bmi < 18.5) {
      category = 'Underweight';
      riskLevel = 'Elevated nutritional deficiency risk';
      color = 'secondary';
    } else if (bmi >= 25 && bmi < 29.9) {
      category = 'Overweight';
      riskLevel = 'Moderate cardiovascular & metabolic risk';
      color = 'tertiary';
    } else if (bmi >= 30) {
      category = 'Obese Range';
      riskLevel = 'High metabolic & joint strain risk';
      color = 'error';
    }

    // Healthy weight range for this height (BMI 18.5 - 24.9)
    const minHealthyWeight = +(18.5 * (heightInMeters * heightInMeters)).toFixed(1);
    const maxHealthyWeight = +(24.9 * (heightInMeters * heightInMeters)).toFixed(1);

    const result = {
      bmi,
      category,
      riskLevel,
      color,
      healthyWeightRange: `${minHealthyWeight} kg - ${maxHealthyWeight} kg`
    };

    storage.logCalculation('bmi', { weight: w, height: h }, result);

    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   POST /api/calculators/bmr
 * @desc    Calculate Basal Metabolic Rate using Mifflin-St Jeor formula
 */
router.post('/bmr', (req, res) => {
  try {
    const { gender = 'male', age, weight, height } = req.body;
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);

    if (!w || !h || !a || w <= 0 || h <= 0 || a <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide valid numbers for age, weight (kg), and height (cm)'
      });
    }

    // Mifflin-St Jeor: (10 * weight) + (6.25 * height) - (5 * age) + s (male: +5, female: -161)
    let bmr = (10 * w) + (6.25 * h) - (5 * a);
    bmr = String(gender).toLowerCase() === 'female' ? bmr - 161 : bmr + 5;
    const roundedBmr = Math.round(bmr);

    const result = {
      bmr: roundedBmr,
      unit: 'kcal / day',
      formula: 'Mifflin-St Jeor Clinical Equation',
      description: 'Minimum baseline energy required by vital organs at complete physical rest'
    };

    storage.logCalculation('bmr', { gender, age: a, weight: w, height: h }, result);

    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   POST /api/calculators/tdee
 * @desc    Calculate Total Daily Energy Expenditure (TDEE) and target calories
 */
router.post('/tdee', (req, res) => {
  try {
    const { bmr, activityMultiplier = 1.55 } = req.body;
    const baseBmr = parseFloat(bmr);
    const mult = parseFloat(activityMultiplier);

    if (!baseBmr || baseBmr <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid baseline BMR in kcal'
      });
    }

    const maintenance = Math.round(baseBmr * mult);
    const fatLoss = Math.max(1200, maintenance - 450);
    const muscleGain = maintenance + 400;

    const result = {
      bmr: baseBmr,
      activityMultiplier: mult,
      maintenanceCalories: maintenance,
      fatLossCalories: fatLoss,
      muscleGainCalories: muscleGain,
      unit: 'kcal / day'
    };

    storage.logCalculation('tdee', { bmr: baseBmr, activityMultiplier: mult }, result);

    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   POST /api/calculators/protein
 * @desc    Estimate daily protein target based on weight and goal intensity
 */
router.post('/protein', (req, res) => {
  try {
    const { weight, intensity = 'maintenance' } = req.body;
    const w = parseFloat(weight);

    if (!w || w <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid weight in kg'
      });
    }

    let multiplier = 1.8;
    let label = 'Athletic Maintenance';

    if (String(intensity).toLowerCase() === 'endurance' || intensity === '1') {
      multiplier = 1.4;
      label = 'Endurance Conditioning';
    } else if (String(intensity).toLowerCase() === 'strength' || String(intensity).toLowerCase() === 'hypertrophy' || intensity === '3') {
      multiplier = 2.2;
      label = 'Hypertrophy & Strength';
    }

    const totalGrams = Math.round(w * multiplier);
    const mealDistribution = +(totalGrams / 4).toFixed(0);

    const result = {
      weight: w,
      intensity: label,
      multiplier: `${multiplier} g/kg`,
      totalGrams,
      recommendedFeedingFrequency: '4-5 feedings daily',
      perMealGrams: `~${mealDistribution}g per meal to hit leucine threshold`
    };

    storage.logCalculation('protein', { weight: w, intensity }, result);

    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   POST /api/calculators/hydration
 * @desc    Estimate daily fluid requirements based on body weight and workout duration
 */
router.post('/hydration', (req, res) => {
  try {
    const { weight, exerciseHours = 0 } = req.body;
    const w = parseFloat(weight);
    const ex = parseFloat(exerciseHours) || 0;

    if (!w || w <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid weight in kg'
      });
    }

    // Baseline: 35ml per kg + 600ml per hour of moderate/high-intensity exercise
    const baseMl = w * 35;
    const exerciseAddMl = ex * 600;
    const totalMl = Math.round(baseMl + exerciseAddMl);
    const totalLitres = +(totalMl / 1000).toFixed(1);
    const glasses = Math.round(totalMl / 250);

    const result = {
      weight: w,
      exerciseHours: ex,
      totalLitres,
      totalMl,
      glassesCount: glasses,
      glassVolume: '250ml per glass',
      guidance: 'Consume 500ml upon waking, sip 200ml every 20-30m during training, and replenish remainder evenly throughout the day.'
    };

    storage.logCalculation('hydration', { weight: w, exerciseHours: ex }, result);

    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   POST /api/calculators/all
 * @desc    Run complete biometric assessment in one call
 */
router.post('/all', (req, res) => {
  try {
    const { gender = 'male', age = 28, weight = 75, height = 178, activityMultiplier = 1.55, intensity = 'maintenance' } = req.body;
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    const act = parseFloat(activityMultiplier);

    if (!w || !h || !a) {
      return res.status(400).json({
        success: false,
        message: 'Please provide valid numbers for weight, height, and age'
      });
    }

    // 1. BMI
    const heightInMeters = h / 100;
    const bmi = +(w / (heightInMeters * heightInMeters)).toFixed(1);

    // 2. BMR
    let bmr = (10 * w) + (6.25 * h) - (5 * a);
    bmr = String(gender).toLowerCase() === 'female' ? bmr - 161 : bmr + 5;
    bmr = Math.round(bmr);

    // 3. TDEE
    const maintenance = Math.round(bmr * act);
    const fatLoss = maintenance - 450;
    const muscleGain = maintenance + 400;

    // 4. Protein
    let proteinMult = 1.8;
    if (String(intensity).toLowerCase().includes('endurance') || intensity === '1') proteinMult = 1.4;
    if (String(intensity).toLowerCase().includes('strength') || String(intensity).toLowerCase().includes('hypertrophy') || intensity === '3') proteinMult = 2.2;
    const proteinGrams = Math.round(w * proteinMult);

    // 5. Hydration
    const hydrationMl = Math.round((w * 35) + 600);
    const hydrationLitres = +(hydrationMl / 1000).toFixed(1);

    const fullProfile = {
      biometrics: { gender, age: a, weight: w, height: h, bmi },
      energyNeeds: {
        bmr,
        maintenanceCalories: maintenance,
        fatLossCalories: fatLoss,
        muscleGainCalories: muscleGain
      },
      macronutrients: {
        proteinGrams,
        proteinGramsPerKg: proteinMult
      },
      hydration: {
        litres: hydrationLitres,
        ml: hydrationMl,
        glasses: Math.round(hydrationMl / 250)
      }
    };

    storage.logCalculation('full_profile', req.body, fullProfile);

    res.json({
      success: true,
      data: fullProfile
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;

