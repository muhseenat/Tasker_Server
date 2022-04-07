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

 }



}