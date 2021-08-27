const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
     userName:{
          type:String,
          required:true
     },
     Email:{
          type:String,
          required:true
     },
     password:{
          type:String,
          required:true
     },
     confirmpassword:{
          type:String,
          required:true
     }
},
     {
          timestamps:true
     }
)
module.exports = mongoose.model("Login", loginSchema);