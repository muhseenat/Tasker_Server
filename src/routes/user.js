const {loginOption,signupOption} = require('../router_Schema/userSchema')

function userRoutes(fastify, opt, done) {
    fastify.post('/login',loginOption)
    fastify.post('/signup',signupOption)





  done();
}

module.exports = userRoutes;
