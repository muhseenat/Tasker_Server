const {loginOption,signupOption} = require('../router_Schema/userSchema')
const {createJobOption,getJobOptions,applyJobOptions} = require('../router_Schema/jobSchema');
const {addCategoryOption,getCategoryOption} = require('../router_Schema/categorySchema');

function userRoutes(fastify, opt, done) {
    fastify.post('/login',loginOption);
    fastify.post('/signup',signupOption);
    fastify.post('/create/job',createJobOption);
    fastify.get('/get/jobs',getJobOptions);
    fastify.post('/apply/job',applyJobOptions);
    fastify.post('/add/category',addCategoryOption);
    fastify.get('get/category',getCategoryOption);

  done();
}

module.exports = userRoutes;
