/**
 * Centralized Error Handling Middleware
 * Catches any errors thrown in routes/controllers and formats the response
 */
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log error stack trace for debugging

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
        // Provide stack trace only in development
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = errorHandler;
