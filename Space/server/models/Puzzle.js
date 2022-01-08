const mongoose = require('mongoose');

const puzzleSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    problem:{
        
            problemStatement:{
                type:String,
                required:true
            },
            
    },
    answer:{
        type:String,
        required:true
    },
    
    difficulty:{
        type:String,
        required:true
    },
    

},{
    timestamps:true,
});
const Puzzle =  mongoose.model('Puzzle',puzzleSchema);

module.exports = Puzzle;