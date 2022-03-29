const {userLoginFunction,userSignupFunction} = require('../controllers/auth')

const userItem = {
    type:'object',
    properties:{
        name:{type :'string'},
        email:{type:"string"},
        phone:{type:"number"},
        token:{type:'string'}
    }
}




const loginOption={
    schema:{
        response:{
            200:userItem
        },
        body:{
            type:'object',
            required:['password','email'],
            properties:{
                password:{type:'string'},
                email:{type:'string'}
            }
        }
       
    },
    handler:userLoginFunction
}


const signupOption ={
    schema:{
        response:{
            200:userItem
        },
        body:{
            type:'object',
            required:['password','email','name','phone'],
            properties:{
                ...userItem.properties,
                password:{type:'string'}
            }
        }
    },
    handler:userSignupFunction
}



module.exports={loginOption,signupOption}