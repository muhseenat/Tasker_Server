const db = require("./src/config/dbConnection")
const environment= 'development'
require('dotenv').config()


const fastify = require("fastify")({
    logger: {
        prettyPrint:
          environment === 'development'
            ? {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname'
              }
            : false
      }
  })


//SWAGGER FOR API DOCUMENTATION
fastify.register(require("fastify-swagger"),{
    
    exposeRoute:true,
    routePrefix:'/docs',
    swagger:{
        info:{titile:'tasker-api'},

    },
})

//SERVER CONFIGURATION
const start = async()=>{

await fastify.register(require('fastify-express'))
fastify.register(require('fastify-multipart'))

fastify.use(require('cors')())

//CONNECTION TO ATLAS
 db.dbConnect(process.env.MONGODB_URL)



//ROUTES
fastify.register(require("./src/routes/user"),{ prefix: '/api' });
fastify.register(require('./src/routes/conversation'),{prefix:'/api/conversation'});
fastify.register(require('./src/routes/messages'),{prefix:'/api/messages'});
fastify.register(require('./src/routes/admin'),{prefix:'/api/admin'});


const { PORT=5050, LOCAL_ADDRESS='0.0.0.0' } = process.env
 

   try {
       fastify.listen(PORT,LOCAL_ADDRESS).then((success)=>{
           console.log(`server started @ ${PORT} and ${LOCAL_ADDRESS}`)
       })
   } catch (error) {
       fastify.log.error(error)
       
   }
}

// calling the server
start()