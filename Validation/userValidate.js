const joi = require("joi");

const signupValidation = (data)=>{
     const signup = joi.object({
          userName:joi.string().required().min(6),
          Email:joi.string().required().email(),
          password:joi.string().required().min(8),
     })
     return signup.validate(data);
}

const signinvalidation = (data) => {

     const signin = joi.object({
          Email:joi.string().required().email(),
          password:joi.string().required().min(8),
     }) 
     return signin.validate(data);
}

module.exports = {signupValidation,signinvalidation}
