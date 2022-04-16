const { loginOption, signupOption,getUsersOption,taskersOption } = require('../router_Schema/userSchema')
const { createJobOption, getJobOptions,getJobByIdOptions, applyJobOptions, appliedJobOption,
  singleUserAppliedJobOption,
  changeStatusOption,
  cancelJobOption } = require('../router_Schema/jobSchema');

function userRoutes(fastify, opt, done) {
  fastify.post('/login', loginOption);
  fastify.post('/signup', signupOption);
  fastify.get('/users',getUsersOption)
  fastify.post('/create/job', createJobOption);
  fastify.get('/get/jobs', getJobOptions);
  fastify.get('/get/jobs/:id', getJobByIdOptions);
  fastify.post('/apply/job', applyJobOptions);
  fastify.get('/job/applied/user/:id', appliedJobOption)
  fastify.get('/top/taskers', taskersOption)
  fastify.get('/user/applied/job/:id', singleUserAppliedJobOption)
  fastify.put('/change/status', changeStatusOption)
  fastify.delete('/cancel/job/:id', cancelJobOption)
  done();
}

module.exports = userRoutes;
