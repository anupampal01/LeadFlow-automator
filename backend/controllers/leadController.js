const axios = require('axios');
const Lead = require('../models/Lead');
const ScoringRule = require('../models/ScoringRule');

// Function to call a data enrichment API (e.g., Clearbit)
const enrichLeadData = async (website) => {
    try {
        const response = await axios.get(`https://company.clearbit.com/v2/companies/find?domain=${website}`, {
            headers: { Authorization: `Bearer ${process.env.CLEARBIT_API_KEY}` },
        });
        return response.data;
    } catch (error) {
        console.error('Clearbit API error:', error.message);
        // This is the key change: we return null on error
        return null;
    }
};

// Function to calculate lead score based on rules
const calculateLeadScore = async (enrichedData) => {
    let score = 0;
    const rules = await ScoringRule.find();

    // Check if enrichedData exists before trying to access its properties
    if (!enrichedData) {
        console.log('Skipping scoring: No enriched data available for this lead.');
        return score;
    }

    for (const rule of rules) {
        const { criteria, scoreValue } = rule;
        // WARNING: Using eval() is dangerous. For a real app, use a safer expression parser.
        // This is simplified for demonstration purposes.
        try {
            // A safer way to evaluate the rule to prevent crashes
            const ruleExpression = `enrichedData && ${criteria}`;
            if (eval(ruleExpression)) {
                score += scoreValue;
            }
        } catch (e) {
            console.error(`Error evaluating rule: ${criteria}`, e);
        }
    }
    return score;
};

// @route   POST /api/leads
// @desc    Submit a new lead, enrich, score, and save
// @access  Public
exports.submitLead = async (req, res) => {
    const { companyName, email, phoneNumber, website, contactName } = req.body;

    try {
        const enrichedData = await enrichLeadData(website);
        const score = await calculateLeadScore(enrichedData);
        
        // Simple routing logic based on score
        let assignedTo = null;
        if (score >= 80) assignedTo = 'SalesRepA';
        else if (score >= 50) assignedTo = 'SalesRepB';

        const newLead = new Lead({
            companyName,
            email,
            phoneNumber,
            website,
            contactName,
            enrichedData,
            score,
            assignedTo,
        });

        await newLead.save();

        res.status(201).json({ message: 'Lead submitted and processed.', lead: newLead });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   GET /api/leads
// @desc    Get all leads
// @access  Private (Admin/Sales Rep)
exports.getLeads = async (req, res) => {
    try {
        const leads = await Lead.find().sort({ createdAt: -1 });
        res.json(leads);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   PUT /api/leads/:id
// @desc    Update lead status
// @access  Private (Admin/Sales Rep)
exports.updateLeadStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({ msg: 'Lead not found' });
        }

        lead.status = status;
        await lead.save();

        res.json(lead);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
