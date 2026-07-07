const User = require('../models/User');
const jwt = require('jsonwebtoken');

/**
 * Helper function to generate a JWT token
 */
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d', // Token expires in 7 days
    });
};

/**
 * POST /api/auth/signup
 * Register a new user and return a JWT token
 */
const signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400); // Bad Request
            return next(new Error('User already exists with this email'));
        }

        // Create the user
        const user = await User.create({
            name,
            email,
            password
        });

        // Generate JWT token
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * POST /api/auth/login
 * Authenticate user and return a JWT token
 */
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        
        // If user not found, or password doesn't match
        if (!user || !(await user.comparePassword(password))) {
            res.status(401); // Unauthorized
            return next(new Error('Invalid email or password'));
        }

        // Generate JWT token
        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * GET /api/auth/me
 * Fetch logged-in user's own profile using their token
 */
const getMe = async (req, res, next) => {
    try {
        // req.user is set by the authMiddleware
        const user = await User.findById(req.user.id).select('-password'); // Exclude password from result
        
        if (!user) {
            res.status(404); // Not Found
            return next(new Error('User not found'));
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    signup,
    login,
    getMe
};
