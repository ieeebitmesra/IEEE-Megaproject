const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    name:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:false,
        default:"-",
    },
    institute:{
        type:String,
        required:false,
        default:"-",
    },
    graduation:{
        type:String,
        required:false,
        default:"-",
    },
    about:{
        type:String,
        required:false,
        default:"-",
    },
    degree:{
        type:String,
        required:false,
        default:"-",
    },
    questionsSolved:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Question',
        }
    ],
    solutions:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Solution',
        }
    ],
    calender:[
        {
            day:{
                type:Number,
                required:false,
            },
            value:{
                type:Number,
                required:false,
                default:0,
            }
        }
    ]
},{
    timestamps:true,
});
const User =  mongoose.model('User',userSchema);

module.exports = User;