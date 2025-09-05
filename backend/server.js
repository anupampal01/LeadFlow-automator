const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const connectDB = require('./config/db');
connectDB();

// API routes
const leadRoutes = require('./routes/leads');
const authRoutes = require('./routes/auth');
const scoringRoutes = require('./routes/scoringRules');

app.use('/api/leads', leadRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/scoring-rules', scoringRoutes);

// Simple test route
app.get('/', (req, res) => {
    res.send('Lead Routing API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});