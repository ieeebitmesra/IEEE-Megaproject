//Forum schema used for Forurm page
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://allstudentsHub:allstudentsHub@cluster0.14bcs.mongodb.net/studentHub", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const forumSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    topic: {
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
    reply: [
        {
            content: {
                type: String
            },
            respondent: {
                type: String
            }
        }
    ]
});

const forumModel = mongoose.model("forum", forumSchema);

module.exports = forumModel