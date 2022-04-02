const {adminLoginFunction} = require('../controllers/auth')

// ADMIN ITEM 
const adminItem ={
    type:'object',
    properties:{
        token:{type:'string'}
    }
}

//ADMIN LOGIN OPTION SCHEMA
const adminLoginOption={
    schema:{
        response:{
            200:adminItem
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
    handler:adminLoginFunction
}


module.exports={
    adminLoginOption
}