const express = require('express');
const router = express.Router();
const leadsController = require('../controllers/leadsController');

router.post('/', leadsController.createLead);
router.get('/', leadsController.getLeads);

module.exports = router;
