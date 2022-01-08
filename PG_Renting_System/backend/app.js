const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Pg = require("./models/Pg");
const User = require("./models/User");

const Schema = mongoose.Schema;
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
// express app
// connect to mongodb & listen for requests
const dbURI =
  "mongodb+srv://srijan:test1234@cluster0.cqz3z.mongodb.net/node-tuts?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(5000))
  .catch(err => console.log(err));

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.post("/login", (req, res)=> {
  const { email, password} = req.body
  User.findOne({ email: email}, (err, user) => {
      if(user){
          if(password === user.password ) {
              res.send({message: "Login Successfull", user: user})
          } else {
              res.send({ message: "Password didn't match"})
          }
      } else {
          res.send({message: "User not registered"})
      }
  })
}) 


app.put("/bookmark/:id",async (request, response)=> {

  try{
    await User.updateOne({_id: request.params.id}, request.body);
    response.status(201).json("Edited");
} catch (error){
    response.status(409).json({ message: error.message});     
}

});


app.post("/register", (req, res)=> {
  const { name, email, password} = req.body
  User.findOne({email: email}, (err, user) => {
      if(user){
          res.send({message: "User already registerd"})
      } else {
          const user = new User({
              name,
              email,
              password
          })
          user.save(err => {
              if(err) {
                  res.send(err)
              } else {
                  res.send( { message: "Successfully Registered, Please login now." })
              }
          })
      }
  })
  
})
//login/signup


  app.get('/allPg', async (request, response) => {
    // Step -1 // Test API
    // response.send('Code for Interview');
    try{
        // finding something inside a model is time taking, so we need to add await
        const pg = await Pg.find().sort({ createdAt: -1 });
        response.status(200).json(pg);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
});

app.get('/PgDetail/:id', async (request, response) => {
  try{
      const pg = await Pg.findById(request.params.id);
      response.status(200).json(pg);
  }catch( error ){
      response.status(404).json({ message: error.message })
  }
});




