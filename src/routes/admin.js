const {adminLoginOption} = require('../router_Schema/adminSchema')
const {getUsersCountOption} = require('../router_Schema/userSchema')
const {getProviderOption,getTaskersOption,changeStsOption,getJobCountOption,getJobStsOption,getAppliedJobCountOption} = require('../router_Schema/jobSchema')
const {addCategoryOption,getCategoryOption,deleteCategoryOption,} = require('../router_Schema/categorySchema');


function adminRoutes(fastify,option,done){
    fastify.post('/login',adminLoginOption)
    fastify.post('/add/category',addCategoryOption);
    fastify.get('/get/category',getCategoryOption);
    fastify.delete('/delete/category/:id',deleteCategoryOption)
    fastify.get('/providers',getProviderOption)
    fastify.get('/taskers',getTaskersOption)
    fastify.get('/users/count',getUsersCountOption)
    fastify.get('/jobs/count',getJobCountOption)
    fastify.get('/applied/jobs/count',getAppliedJobCountOption)
    fastify.get('/all/jobs/sts',getJobStsOption)

    fastify.put('/providers/status/change/',changeStsOption)
    done();
}


module.exports=adminRoutes