const mongoose = require('mongoose');

const ScoringRuleSchema = new mongoose.Schema({
    ruleName: {
        type: String,
        required: true,
        unique: true,
    },
    criteria: {
        type: String, // e.g., 'company.metrics.employees > 500'
        required: true,
    },
    scoreValue: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
});

module.exports = mongoose.model('ScoringRule', ScoringRuleSchema);