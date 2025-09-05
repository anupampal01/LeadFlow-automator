const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
    },
    website: {
        type: String,
        required: true,
    },
    contactName: {
        type: String,
    },
    score: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ['New', 'Qualified', 'Unqualified', 'Contacted'],
        default: 'New',
    },
    enrichedData: {
        type: Object, // Stores data from Clearbit API
    },
    assignedTo: {
        type: String, // e.g., 'SalesRepA', 'SalesRepB'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Lead', LeadSchema);