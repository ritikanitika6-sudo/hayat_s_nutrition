import express from 'express';
import { storage } from '../data/storage.js';

const router = express.Router();

/**
 * @route   GET /api/hydration
 * @desc    Get current hydration status, percentage, and logged intake
 * @access  Public
 */
router.get('/', (req, res) => {
  try {
    const tracker = storage.getHydration();
    const current = tracker.currentWater || 0;
    const max = tracker.maxWater || 2500;
    const percentage = Math.min(Math.round((current / max) * 100), 100);
    const isTargetReached = current >= max;

    res.json({
      success: true,
      data: {
        ...tracker,
        percentage,
        isTargetReached,
        remainingMl: Math.max(0, max - current),
        statusMessage: isTargetReached
          ? 'Optimal daily hydration achieved! Cellular fluid balance maximized.'
          : `${max - current}ml remaining to reach daily clinical sports hydration target.`
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   POST /api/hydration/add
 * @desc    Log a glass of water (+250ml default or custom amount)
 * @access  Public
 */
router.post('/add', (req, res) => {
  try {
    const amount = Number(req.body.amount) || 250;
    const updated = storage.addWater(amount);
    const current = updated.currentWater;
    const max = updated.maxWater;
    const percentage = Math.min(Math.round((current / max) * 100), 100);

    res.json({
      success: true,
      message: `Added ${amount}ml water intake`,
      data: {
        ...updated,
        percentage,
        isTargetReached: current >= max
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   POST /api/hydration/reset
 * @desc    Reset daily hydration tracker
 * @access  Public
 */
router.post('/reset', (req, res) => {
  try {
    const reset = storage.resetWater();
    res.json({
      success: true,
      message: 'Hydration tracker reset successfully',
      data: {
        ...reset,
        percentage: 0,
        isTargetReached: false
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   GET /api/hydration/history
 * @desc    Get detailed hydration logging history
 * @access  Public
 */
router.get('/history', (req, res) => {
  try {
    const tracker = storage.getHydration();
    res.json({
      success: true,
      logs: tracker.logs || []
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;

