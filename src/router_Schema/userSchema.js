const {userLoginFunction,userSignupFunction,getUsersFunction,
    getUsersCountFunction,getUserStaticsFunction,getTopTaskersFunction} = require('../controllers/auth')
//USER ITEM
const userItem = {
    type:'object',
    properties:{
        _id:{type:'string'},
        name:{type :'string'},
        email:{type:"string"},
        phone:{type:"number"},
        token:{type:'string'}
    }
}



// USER LOGIN OPTION
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

// USER SIGNUP OPTION
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
//GET ALLL USERS OPTION SCHEMA
const getUsersOption={
    schema:{
        response:{
            200:userItem
        }
    },
    handler:getUsersFunction
}

//GET ALL USERS COUNT
const getUsersCountOption={
   handler:getUsersCountFunction
}

//GET USER STATICS
const getStaticsOption={
    handler:getUserStaticsFunction
}
//GET TOP TASKERS OPTION
const taskersOption={
    handler:getTopTaskersFunction
}

module.exports={loginOption,signupOption,taskersOption,getUsersOption,getUsersCountOption,getStaticsOption}