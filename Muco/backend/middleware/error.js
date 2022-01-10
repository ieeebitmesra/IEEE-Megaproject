const ErrorHandler = require("../utlis/errorhandler");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Interal Server Error";

    // wrong Mongodb ID error
    if (err.name === "CastError") {
        const message = `Resources not found : invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }


    // moongoose duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered `;
        err = new ErrorHandler(message, 400);
    }


    // wrong jwt  error
    if (err.name === "JsonWebTokenError") {
        const message = `Json Web Token  is Invalid, Try again `;
        err = new ErrorHandler(message, 400);
    }

    // jwt expire error
    if (err.name === "TokenExpiredError") {
        const message = `Json Web Token is  Expired ,Try again `;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
}