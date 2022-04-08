const { loginOption, signupOption,getUsersOption } = require('../router_Schema/userSchema')
const { createJobOption, getJobOptions, applyJobOptions, appliedJobOption,
  singleUserAppliedJobOption,
  changeStatusOption,
  cancelJobOption } = require('../router_Schema/jobSchema');

function userRoutes(fastify, opt, done) {
  fastify.post('/login', loginOption);
  fastify.post('/signup', signupOption);
  fastify.get('/users',getUsersOption)
  fastify.post('/create/job', createJobOption);
  fastify.get('/get/jobs', getJobOptions);
  fastify.post('/apply/job', applyJobOptions);
  fastify.get('/job/applied/user/:id', appliedJobOption)
  fastify.get('/user/applied/job/:id', singleUserAppliedJobOption)
  fastify.put('/change/status', changeStatusOption)
  fastify.delete('/cancel/job/:id', cancelJobOption)
  done();
}

module.exports = userRoutes;
