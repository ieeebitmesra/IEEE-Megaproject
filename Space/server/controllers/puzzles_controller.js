const Puzzle = require('../models/Puzzle.js')
module.exports.getFilterData = async (req,res   )=>{
    var questionsArray = [];
    let difficulty = req.query.difficulty;
    
    if (difficulty.length > 3) {
        difficulty = [];
        difficulty.push(req.query.difficulty);
    }
    try {
        for (let i = 0; i < difficulty.length; i++) {
            
            let tempQuestion = await Puzzle.find({ difficulty: difficulty[i]},{title:1,difficulty:1 ,_id:1});
            for (let i = 0; i < tempQuestion.length; i++) {
                questionsArray.push(tempQuestion[i]);
            }
            
        }
        console.log(questionsArray);
        res.send({ puzzles: questionsArray });
    } catch (err) {
        console.log(err);
    }
}