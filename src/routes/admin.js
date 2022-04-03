const {adminLoginOption} = require('../router_Schema/adminSchema')
const {addCategoryOption,getCategoryOption} = require('../router_Schema/categorySchema');


function adminRoutes(fastify,option,done){
    fastify.post('/login',adminLoginOption)
    fastify.post('/add/category',addCategoryOption);
    fastify.get('/get/category',getCategoryOption);

    done();
}


module.exports=adminRoutes