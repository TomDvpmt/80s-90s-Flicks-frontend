/** A custom error handler to overwrite the default one from Express
 * 
 * @param {Error} err 
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        message: err.message,
        statusCode: statusCode,
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    })
    next();
};

module.exports = {
    errorHandler,
}

