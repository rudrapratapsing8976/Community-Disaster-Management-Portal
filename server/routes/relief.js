const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const ReliefEffort = require('../models/ReliefEffort');
const Incident = require('../models/Incident');
const { auth, authorityAuth } = require('../middleware/auth');

// Create relief effort
router.post('/', authorityAuth, [
  body('incidentId').notEmpty().withMessage('Incident ID is required'),
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { incidentId } = req.body;
    const incident = await Incident.findById(incidentId);
    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' });
    }

    const reliefEffort = new ReliefEffort({
      ...req.body,
      managedBy: req.user._id
    });

    await reliefEffort.save();
    await reliefEffort.populate('managedBy', 'name email');
    await reliefEffort.populate('incidentId');

    res.status(201).json(reliefEffort);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all relief efforts
router.get('/', auth, async (req, res) => {
  try {
    const { incidentId, emergencyType, location, status } = req.query;
    const filter = {};

    if (incidentId) filter.incidentId = incidentId;
    if (status) filter.status = status;

    let reliefEfforts = await ReliefEffort.find(filter)
      .populate('incidentId')
      .populate('managedBy', 'name email')
      .sort({ createdAt: -1 });

    // Filter by emergency type or location if provided
    if (emergencyType) {
      reliefEfforts = reliefEfforts.filter(effort => 
        effort.incidentId?.emergencyType === emergencyType
      );
    }

    if (location) {
      reliefEfforts = reliefEfforts.filter(effort => 
        effort.location?.city?.toLowerCase().includes(location.toLowerCase()) ||
        effort.incidentId?.location?.city?.toLowerCase().includes(location.toLowerCase())
      );
    }

    res.json(reliefEfforts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get relief effort by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const reliefEffort = await ReliefEffort.findById(req.params.id)
      .populate('incidentId')
      .populate('managedBy', 'name email')
      .populate('updates.updatedBy', 'name email');

    if (!reliefEffort) {
      return res.status(404).json({ message: 'Relief effort not found' });
    }

    res.json(reliefEffort);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add update to relief effort
router.post('/:id/updates', authorityAuth, [
  body('message').trim().notEmpty().withMessage('Update message is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const reliefEffort = await ReliefEffort.findById(req.params.id);
    if (!reliefEffort) {
      return res.status(404).json({ message: 'Relief effort not found' });
    }

    reliefEffort.updates.push({
      message: req.body.message,
      updatedBy: req.user._id
    });

    reliefEffort.updatedAt = new Date();
    await reliefEffort.save();

    await reliefEffort.populate('updates.updatedBy', 'name email');
    res.json(reliefEffort);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update relief effort
router.put('/:id', authorityAuth, async (req, res) => {
  try {
    const reliefEffort = await ReliefEffort.findById(req.params.id);
    if (!reliefEffort) {
      return res.status(404).json({ message: 'Relief effort not found' });
    }

    Object.assign(reliefEffort, req.body);
    reliefEffort.updatedAt = new Date();
    await reliefEffort.save();

    await reliefEffort.populate('incidentId');
    await reliefEffort.populate('managedBy', 'name email');

    res.json(reliefEffort);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

