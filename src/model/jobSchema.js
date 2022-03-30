const mongoose=require('mongoose');
const JobSchema = mongoose.Schema({
    user_id:{
        type:String,
        required:true
    },
    job_designation:{
        type:String,
        required:true
    },
    job_desc:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    province:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    minimum_pay:{
        type:String,
        required:true
    } ,
    from:{
        type:Date,
        required:true
    },
     to:{
        type:Date,
        required:true
    },
    skills:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports=mongoose.model('job',JobSchema)