const {loginOption,signupOption,createJobOption} = require('../router_Schema/userSchema')

function userRoutes(fastify, opt, done) {
    fastify.post('/login',loginOption)
    fastify.post('/signup',signupOption)
    fastify.post('/create/job',createJobOption)




  done();
}

module.exports = userRoutes;
