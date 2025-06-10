import HandelError from "../utils/handelError.js";

export default (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // Cast Error 

    if (err.name === 'CastError') {
        const message = ` This is invalid resource ${err.path}`;
        err = new HandelError(message, 404)
    }


    // duplicate jey error 

    if (err.code === 11000) {
        const message = `this ${Object.keys(err.keyValue)} is already exist`;
        err = new HandelError(message, 400)

    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    })
}