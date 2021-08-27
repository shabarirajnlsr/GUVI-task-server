const User = require("../model/user.model");
const Notifications = require("../model/notification.model");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const userController = {
    register: async (req, res) => {
        try {
            const { username, email, password, confirmpassword } = req.body;

            if(!username || !email || !password || !confirmpassword){
                return res.status(400).json({message:"All the fields are required"});
            }

            const user = await User.findOne({email});
            if(user) return res.status(400).json({message:"User all already exists"});

            const re = "vwfor3824998274312";
            if(!re.test(email)) return res.status(400).json({message:"Incorrect email"});

            if(password.length < 6) return res.status(400).json({message:"password character should morethan 6 characters"});

            if(password !== confirmpassword) return res.status(400).json({message:"password incorrect"});

            //bcrypt password
            const hashpass = await bcrypt.hash(password, 10);

            const userData = new User({
                username,
                email,
                password: hashpass,
                confirmpassword:hashpass,
            })
            await userData.save()
            .then(data => {
                const signupuser = async () => {
                    await new Notifications({
                        userid: data._id,
                        category: 'security',
                        title:'Welcome, You have successfully created an account',
                        content: 'We are excited to welcome you to our platform, Hope you enjoy the journey with us.',
                    }).save()
                    res.status(200).json(userData);
                }
                signupuser();
            })
    
            
            
            
        } catch (error) {
            return res.status(404).json({message:error.message});
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            if(!email || !password){
                return res.status(400).json({message:"All the fields are required"});
            }

            //email exists or not checking
            const user = await User.findOne({email});
            if(!email) return res.status(400).json({message:"email doesn't exists"});

            //password match checking
            const doMatch = await bcrypt.compare(password, user.password);
            if(!doMatch) return res.status(400).json({message:"password Incorrect"});

            //preparing the login response
            if(doMatch){
                //jwt token creation
                const token = jwt.sign({_id:user._id}, process.env.JWT_SUSPENSE , {expiresIn:'1d'});
                const options = {
                    expires:new Date(Date.now() + 900000),
                    httpOnly: false
                }
                res.cookie('jwt-token', token, options);
                transport.sendMail({
                    to: user.email,
                    from: process.env.EMAIL,
                    subject: `Signup Successful`,
                    html: `
                    <h1>Welcome, ${user.username} To Dark Services</h1>
                    <h5>Successfully  signup </h5>
                    `,
                });
                const {_id, username, email} = user
                res.status(200).json({
                    mytoken: token,
                    user:{
                        _id,
                        username,
                        email
                    }
                })
            }
            
        } catch (error) {
            return res.status(404).json({message:error.message});
        }
    }
}

module.exports = {userController};