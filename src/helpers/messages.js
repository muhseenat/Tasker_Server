const Message = require('../model/messageSchema')

module.exports={

    //CREATE MESSAGES TO DB

 createMessage:(data)=>{
     console.log(data,'this is data');
     return new Promise((resolve,reject)=>{

         const newMessage= new Message(data).save().then((resp)=>{
             resolve(resp)
         }).catch(err=>reject(err))
     })

 },
 //GET MESSAGES FROM DB
 getMessage:(id)=>{
     return new Promise((resolve,reject)=>{
         console.log(id);
         Message.find({conversationId:id}).then((resp)=>{
            resolve(resp)
        }).catch(err=>reject(err))
     })
 }



}