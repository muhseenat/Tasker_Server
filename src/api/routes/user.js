function userRoutes(fastify,options,done){
    
    fastify.post('/login',(req,reply)=>{
        console.log(req.body);
        const{email,password}=req.body;
        reply.send("successfully logged")
    })

    fastify.post('/signup',(req,reply)=>{
        console.log(req.body);
        const {name,email,phone,password}= req.body;
        reply.send("Succesfully signup")
    })
    
    
    done()
}

module.exports=userRoutes;