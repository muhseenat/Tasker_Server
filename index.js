const fastify= require ('fastify')({logger:true})
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