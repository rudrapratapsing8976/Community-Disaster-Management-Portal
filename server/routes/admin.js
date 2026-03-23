const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Incident = require('../models/Incident');
const { adminAuth } = require('../middleware/auth');

// Get all unverified users
router.get('/users/pending', adminAuth, async (req, res) => {
  try {
    const users = await User.find({ isVerified: false, role: { $in: ['citizen', 'authority'] } })
      .select('-password')
      .sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all users
router.get('/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Verify user
router.put('/users/:id/verify', adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isVerified = true;
    user.verifiedBy = req.user._id;
    user.verifiedAt = new Date();
    await user.save();

    res.json({ message: 'User verified successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Reject user
router.put('/users/:id/reject', adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User rejected and removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get dashboard stats
router.get('/dashboard', adminAuth, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const verifiedUsers = await User.countDocuments({ isVerified: true });
    const pendingUsers = await User.countDocuments({ isVerified: false });
    const totalIncidents = await Incident.countDocuments();
    const activeIncidents = await Incident.countDocuments({ status: { $in: ['reported', 'under_review', 'in_progress'] } });
    const resolvedIncidents = await Incident.countDocuments({ status: 'resolved' });

    res.json({
      users: {
        total: totalUsers,
        verified: verifiedUsers,
        pending: pendingUsers
      },
      incidents: {
        total: totalIncidents,
        active: activeIncidents,
        resolved: resolvedIncidents
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

