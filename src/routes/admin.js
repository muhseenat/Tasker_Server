const {adminLoginOption} = require('../router_Schema/adminSchema')


function adminRoutes(fastify,option,done){
    fastify.post('/login',adminLoginOption)


    done();
}


module.exports=adminRoutes