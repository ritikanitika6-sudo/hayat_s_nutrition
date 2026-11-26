import express from 'express';
import { storage } from '../data/storage.js';

const router = express.Router();

/**
 * @route   GET /api/food-guides
 * @desc    Get pre and post workout food guides
 * @access  Public
 */
router.get('/', (req, res) => {
  try {
    const data = storage.read();
    const guides = data.foodComparisonGuide || { pre: [], post: [] };
    res.json({
      success: true,
      data: guides
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   GET /api/food-guides/:timing
 * @desc    Get pre or post workout guide specifically
 * @access  Public
 */
router.get('/:timing', (req, res) => {
  try {
    const timing = req.params.timing.toLowerCase();
    const data = storage.read();
    const guides = data.foodComparisonGuide || {};

    if (timing !== 'pre' && timing !== 'post') {
      return res.status(400).json({
        success: false,
        message: "Invalid timing parameter. Use 'pre' or 'post'."
      });
    }

    res.json({
      success: true,
      timing,
      data: guides[timing] || []
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;

