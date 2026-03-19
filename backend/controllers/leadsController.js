const { prisma } = require('../db/prisma');

const STATUS_VALUES = ['New', 'Engaged', 'Proposal Sent', 'Closed-Won', 'Closed-Lost'];

const createLead = async (req, res) => {
  try {
    const { name, email, status } = req.body;
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ message: 'Name is required' });
    }
    if (!email || typeof email !== 'string' || !email.trim()) {
      return res.status(400).json({ message: 'Email is required' });
    }
    const leadStatus = status && STATUS_VALUES.includes(status) ? status : 'New';
    const lead = await prisma.lead.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        status: leadStatus,
      },
    });
    res.status(201).json(lead);
  } catch (err) {
    if (err.code === 'P2002') {
      return res.status(409).json({ message: 'Email already exists' });
    }
    res.status(500).json({ message: err.message || 'Server error' });
  }
};

const getLeads = async (req, res) => {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.status(200).json(leads);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error' });
  }
};

module.exports = {
  createLead,
  getLeads,
};
