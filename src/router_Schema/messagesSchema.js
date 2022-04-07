const {messageFunction,getMessageFunction} = require('../controllers/messages')

//CREATE MESAGE OPTION SCHEMA
const messageOption={
    schema:{
        body:{
          type:'object',
          required:['sender','text','conversationId']
        }
    },
    handler:messageFunction
}

//GET MESSAGE OPTION SCHEMA

const getMessageOption={
  schema:{
      body:{
        type:'string',
        required:['id']
      }
  },
  handler:getMessageFunction
}

module.exports = {messageOption,getMessageOption}