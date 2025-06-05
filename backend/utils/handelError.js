

class HandelError extends Error {
    constructor(message, statusCode){
        super(message);
        this.statusCode=statusCode;
        Error.captureStackTrace(this,this.constructor);

    }
}
export default HandelError;
// This class extends the built-in Error class to create a custom error type

