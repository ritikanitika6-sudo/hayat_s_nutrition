import express from 'express';
import { storage } from '../data/storage.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();

/**
 * @route   GET /api/meal-plans
 * @desc    Get all performance meal plans (with optional category filter)
 * @access  Public
 */
router.get('/', (req, res) => {
  try {
    const { category, search } = req.query;
    let plans = storage.getCollection('mealPlans');

    if (category && category !== 'all') {
      plans = plans.filter((p) => {
        if (category === 'plant') return p.id === 'vegetarian-athlete' || p.id === 'vegan-athlete' || p.category === 'plant';
        if (category === 'muscle') return p.id === 'hypertrophy-base' || p.id === 'vegetarian-athlete' || p.category === 'muscle';
        if (category === 'fatloss') return p.id === 'lean-performance' || p.category === 'fatloss';
        if (category === 'endurance') return p.id === 'endurance-protocol' || p.category === 'endurance';
        return p.category === category;
      });
    }

    if (search) {
      const q = search.toLowerCase();
      plans = plans.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.targetGoal.toLowerCase().includes(q) ||
          p.idealFor.toLowerCase().includes(q) ||
          p.ingredients.toLowerCase().includes(q)
      );
    }

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
 * @route   GET /api/meal-plans/:id
 * @desc    Get a specific meal plan by ID
 * @access  Public
 */
router.get('/:id', (req, res) => {
  try {
    const plan = storage.getItemById('mealPlans', req.params.id);
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: `Meal plan with ID '${req.params.id}' was not found`
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

/**
 * @route   POST /api/meal-plans
 * @desc    Create a new performance meal plan
 * @access  Protected / Optional
 */
router.post('/', optionalAuth, (req, res) => {
  try {
    const { title, tag, targetGoal, idealFor, description, timing, ingredients, macros, schedule, image } = req.body;

    if (!title || !targetGoal || !macros) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, targetGoal, and macros object'
      });
    }

    const newPlan = storage.addItem('mealPlans', {
      title,
      tag: tag || 'Clinical Standard',
      tagColor: 'bg-primary-container/90 text-on-primary-container',
      cols: 'md:col-span-4',
      image: image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      targetGoal,
      idealFor: idealFor || 'Active Athletes',
      description: description || 'Clinical sports nutrition protocol.',
      timing: timing || 'Structured around training blocks.',
      ingredients: ingredients || 'Whole food sources.',
      macros: macros || { calories: '2,500 kcal', protein: '150g', carbs: '300g', fats: '70g' },
      schedule: schedule || []
    });

    res.status(201).json({
      success: true,
      message: 'Meal plan created successfully',
      data: newPlan
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   PUT /api/meal-plans/:id
 * @desc    Update an existing meal plan
 * @access  Protected
 */
router.put('/:id', (req, res) => {
  try {
    const updated = storage.updateItem('mealPlans', req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: `Meal plan with ID '${req.params.id}' was not found`
      });
    }

    res.json({
      success: true,
      message: 'Meal plan updated successfully',
      data: updated
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   DELETE /api/meal-plans/:id
 * @desc    Delete a meal plan
 * @access  Protected
 */
router.delete('/:id', (req, res) => {
  try {
    const deleted = storage.deleteItem('mealPlans', req.params.id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: `Meal plan with ID '${req.params.id}' was not found`
      });
    }

    res.json({
      success: true,
      message: 'Meal plan removed successfully'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;

