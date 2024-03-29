'use strict';

const methods = (methods = ['GET']) => (req, res, next) => {
    if (methods.includes(req.method)) return next();
    res.status(405).json({
        error: true,
        message: `The ${req.method} method for the "${req.originalUrl}" route is not supported.`
    });
};

module.exports = methods;