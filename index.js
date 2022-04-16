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
// socket server
const fastifyIO = require("fastify-socket.io");
 


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
fastify.register(fastifyIO);
fastify.use(require('cors')())

//CONNECTION TO ATLAS
 db.dbConnect(process.env.MONGODB_URL)



//ROUTES
fastify.register(require("./src/routes/user"),{ prefix: '/api' });
fastify.register(require('./src/routes/conversation'),{prefix:'/api/conversation'});
fastify.register(require('./src/routes/messages'),{prefix:'/api/messages'});
fastify.register(require('./src/routes/admin'),{prefix:'/api/admin'});

// ......................................................................................................................
let users = []

//Function to avoid duplicate users while pushing to array and add user
const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId })
};
//Function to remove user when disconnect
const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
}

//Function to get users
const getUser=(userId)=>{
    return users.find(user=>user.userId === userId);
}
// ......................................................................................................................


fastify.ready().then(() => {
    // we need to wait for the server to be ready, else `server.io` is undefined
    fastify.io.on("connection", (socket) => {
        console.log('a user connected');
        //TAKE USERID AND SOCKETID FROM USER
        socket.on('addUser', (userId) => {
            addUser(userId, socket.id);
            io.emit('getUsers', users);
        });
    
        //Send and get messages
        socket.on('sendMessage',({senderId,receiverId,text})=>{
            const user=getUser(receiverId);
            io.to(user?.socketId).emit('getMessage',{
                senderId,
                text,
            });
        });
    
    
        //When disconnect user
        socket.on("disconnect", () => {
            io.emit('getUsers', users)
            removeUser(socket.id);
        })
    })
  });



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