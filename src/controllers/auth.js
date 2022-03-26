const {userLogin,userSignup} = require("../helpers/user")
const jwt = require('jsonwebtoken');
const user = require("../helpers/user");


const userLoginFunction =(req,res)=>{
    userLogin(req.body).then((data)=>{
        console.log(data);

        res.send(data)
    }).catch(err=>{
        res.code(403).send({err})
    })
}

const userSignupFunction = (req,res)=>{
    userSignup(req.body).then((data)=>{
        console.log(data);
        console.log('token creating');
        const token = jwt.sign({user:data._id},fastify.config.JWT_SECRET_KEY,{expiresIn:"2d"})
        console.log(token,'udertokennnnn');
        res.send({data,token})
        res.send({user:data,token:token})
    }).catch((err)=>{
        res.code(403).send({err})
    })
}

module.exports={userLoginFunction,userSignupFunction}