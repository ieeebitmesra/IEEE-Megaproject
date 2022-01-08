const firebase = require('firebase');
require('firebase/firestore')
const config = require("./config");

const db = firebase.initializeApp(config.firebaseConfig);

module.exports = db;
