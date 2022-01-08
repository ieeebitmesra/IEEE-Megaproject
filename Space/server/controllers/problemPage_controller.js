const Question = require('../models/Question')
module.exports.pPage = async (req, res) => {

    try {
        let question = await Question.findById(req.params.id);
        res.send({ question: question });
    }
    catch (error) {
        console.log(error);
    }

}