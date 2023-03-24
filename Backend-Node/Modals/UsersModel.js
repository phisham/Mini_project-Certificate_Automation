const mongoose = require("mongoose");
const { Schema } = mongoose;

const facultySchema = new mongoose.Schema({
    employeeNo:{
        type:String,
        required:true
    },
    role:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true,
    },
    department:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true       
    },
    phoneNumber:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:
    },
    dateOfJoining:{
        type:Date,
        required:true       
    },
});


const User =  mongoose.model("user", UserSchema);

module.exports = {User};