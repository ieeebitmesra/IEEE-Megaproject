const Apperror = require('../utils/errorClass')

module.exports = (err,req,res,next)=>{
   err.statusCode = err.statusCode || 500;
   err.message = err.message || "Error occured"

   res.status(err.statusCode).json({
      success:false,
      message:err.message
   })
}