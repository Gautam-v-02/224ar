const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        min:16
    }
},{
    timestamps:true
});

module.exports = new mongoose.model("Student",userSchema); //This is the model with which we will do any operation, this student model is following userSchema and the userschema is saying that the student model will have only two things name and age