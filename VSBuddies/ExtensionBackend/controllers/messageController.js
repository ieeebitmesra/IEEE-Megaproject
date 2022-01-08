const firebase = require("firebase")
const Message = require('../models/message');
const firestore = firebase.firestore();
var jwt = require('jsonwebtoken')

const getMessages = async(req,res)=>{
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


    const ref =  await firestore.collection("Users").doc(uid).collection("Messages").orderBy("createdAt")
    const data = await ref.get();
    
      const messagesArray = [];
      await data.docs.forEach(async(doc)=>{
        const temp = await doc.data();
        const message = new Message(
          temp.author,
          temp.message,
          temp.to
        )
        messagesArray.push(message);
      })
      res.send(messagesArray)
  }
  catch(error){
    res.status(400).send(error.message);
  }
}

const sendMessage = async(req,res)=>{
  try{
    let uid = ""
      const authHeader = req.headers.authorization
      if(!authHeader){
        res.send({})
        return;
      }
      const token = authHeader.split(" ")[1];
      if(!token){
        res.send({})
        return;
      }
      try{
        const payload = jwt.verify(token,process.env.SECRET)
        uid = payload.email
      }catch(err){
        res.send({})
        return;
      }
      const ref =  await firestore.collection("Users").doc(uid).collection("Messages")
      const message = req.body.message;
      if(!message){
        res.send({});
        return;
      }
      const to = req.body.to;
      if(!to){
        res.send({});
        return;
      }
      await ref.add({
        author: uid,
        to: to,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        message: message
      })
      const friendref = await firestore.collection("Users").doc(to).collection("Messages")
      await friendref.add({
        author: uid,
        to: to,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        message: message
      })
      res.send({})
        return;
  }catch(err){
    console.log(err)
    res.status(400).send(err.message)
  }
}

module.exports= {
  getMessages,
  sendMessage
}
