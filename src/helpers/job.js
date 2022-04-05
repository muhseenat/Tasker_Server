const Job = require('../model/jobSchema');
const apply = require('../model/appliedJob');


module.exports = {

    // JOB DETAILS TO DB HELPER 
    createJob: (data) => {
        return new Promise((resolve, reject) => {
            console.log(data);
            const job = new Job({
                user_id: data.user_id,
                job_designation: data.job_designation,
                job_desc: data.job_desc,
                category: data.category,
                province: data.province,
                city: data.city,
                minimum_pay: data.minimum_pay,
                from: data.from,
                to: data.to,
                skills: data.skills
            })
            job.save().then((jobData) => {
                resolve(jobData)
            }).catch((err) => {
                reject(err)
            })
        })
    },

    // GET JOBS FROM DB
    getJobs: () => {
        return new Promise((resolve, reject) => {
            Job.find({}).then((data) => {
                resolve(data)
            }).catch(err => reject(err))
        })
    },

    //APPLIED JOB DETAILS TO DB HELPER
    applyJob: (data) => {
        return new Promise((resolve, reject) => {
            console.log(data);
            

            const appliedJob = new apply({
                user_id: data.user_id,
                job_id: data.job_id,
                name: data.name,
                place: data.place,
                email: data.email,
                qualification: data.qualification,
                skill: data.skill,
                experience: data.experience
            })
            appliedJob.save().then((appliedJob) => {
                resolve(appliedJob)
            }).catch((err) => {
                reject(err)
            })
        })

    },

    //GET APPLIED JOBS HELPER
    getAppliedJob:()=>{
        return new Promise((resolve,reject)=>{
            apply.find({}).then((appliedJobs)=>{
                resolve(appliedJobs)
            }).catch(err=>reject(err))
        })
    },


    //GET SPECIFIC USER APPLED JOBS
    getSingleUserAppliedjob:(id)=>{
        return new Promise((resolve,reject)=>{
            console.log(id,'this id ihfhfjdfjksh')
        })

    }

}