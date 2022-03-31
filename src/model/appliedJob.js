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
    resume:{
        type:'Object'
    }

},{timestamps:true})

module.exports = mongoose.model('appliedjob',appliedJobSchema)
