const Puzzle= require('../models/Puzzle.js')
module.exports.getPuzzle =async (req,res)=>{
    try {
        let question = await Puzzle.findById(req.params.id);
        res.send({ question: question });
    }
    catch (error) {
        console.log(error);
    }
}