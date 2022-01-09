const User = require('../models/User');

module.exports.updateSummary = async (req,res)=>{
    try{
        
        let user = await User.findById(req.params.id);
        let updateData = req.body;
        if(updateData.loggedIn == req.params.id){
            if(updateData.name && updateData.name != ''){
                user.name = updateData.name
            }
            
            if(updateData.country && updateData.country != ''){
                user.country = updateData.country
            }
            user.save();
            res.send({message: 'Success'});
        }
        
        
    }catch(err){
        console.log(err.message);
        res.status(500).send("Interal Server Error");
    }
}
module.exports.updateAbout = async (req,res)=>{
    try{
        
        let user = await User.findById(req.params.id);
        let updateData = req.body;
        
        if(updateData.about && updateData.about != ''){
            user.about = updateData.about
        }
        if(updateData.institute  && updateData.institute != ''){
            user.institute = updateData.institute
        }
        if(updateData.degree && updateData.degree != ''){
            user.degree = updateData.degree
        }
        if(updateData.graduation && updateData.graduation != ''){
            user.graduation = updateData.graduation
        }
        
        user.save();
        res.send({message: 'Success'});
        
        
    }catch(err){
        console.log(err.message);
        res.status(500).send("Interal Server Error");
    }
}