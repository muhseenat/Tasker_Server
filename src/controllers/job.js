const {createJob,getJobs,applyJob} = require("../helpers/job")

// JOB CREATING CONTROLER
const createJobFunction=(req,res)=>{
    createJob(req.body).then((data)=>{
        res.send(data)
    }).catch(err=>{
        res.code(400).send({err})
    })


}

// JOB GETS CONTROLLER
 const getJobsFunction=(req,res)=>{
     getJobs().then((data)=>{
         
         res.send(data)
     }).catch(err=>{
         res.code(400).send({err})
     })
 }
 
 //JOB APPLING CONTROLLER
 const applyJobFunction=(req,res)=>{
     applyJob(req.body).then((data)=>{
         res.send(data);
     }).catch((err)=>{
         res.code(400).send(err)
     })
 }

module.exports={createJobFunction,getJobsFunction,applyJobFunction}