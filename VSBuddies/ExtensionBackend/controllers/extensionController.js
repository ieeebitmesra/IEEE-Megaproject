const firebase = require("firebase")
const firestore = firebase.firestore();
var jwt = require('jsonwebtoken')

const updateExtension = async(req,res)=>{
  try{
    const authHeader = req.headers.authorization
    if(!authHeader){
      res.send({});
      return;
    }
    const token = authHeader.split(" ")[1];
    if(!token){
      res.send({})
      return;
    }
    let uid = ""
    try{
      const payload = jwt.verify(token,process.env.SECRET)
      uid = payload.email
    }catch(err){
      res.send({})
      return;
    }
    const ref =  await firestore.collection("Users").doc(uid).collection("Details").doc("Details")
    if(!req.body.extensions){
      res.send({})
      return;
    }
    ref.get().then(async(docSnapshot)=>{
      if(docSnapshot.exists){
        await ref.update({
          extensions: req.body.extensions
        })
      }
    })
    res.send({})
  }
  catch(error){
    console.log(error)
    res.status(400).send(error.message);
  }
}

module.exports= updateExtension