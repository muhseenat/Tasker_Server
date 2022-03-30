const {loginOption,signupOption} = require('../router_Schema/userSchema')
const {createJobOption,getJobOptions} = require('../router_Schema/jobSchema')

function userRoutes(fastify, opt, done) {
    fastify.post('/login',loginOption);
    fastify.post('/signup',signupOption);
    fastify.post('/create/job',createJobOption);
    fastify.get('/get/jobs',getJobOptions);



  done();
}

module.exports = userRoutes;
