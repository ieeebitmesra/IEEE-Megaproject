require("dotenv").config()
const express = require('express'),
cors = require('cors'),
userRoutes = require('./routes/user-routes'),
messageRoutes = require('./routes/message-routes'),
extensionRoutes = require('./routes/extension-routes'),
GitHubStrategy = require('passport-github2').Strategy;
const passport = require("passport");
var jwt = require('jsonwebtoken')
const app = express();
app.use(cors())
app.use(express.json())

// get github secrets using object deconstruction
const {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  SECRET,
  SECRET2
} = process.env


// Passport serialize
passport.serializeUser(function (user, done) {
  done(null, user);
});
// initailise passport
app.use(passport.initialize())

// use passport-github Github Strategy
const curStart = new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  scope: ["user:email"],
  callbackURL: "https://vsbuddiesextension.herokuapp.com/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
      console.log(profile)
      cb(null, {token: jwt.sign({email: profile.emails[0].value}, SECRET, {expiresIn: '1y'})});
  })
passport.use(curStart);

// routes for passport auth
app.get("/auth/github", passport.authenticate('github', {session: false}));
app.get(
  '/auth/github/callback/',
  passport.authenticate('github',{session: false}),
  (req, res)=>{
    res.redirect(`http://localhost:64589/auth/${req.user.token}`)
  });



// routes for api
app.use('/udata', userRoutes.routes);
app.use('/mdata', messageRoutes.routes);
app.use("/ext",extensionRoutes.routes)

// start on port 3001
app.listen(process.env.PORT||3001,()=>{
  console.log("running!")
})
