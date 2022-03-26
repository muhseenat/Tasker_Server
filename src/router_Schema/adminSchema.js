const {adminLoginFunction} = require('../controllers/auth')


const adminItem ={
    type:'object',
    properties:{
        token:{type:'string'}
    }
}

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