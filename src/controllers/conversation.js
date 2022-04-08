const {createConversation, getConversation} = require('../helpers/conversation')

//CREATE CONVERSATION CONTROLLER
const createConversationFunction=(req,res)=>{
    createConversation(req.body).then((data)=>{
        res.send(data)
    }).catch(err=>res.code(400).send(err))
}

//GET CONVERSATION CONTROLLER
const getConversationFunction=(req,res)=>{
    console.log(req.params);
    const {id} = req.params
    getConversation(id).then((data)=>{
        res.send(data)
    }).catch(err=>res.code(400).send(err))
}

module.exports={
    createConversationFunction,getConversationFunction
}