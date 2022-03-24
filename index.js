const fastify= require ('fastify')({logger:true})
const db = require("./src/config/dbConnection")
//Swagger
fastify.register(require("fastify-swagger"),{
    exposeRoute:true,
    routePrefix:'/docs',
    swagger:{
        info:{titile:'tasker-api'},

    },
})

// db connection
db.dbConnect('mongodb://localhost:27017/taskserver')


//Routes
await fastify.register(require('fastify-express'))
fastify.use(require('cors')())
fastify.use(require("./src/routes/user"));


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