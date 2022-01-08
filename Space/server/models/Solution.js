const mongoose = require('mongoose');

const solutionSchema = new mongoose.Schema({
    code:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true
    },
    question:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Question',
    },
    verdict:{
        type: String,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    }
    

},{
    timestamps:true,
});
const Solution =  mongoose.model('Solution',solutionSchema);

module.exports = Solution;