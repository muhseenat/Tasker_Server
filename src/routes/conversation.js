const {conversationOption,getConversationOption} = require('../router_Schema/conservationSchema')



function conversationRoute(fastify, opt, done) {

    fastify.post('/',conversationOption);
    fastify.get('/:id',getConversationOption)
    done()
}

module.exports = conversationRoute;