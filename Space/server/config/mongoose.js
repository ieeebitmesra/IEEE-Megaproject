const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' });

const mongoURI =  process.env.DATABASE;

const connectToMongo = () => {
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('Connected to DB successfully');
    }).catch((err) => console.log(err));
}

module.exports = connectToMongo;