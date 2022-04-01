const Job = require('../model/jobSchema');
const apply= require('../model/appliedJob')


module.exports ={
 createJob:(data)=>{
     return new Promise((resolve,reject)=>{
         const job = new Job({
            user_id:data.user_id,
            job_designation:data.job_designation,
            job_desc:data.job_desc,
            category:data.category,
            province:data.province,
            city:data.city,
            minimum_pay:data.minimum_pay,
            from:data.from,
            to:data.to,
            skills:data.skills
         })
         job.save().then((jobData)=>{
             resolve(jobData)
         }).catch((err)=>{
             reject(err)
         })
     })
 },

 getJobs:()=>{
     return new Promise((resolve,reject)=>{
       Job.find({}).then((data)=>{
           resolve(data)
       }).catch(err=>reject(err))
     })
 },

 applyJob:(data)=>{
     return new Promise((resolve,reject)=>{
         const appliedJob=new apply({
            user_id:data.user_id,
            tasker_id:data.tasker_id,
            job_id:data.job_id,
            resume:data.resume
         
         })
         appliedJob.save().then((appliedJob)=>{
             resolve(appliedJob)
         }).catch((err)=>{
             reject(err)
         })
     })

 }

}