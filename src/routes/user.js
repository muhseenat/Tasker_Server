const {loginOptns,signupOption} = require('../router_Schema/userSchema')

function productRoutes(fastify, opt, done) {
    fastify.post('/login',loginOptns)
    fastify.post('/signup',signupOption)





  done();
}

module.exports = productRoutes;
