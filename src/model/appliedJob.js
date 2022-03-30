const mongoose= require ('mongoose')

const appliedJobSchema=mongoose.Schema({
    user_id:{
        type:'String',
        required:true,
    },
    tasker_id:{
        type:'String',
        
    },
    job_id:{
        type:'String',
        required:true,
    },
    resume:{
        type:''
    }

},{timestamps:true})

module.exports = mongoose.model('appliedjob',appliedJobSchema)
