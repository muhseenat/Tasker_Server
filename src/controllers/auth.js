const {userLogin,userSignup} = require("../helpers/user")

const userLoginFunction =(req,res)=>{
    userLogin(req.body).then((data)=>{
        res.send(data)
    }).catch(err=>{
        res.code(403).send({err})
    })
}

const userSignupFunction = (req,res)=>{
    userSignup(req.body).then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.code(403).send({err})
    })
}

module.exports={userLoginFunction,userSignupFunction}