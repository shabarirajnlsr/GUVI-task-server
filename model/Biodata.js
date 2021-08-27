const mongoose = require("mongoose");

const bioSchema = new mongoose.Schema({
     Uname:{
          type:String,
          required:true
     },
     age:{
          type:Number,
          required:true
     },
     dateofbirth:{
          type:Number,
          required:true
     },
     mobile:{
          type:Number,
          required:true
     },
},
     {
          timestamps:true
     }
)
module.exports = mongoose.model("Userdata", bioSchema);