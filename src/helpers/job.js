const Job = require('../models/jobSchema');


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
 }

}