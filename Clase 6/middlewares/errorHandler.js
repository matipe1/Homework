const errorHandler = (err, req, res, next) => {
    const statusError = err.status || 500;
    const errorResponse = {
        error: {
            message: err.message || "Server's error",
            code: err.code || "internal_error",
        },
    };
    res.status(statusError).json(errorResponse);
};

module.exports = errorHandler;