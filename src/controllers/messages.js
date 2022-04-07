const {createMessage} = require('../helpers/messages')

//CREATE MESSAGE CONTROLLER
const messageFunction=(req,res)=>{
    createMessage(req.body).then((data)=>{
        res.send(data)
    }).catch(err=>res.code(400).send(err))
}

module.exports={
    messageFunction
}