//This is the Error Handler class which has inherited the Error class of javascript
class ErrorHandler extends Error{

    constructor(message,statusCode){

        super(message); //passing the message

        this.statusCode = statusCode

        Error.captureStackTrace(this,this.constructor);

    }
    
}

//Exporting the class
module.exports = ErrorHandler