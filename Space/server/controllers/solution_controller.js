const Solution = require('../models/Solution.js');
module.exports.getSolution = async (req,res)=>{
    try{
        let solution = await Solution.findById(req.params.id);
        res.send({solution: solution});
    }catch(err){
        console.log(err);
    }

}