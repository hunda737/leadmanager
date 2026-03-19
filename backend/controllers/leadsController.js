const Lead = require('../models/Lead');

const createLead = async (req, res) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json(lead);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const message = Object.values(err.errors)
        .map((e) => e.message)
        .join('; ');
      return res.status(400).json({ message: message || 'Validation failed' });
    }
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Email already exists' });
    }
    res.status(500).json({ message: err.message || 'Server error' });
  }
};

const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.status(200).json(leads);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error' });
  }
};

module.exports = {
  createLead,
  getLeads,
};
