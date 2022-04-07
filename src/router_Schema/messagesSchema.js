const {messageFunction} = require('../controllers/messages')

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


module.exports = {messageOption}