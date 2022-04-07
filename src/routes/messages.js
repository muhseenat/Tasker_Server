const {messageOption} = require('../router_Schema/messagesSchema')

function messagesRoute(fastify, opt, done) {

    fastify.post('/',messageOption);



    done();

}

module.exports = messagesRoute;