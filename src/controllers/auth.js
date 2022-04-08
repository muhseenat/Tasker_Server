const {userLogin,userSignup,getUsers} = require("../helpers/user")
const jwt = require('jsonwebtoken');


// USER LOGIN CONTROLLER
const userLoginFunction =(req,res)=>{
    console.log(req.body);
    userLogin(req.body).then((data)=>{
        const token= jwt.sign({user:data._id},process.env.JWT_SECRET_KEY,{expiresIn:"2d"})
        const response={...data._doc,token}
        res.send(response)
    }).catch(err=>{
        res.code(403).send({err})
    })
}
// USER SIGNUP CONTROLLER
const userSignupFunction = (req,res)=>{
    userSignup(req.body).then((data)=>{
        console.log(process.env.JWT_SECRET_KEY,'jwtttttt');
        const token = jwt.sign({user:data._id},process.env.JWT_SECRET_KEY,{expiresIn:"2d"})
        const response={...data._doc,token}
        res.send(response)
    }).catch((err)=>{
        res.code(403).send({err})
    })
}


//ADMIN LOGIN CONTROLLER
const adminLoginFunction =(req,res)=>{
    const {email,password} = req.body;
    try {
        if(email=="admin@new.com" && password=="123456"){
            const admin=true;
                const token= jwt.sign({admin:true},process.env.JWT_SECRET_KEY,{expiresIn:"2d"})
                res.send(token)
        } else{
         res.code(400).send({errorMessage:"Wrong email and password"})

        }       
    } catch (error) {
         res.code(500).send()
    }
 
}

//GET ALL USER CONTROLLER
const getUsersFunction=(req,res)=>{
    const {userId}=req.query;
    console.log(userId);
    getUsers(userId).then((data)=>{
        console.log(data,'this is dataa');
        console.log(data,'this is dataa doccccc');
        res.send(data)
    }).catch(err=>res.code(400).send(err))
}
module.exports={userLoginFunction,userSignupFunction,adminLoginFunction,getUsersFunction}