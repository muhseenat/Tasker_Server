const Conversation = require('../model/conversationSchema')

module.exports={

    //CREATE CONVERSATION
 createConversation:(data)=>{
     console.log(data,'this is data');
     return new Promise((resolve,reject)=>{
         const newConversation = new Conversation(
             {
                 members:[data.senderId,data.receiverId]
             }
         );
         newConversation.save().then((resp)=>{
            resolve(resp)
         }).catch(err=>reject(err))
     })
 },
//GET CONVERSATION FROM DB
 getConversation:(id)=>{
     return new Promise((resolve,reject)=>{
         Conversation.find({
             members:{$in:[id]}
         }).then((data)=>{
             resolve(data)
         }).catch(err=>reject(err))
     })
 }



}