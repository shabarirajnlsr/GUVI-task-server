const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 2500 || process.env.port;
const mongoURL = "mongodb+srv://nlsr:2078033Nl$r@cluster0.fj2pp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//middleware
app.use(express.json());


//broweser view
app.get("/", (req,res) => {
     res.json({MESSAGE:"Authentication API creation"});
})

//server starting to connect
app.listen((port), () => {
     console.log(`server up and running in ${port}`);
})


// Database connecting
mongoose.connect((mongoURL), {useNewUrlParser:true , useUnifiedTopology:true}, (err) => {
     if(!err)
     {
          console.log("database connected");
     }
     else
     {
          console.log("not database connected");
     }
})

