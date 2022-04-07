const {createMessage,getMessage} = require('../helpers/messages')

//CREATE MESSAGE CONTROLLER
const messageFunction=(req,res)=>{
    createMessage(req.body).then((data)=>{
        res.send(data)
    }).catch(err=>res.code(400).send(err))
}


//GET MESSAGE CONTROLLER

const getMessageFunction=(req,res)=>{
    const {id} =req.params
    getMessage(id).then((data)=>{
        res.send(data)
    }).catch(err=>res.code(400).send(err))
}
module.exports={
    messageFunction,getMessageFunction
}