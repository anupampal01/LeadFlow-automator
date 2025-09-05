const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
};

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
exports.registerUser = async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        const user = await User.create({ username, password, role });
        res.status(201).json({
            _id: user.id,
            username: user.username,
            role: user.role,
            token: generateToken(user._id),
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   POST /api/auth/login
// @desc    Authenticate user and get token
// @access  Public
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user.id,
                username: user.username,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ msg: 'Invalid credentials' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};