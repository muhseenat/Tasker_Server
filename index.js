const fastify= require ('fastify')({logger:true})
//Swagger
fastify.register(require("fastify-swagger"),{
    exposeRoute:true,
    routePrefix:'/docs',
    swagger:{
        info:{titile:'tasker-api'},

    },
})
//Routes
fastify.register(require("./src/api/routes/user"));


const PORT= 8080;


const start = async()=>{
   try {
       fastify.listen(PORT)
   } catch (error) {
       fastify.log.error(error)
       process.exit(1)
   }
}
start()