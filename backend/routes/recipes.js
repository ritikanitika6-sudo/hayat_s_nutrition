import express from 'express';
import { storage } from '../data/storage.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();

/**
 * @route   GET /api/recipes
 * @desc    Get all clinical performance recipes with optional category and search filters
 * @access  Public
 */
router.get('/', (req, res) => {
  try {
    const { category, search } = req.query;
    let recipes = storage.getCollection('recipes');

    if (category) {
      recipes = recipes.filter((r) =>
        r.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    if (search) {
      const q = search.toLowerCase();
      recipes = recipes.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q) ||
          r.ingredients.some((ing) => ing.toLowerCase().includes(q))
      );
    }

    res.json({
      success: true,
      count: recipes.length,
      data: recipes
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   GET /api/recipes/:id
 * @desc    Get a single recipe by ID
 * @access  Public
 */
router.get('/:id', (req, res) => {
  try {
    const recipe = storage.getItemById('recipes', req.params.id);
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: `Recipe with ID '${req.params.id}' was not found`
      });
    }

    res.json({
      success: true,
      data: recipe
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   POST /api/recipes
 * @desc    Add a new athletic performance recipe
 * @access  Protected / Optional
 */
router.post('/', optionalAuth, (req, res) => {
  try {
    const { title, category, time, calories, protein, carbs, fats, ingredients, instructions } = req.body;

    if (!title || !category || !ingredients || !instructions) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, category, ingredients list, and instructions'
      });
    }

    const newRecipe = storage.addItem('recipes', {
      title,
      category,
      time: time || '15 mins',
      calories: calories || '400 kcal',
      protein: protein || '30g',
      carbs: carbs || '40g',
      fats: fats || '10g',
      ingredients: Array.isArray(ingredients) ? ingredients : [ingredients],
      instructions
    });

    res.status(201).json({
      success: true,
      message: 'Recipe created successfully',
      data: newRecipe
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   PUT /api/recipes/:id
 * @desc    Update an existing recipe
 * @access  Protected
 */
router.put('/:id', (req, res) => {
  try {
    const updated = storage.updateItem('recipes', req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: `Recipe with ID '${req.params.id}' was not found`
      });
    }

    res.json({
      success: true,
      message: 'Recipe updated successfully',
      data: updated
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   DELETE /api/recipes/:id
 * @desc    Delete a recipe
 * @access  Protected
 */
router.delete('/:id', (req, res) => {
  try {
    const deleted = storage.deleteItem('recipes', req.params.id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: `Recipe with ID '${req.params.id}' was not found`
      });
    }

    res.json({
      success: true,
      message: 'Recipe removed successfully'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;

