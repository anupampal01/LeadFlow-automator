const ScoringRule = require('../models/ScoringRule');

// @route   POST /api/scoring-rules
// @desc    Create a new scoring rule
// @access  Private (Admin)
exports.createRule = async (req, res) => {
    const { ruleName, criteria, scoreValue, description } = req.body;
    try {
        const newRule = new ScoringRule({ ruleName, criteria, scoreValue, description });
        await newRule.save();
        res.status(201).json(newRule);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   GET /api/scoring-rules
// @desc    Get all scoring rules
// @access  Private (Admin)
exports.getRules = async (req, res) => {
    try {
        const rules = await ScoringRule.find();
        res.json(rules);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   PUT /api/scoring-rules/:id
// @desc    Update a scoring rule
// @access  Private (Admin)
exports.updateRule = async (req, res) => {
    const { ruleName, criteria, scoreValue, description } = req.body;
    try {
        const rule = await ScoringRule.findByIdAndUpdate(req.params.id, { ruleName, criteria, scoreValue, description }, { new: true });
        if (!rule) {
            return res.status(404).json({ msg: 'Rule not found' });
        }
        res.json(rule);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   DELETE /api/scoring-rules/:id
// @desc    Delete a scoring rule
// @access  Private (Admin)
exports.deleteRule = async (req, res) => {
    try {
        const rule = await ScoringRule.findByIdAndDelete(req.params.id);
        if (!rule) {
            return res.status(404).json({ msg: 'Rule not found' });
        }
        res.json({ msg: 'Rule deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};