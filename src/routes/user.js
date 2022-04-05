const {loginOption,signupOption} = require('../router_Schema/userSchema')
const {createJobOption,getJobOptions,applyJobOptions,appliedJobOption,singleUserAppliedJobOption} = require('../router_Schema/jobSchema');

function userRoutes(fastify, opt, done) {
    fastify.post('/login',loginOption);
    fastify.post('/signup',signupOption);
    fastify.post('/create/job',createJobOption);
    fastify.get('/get/jobs',getJobOptions);
    fastify.post('/apply/job',applyJobOptions);
    fastify.get('/get/applied/jobs',appliedJobOption)
    fastify.get('/user/applied/job/:id',singleUserAppliedJobOption)

  done();
}

module.exports = userRoutes;
