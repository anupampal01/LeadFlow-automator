const express = require('express');
const router = express.Router();
const { createRule, getRules, updateRule, deleteRule } = require('../controllers/scoringController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getRules);
router.post('/', authMiddleware, createRule);
router.put('/:id', authMiddleware, updateRule);
router.delete('/:id', authMiddleware, deleteRule);

module.exports = router;