import express from 'express';
import { storage } from '../data/storage.js';

const router = express.Router();

/**
 * @route   POST /api/consultations
 * @desc    Request a clinical nutritionist consultation
 * @access  Public
 */
router.post('/', (req, res) => {
  try {
    const { name, email, phone, sport, goal, notes, preferredDate } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required to book a consultation'
      });
    }

    const consultation = storage.addItem('consultations', {
      name,
      email,
      phone: phone || '',
      sport: sport || 'General Athletic',
      goal: goal || 'Performance Optimization',
      notes: notes || '',
      preferredDate: preferredDate || new Date(Date.now() + 86400000).toISOString().split('T')[0],
      status: 'pending_review'
    });

    res.status(201).json({
      success: true,
      message: 'Consultation request received. A Hayat clinical nutritionist will contact you within 24 hours.',
      data: consultation
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   GET /api/consultations
 * @desc    List all consultation requests
 * @access  Public / Admin
 */
router.get('/', (req, res) => {
  try {
    const consultations = storage.getCollection('consultations');
    res.json({
      success: true,
      count: consultations.length,
      data: consultations
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;

