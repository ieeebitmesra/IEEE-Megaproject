const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://allstudentsHub:allstudentsHub@cluster0.14bcs.mongodb.net/studentHub", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const experienceSchema = mongoose.Schema({
    company: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        unique: true,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    img : {
        type: String
    }
});

const experienceModel = mongoose.model("experience", experienceSchema);

module.exports = experienceModel