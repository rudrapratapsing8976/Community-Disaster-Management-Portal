const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Incident = require('../models/Incident');
const { auth, authorityAuth } = require('../middleware/auth');

// Create incident
router.post('/', auth, [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('emergencyType').isIn(['flood', 'earthquake', 'fire', 'storm', 'medical', 'other']).withMessage('Invalid emergency type'),
  body('severity').optional().isIn(['low', 'medium', 'high', 'critical'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const incident = new Incident({
      ...req.body,
      reportedBy: req.user._id
    });

    await incident.save();
    await incident.populate('reportedBy', 'name email');

    res.status(201).json(incident);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all incidents (with filters)
router.get('/', auth, async (req, res) => {
  try {
    const { emergencyType, status, location, severity } = req.query;
    const filter = {};

    if (emergencyType) filter.emergencyType = emergencyType;
    if (status) filter.status = status;
    if (severity) filter.severity = severity;
    if (location) {
      filter['location.city'] = new RegExp(location, 'i');
    }

    const incidents = await Incident.find(filter)
      .populate('reportedBy', 'name email')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });

    res.json(incidents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get incident by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id)
      .populate('reportedBy', 'name email phone')
      .populate('assignedTo', 'name email');

    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' });
    }

    res.json(incident);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update incident (authority/admin only)
router.put('/:id', authorityAuth, async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' });
    }

    Object.assign(incident, req.body);
    incident.updatedAt = new Date();
    await incident.save();

    await incident.populate('reportedBy', 'name email');
    await incident.populate('assignedTo', 'name email');

    res.json(incident);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete incident (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' });
    }

    // Only admin or the reporter can delete
    if (req.user.role !== 'admin' && incident.reportedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Incident.findByIdAndDelete(req.params.id);
    res.json({ message: 'Incident deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

