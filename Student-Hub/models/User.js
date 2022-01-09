//User schema used for saving user data
const mongoose = require("mongoose");
//Using bcrypt to encrypt user password making the website more safe for user
const bcrypt = require("bcrypt");

mongoose.connect("mongodb+srv://allstudentsHub:allstudentsHub@cluster0.14bcs.mongodb.net/studentHub", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    },
    designation: {
        type: String
    },
	institute: {
		type: String
	},
    portfolio: {
        type: String
    },
    resources: [{
        id: {
            type: String,
        },
        title: {
            type: String
        }
    }],
    img:
    {
        type: String,
        default: 'blank.png'
    }
});

userSchema.pre("save", function(next) {
    if(!this.isModified("password")) {
        return next()
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

userSchema.methods.comparePassword = function(plainText, callback) {
    return callback(null, bcrypt.compareSync(plainText, this.password))
}

const userModel = mongoose.model("user", userSchema);

module.exports = userModel