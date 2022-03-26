const {userLogin,userSignup} = require("../helpers/user")
const jwt = require('jsonwebtoken');


const userLoginFunction =(req,res)=>{
    userLogin(req.body).then((data)=>{
        console.log(data);
        const token= jwt.sign({user:data._id},process.env.JWT_SECRET_KEY,{expiresIn:"2d"})
        res.send(data,token)
    }).catch(err=>{
        res.code(403).send({err})
    })
}

const userSignupFunction = (req,res)=>{
    userSignup(req.body).then((data)=>{
        console.log(data);
        console.log('token creating');
        console.log(process.env.JWT_SECRET_KEY);
        const token = jwt.sign({user:data._id},process.env.JWT_SECRET_KEY,{expiresIn:"2d"})
        console.log(token);
        res.send({data,token})
    }).catch((err)=>{
        console.log('not working......');

        res.code(403).send({err})
    })
}

module.exports={userLoginFunction,userSignupFunction}