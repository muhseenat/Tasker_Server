const {login} = require('../controllers/user')

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