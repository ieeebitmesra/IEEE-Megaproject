const firebase = require('../db');
const User = require('../models/user');
const firestore = firebase.firestore();
var jwt = require('jsonwebtoken')

const getUser = async(req,res)=>{
  try{
    const uid = req.params.uid;
    const ref =  await firestore.collection("Users").doc(uid).collection("Details").doc("Details")
    const data = await ref.get();
    if(data.empty){
      console.log("no user")
      res.status(400).send("No User")
    }else{
      const temp = await data.data();
      const user = new User(
        temp.uid,
        temp.name,
        temp.icon,
        ["none of your buisness"]
      )
      
      await res.send(user)
    }
  }
  catch(error){
    console.log(error)
    res.status(400).send(error.message);
  }
}

const getMe = async(req,res)=>{
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
      console.log(uid)
    }catch(err){
      res.send({})
      return;
    }
    const ref =  firestore.collection("Users").doc(uid).collection("Details").doc("Details")
    const data = await ref.get();
    if(data.empty){
      const user = new User("","","")
      res.send(user);
      return
    }else{
      const temp = await data.data();
      const user = new User(
        temp.uid,
        temp.name,
        temp.icon,
        temp.friends
      )
      
      await res.send(user)
    }
  }
  catch(error){
    console.log(error)
    res.status(400).send(error.message);
  }
}


module.exports= {
  getUser, getMe
}
