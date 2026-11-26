import express from 'express';
import { storage } from '../data/storage.js';

const router = express.Router();

/**
 * @route   GET /api/goals
 * @desc    Get all clinical performance goals
 * @access  Public
 */
router.get('/', (req, res) => {
  try {
    const goals = storage.getCollection('goals');
    res.json({
      success: true,
      count: goals.length,
      data: goals
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   GET /api/goals/:id
 * @desc    Get a specific goal protocol by ID
 * @access  Public
 */
router.get('/:id', (req, res) => {
  try {
    const goal = storage.getItemById('goals', req.params.id);
    if (!goal) {
      return res.status(404).json({
        success: false,
        message: `Goal with ID '${req.params.id}' was not found`
      });
    }

    res.json({
      success: true,
      data: goal
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;

