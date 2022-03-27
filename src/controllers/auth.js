const {userLogin,userSignup} = require("../helpers/user")
const jwt = require('jsonwebtoken');


const userLoginFunction =(req,res)=>{
    userLogin(req.body).then((data)=>{
        console.log(data);
        const token= jwt.sign({user:data._id},process.env.JWT_SECRET_KEY,{expiresIn:"2d"})
        console.log(token);
        console.log('set......');
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
const adminLoginFunction =(req,res)=>{
    const {email,password} = req.body;
    try {
        if(email=="admin@new" && password=="123456"){
            console.log('admin indddddd');
            const admin=true;
                const token= jwt.sign({admin:true},process.env.JWT_SECRET_KEY,{expiresIn:"2d"})
                res.send(token)
        } else{
         res.code(403).send({errorMessage:"Wrong email and password"})

        }       
    } catch (error) {
         res.code(500).send()
    }
 
}
module.exports={userLoginFunction,userSignupFunction,adminLoginFunction}