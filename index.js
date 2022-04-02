const db = require("./src/config/dbConnection")
const environment= 'development'
// const storage = require('./src/config/multer2')

// const parser = multer({ storage });

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

fastify.use(require('cors')({
    origin:["http://localhost:3000","http://localhost:3001"]
}))

//CONNECTION TO ATLAS
 db.dbConnect(process.env.MONGODB_URL)

// // Rsegister plugins below:

// //Decorate fastify with our parser
// fastify.decorate('multer', { parser });

//ADMIN AND USER ROUTES
fastify.register(require("./src/routes/user"),{ prefix: '/api' });
fastify.register(require('./src/routes/admin'),{prefix:'/api/admin'})


const PORT= process.env.PORT||5050


   try {
       fastify.listen(PORT)
   } catch (error) {
       fastify.log.error(error)
       process.exit(1)
   }
}

// calling the server
start()