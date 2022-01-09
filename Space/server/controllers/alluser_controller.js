const User = require('../models/User');

module.exports.leaderboard = async (req, res) => {
   try {
      const users = await User.find({},{name:1,_id:1,questionsSolved:1}) ;
      res.send({ users: users});
   } catch (err) {
      console.log(err.message);
      res.status(500).send("Interal Server Error");
   }
}