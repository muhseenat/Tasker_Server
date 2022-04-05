const mongoose= require ('mongoose')

const appliedJobSchema=mongoose.Schema({
    user_id:{
        type:'String',
        required:true,
    },
    job_id:{
        type:'String',
        required:true,
    },
    name:{
        type:'String',
        required:true,
    },
    place:{
        type:'String',
        required:true,
    },  
    email:{
        type:'String',
        required:true,
    },
    qualification:{
        type:'String',
        
    }, 
     skill:{
        type:'String',
        
    },          
    experience:{
        type:'String',
       
    },           
},{timestamps:true})

module.exports = mongoose.model('appliedjob',appliedJobSchema)
