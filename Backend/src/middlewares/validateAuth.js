/**
 * Validation middleware for User Signup
 */
const validateSignup = (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
        res.status(400);
        return next(new Error('Name is required'));
    }

    // Basic email regex format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        res.status(400);
        return next(new Error('Please provide a valid email address'));
    }

    if (!password || password.length < 6) {
        res.status(400);
        return next(new Error('Password must be at least 6 characters long'));
    }

    next();
};

/**
 * Validation middleware for User Login
 */
const validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        return next(new Error('Please provide both email and password'));
    }

    next();
};

module.exports = {
    validateSignup,
    validateLogin
};
