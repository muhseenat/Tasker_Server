const environment= 'development'
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
  //.env file setup
const fastifyEnv = require('fastify-env')
const schema = {
  type: 'object',
  required: ['JWT_SECRET_KEY'],
  properties: {
    JWT_SECRET_KEY: {
      type: 'string'
    },
  }
}

const options = {
  confKey: 'config',
  schema,
  dotenv: true,
  data: process.env
}

const initialize = async () => {
    fastify.register(fastifyEnv, options)
    await fastify.after()
}

initialize()

const db = require("./src/config/dbConnection")
//Swagger
fastify.register(require("fastify-swagger"),{
    
    exposeRoute:true,
    routePrefix:'/docs',
    swagger:{
        info:{titile:'tasker-api'},

    },
})

const start = async()=>{
// db connection
db.dbConnect('mongodb://localhost:27017/taskserver')

await fastify.register(require('fastify-express'))

fastify.use(require('cors')({
    origin:"http://localhost:3000"
}))


//Routes
fastify.register(require("./src/routes/user"),{ prefix: '/api' });


const PORT= 5050;


   try {
       fastify.listen(PORT)
   } catch (error) {
       fastify.log.error(error)
       process.exit(1)
   }
}

// calling the server
start()