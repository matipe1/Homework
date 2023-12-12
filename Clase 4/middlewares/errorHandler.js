// Middleware to handle errors

const errorHandler = (err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).json({ error: err.message || "Server's Problem" });
}

module.exports = errorHandler;