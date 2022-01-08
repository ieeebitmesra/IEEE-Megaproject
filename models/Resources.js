const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://allstudentsHub:allstudentsHub@cluster0.14bcs.mongodb.net/studentHub", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const resourcesSchema = mongoose.Schema({
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
    views: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

const resourcesModel = mongoose.model("resources", resourcesSchema);

module.exports = resourcesModel