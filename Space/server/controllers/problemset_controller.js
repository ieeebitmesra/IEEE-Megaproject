const Question = require('../models/Question');
module.exports.getFilterData = async (req, res) => {
    var questionsArray = [];
    let difficulty = req.query.difficulty;
    if (difficulty.length > 3) {
        difficulty = [];
        difficulty.push(req.query.difficulty);
    }
    let tag = req.query.tag;
    if (tag.length > 4) {
        tag = [];
        tag.push(req.query.tag);
    }

    try {
        for (let i = 0; i < difficulty.length; i++) {
            for (let j = 0; j < tag.length; j++) {
                let tempQuestion = await Question.find({ difficulty: difficulty[i], tag: tag[j] },{title:1,tag:1,difficulty:1 ,_id:1});
                for (let i = 0; i < tempQuestion.length; i++) {
                    questionsArray.push(tempQuestion[i]);
                }
            }
        }
        
        res.send({ questions: questionsArray });
    } catch (err) {
        console.log(err);
    }

}

