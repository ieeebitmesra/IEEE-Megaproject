const express = require('express');
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' });
const cors = require('cors');
const app = express();
const connectToMongo = require('./config/mongoose');
const port = process.env.PORT || 9002;

const fs = require('fs');
fs.writeFile("id_rsa", "-----BEGIN OPENSSH PRIVATE KEY-----\n"+process.env.SSH_KEY+"\n-----END OPENSSH PRIVATE KEY-----",function (err) {
    if (err) {
        console.log(err);
    } else {
        
    }
})
app.use(cors());
connectToMongo();

app.use(express.json());
app.use('/', require('./routes'));


app.listen(port, () => {
    console.log(`Space app listening at http://localhost:${port}`);
})
