const {loginOptns}=require('../router_Schema/userSchema')


function userRoutes(fastify,options,done){
    //login route
    fastify.post('/login',loginOptns);

    // fastify.post('/signup',(req,reply)=>{
    //     console.log(req.body);
    //     const {name,email,phone,password}= req.body;
    //     reply.send("Succesfully signup")
    // })
    
    
    done()
}

module.exports=userRoutes;