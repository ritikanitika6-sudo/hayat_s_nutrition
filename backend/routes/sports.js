import express from 'express';
import { storage } from '../data/storage.js';

const router = express.Router();

/**
 * @route   GET /api/sports
 * @desc    Get all 8 sports categories and tailored nutritional guidelines
 * @access  Public
 */
router.get('/', (req, res) => {
  try {
    const sports = storage.getCollection('sports');
    res.json({
      success: true,
      count: sports.length,
      data: sports
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   GET /api/sports/:id
 * @desc    Get specific sport recommendations by ID (e.g. 'gym', 'running', 'football')
 * @access  Public
 */
router.get('/:id', (req, res) => {
  try {
    const sport = storage.getItemById('sports', req.params.id);
    if (!sport) {
      return res.status(404).json({
        success: false,
        message: `Sport with ID '${req.params.id}' was not found`
      });
    }

    res.json({
      success: true,
      data: sport
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;

