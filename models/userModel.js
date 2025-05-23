const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({

    name : {type:String},
    email :{type: String},
    password :{ type:String},
     date:{type:Date , default:Date.now(),},
})

const User = mongoose.model("users", userSchema);

module.exports = User;