const express = require('express');

const { getMessages, sendMessage} = require("../controllers/messageController")

var router = express.Router()

router.get("/messages/me", getMessages);
router.post("/post",sendMessage)
module.exports = {
  routes: router
}
