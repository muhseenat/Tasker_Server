const {messageFunction} = require('../controllers/messages')


const messageOption={
    schema:{
        body:{
          type:'object',
          required:['senderId','receiverId']
        }
    },
    handler:messageFunction
}


module.exports = {messageOption}