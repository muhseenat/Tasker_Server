const {loginOption,signupOption} = require('../router_Schema/userSchema')
const {createJobOption} = require('../router_Schema/jobSchema')

function userRoutes(fastify, opt, done) {
    fastify.post('/login',loginOption);
    fastify.post('/signup',signupOption);
    fastify.post('/create/job',createJobOption);




  done();
}

module.exports = userRoutes;
