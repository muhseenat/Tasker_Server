const {adminLoginOption} = require('../router_Schema/adminSchema')
const {getProviderOption,getTaskersOption,changeStsOption} = require('../router_Schema/jobSchema')
const {addCategoryOption,getCategoryOption,deleteCategoryOption,} = require('../router_Schema/categorySchema');


function adminRoutes(fastify,option,done){
    fastify.post('/login',adminLoginOption)
    fastify.post('/add/category',addCategoryOption);
    fastify.get('/get/category',getCategoryOption);
    fastify.delete('/delete/category/:id',deleteCategoryOption)
    fastify.get('/providers',getProviderOption)
    fastify.get('/taskers',getTaskersOption)

    fastify.put('/providers/status/change/',changeStsOption)
    done();
}


module.exports=adminRoutes