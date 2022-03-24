const {login} = require('../controllers/auth')

const loginOptns={
    schema:{
        response:{
            200:{
                type:'object'
            },
        },
    },
    handler:login
}

module.exports={loginOptns}