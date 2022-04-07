const {messageOption,getMessageOption} = require('../router_Schema/messagesSchema')

function messagesRoute(fastify, opt, done) {

    fastify.post('/',messageOption);
    fastify.get('/:id',getMessageOption)


    done();

}

module.exports = messagesRoute;