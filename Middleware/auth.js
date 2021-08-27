const User=require("../model/user.model");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const { authorization } = req.headers
    if(!authorization){
        return res.status(404).json({message:"you must be logged in"});
    }
    else{
        const accesstoken = authorization.replace("Bearer ","")
        jwt.verify(accesstoken, process.env.JWT_SUSPENSE, (err, payload) => {
            if(err){
                return res.status(404).json({message:"you must be logged in"});
            }else{
                const {_id} = payload;
                User.findOne({_id})
                .then(userData => {
                    req.user = userData;
                    next();
                })
            }
        })
    }
}