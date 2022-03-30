const {createJob,getJobs,applyJob} = require("../helpers/job")

const createJobFunction=(req,res)=>{
    createJob(req.body).then((data)=>{
        res.send(data)
    }).catch(err=>{
        res.code(400).send({err})
    })


}

 const getJobsFunction=(req,res)=>{

     getJobs().then((data)=>{
         console.log('startinggggg');
         console.log(data,'jobsssssssss');
         res.send(data)
     }).catch(err=>{
         res.code(400).send({err})
     })
 }
 const applyJobFunction=(req,res)=>{
     applyJob(req.body).then((data)=>{
         res.send(data);
     }).catch((err)=>{
         res.code(400).send(err)
     })
 }

module.exports={createJobFunction,getJobsFunction,applyJobFunction}