const {createConversationFunction,getConversationFunction} = require('../controllers/conversation')


const conversationOption={
    schema:{
        body:{
          type:'object',
          required:['senderId','receiverId']
        }
    },
    handler:createConversationFunction
}

const getConversationOption={
  schema:{
    body:{
      type:'string',
      required:['id']
    }
},
handler:getConversationFunction
}

module.exports = {conversationOption,getConversationOption}