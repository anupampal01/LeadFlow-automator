const express = require('express');
const router = express.Router();
const { submitLead, getLeads, updateLeadStatus } = require('../controllers/leadController');
const authMiddleware = require('../middleware/authMiddleware');

// Public route to submit a new lead
router.post('/', submitLead);

// Protected routes for the dashboard
router.get('/', authMiddleware, getLeads);
router.put('/:id', authMiddleware, updateLeadStatus);

module.exports = router;