const Job = require('../model/jobSchema');
const apply = require('../model/appliedJob');
const User = require('../model/userSchema')
const mongoose = require('mongoose')
const objectId = mongoose.Types.ObjectId;

module.exports = {

    // JOB DETAILS TO DB HELPER 
    createJob: (data) => {
        return new Promise((resolve, reject) => {
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
                User.updateOne({_id:data.user_id},{$push:{posted_job:jobData._id}}).then((resp)=>{
                    resolve(jobData)
                }).catch((err)=>{
                    reject(err)
                })
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

            //PUSH THE APPLIED JOB DETAILS TO USER COLLECTION
            const applied_job = {
                job_id: data.job_id,
                job_name: data.job_name,
                provider_id: data.provider_id,
                province: data.province,
                city: data.city,
                pay: data.pay,
                expiry_date: data.expiry_date,
                status: "Pending"
            }

            User.updateOne({ _id: data.user_id }, { $push: { applied_jobs: applied_job } }).then(() => {
                //CREATE A DOCUMENT IN APPLIED JOB COLLECTION
                const appliedJob = new apply({
                    user_id: data.user_id,
                    job_id: data.job_id,
                    provider_id: data.provider_id,
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


        }).catch(err => reject(err))

    },

    //GET APPLIED JOBS HELPER
    getAppliedJob: (id) => {
        return new Promise((resolve, reject) => {
            apply.find({ job_id: objectId(id) }).then((appliedJobs) => {
                resolve(appliedJobs)
            }).catch(err => reject(err))
        })
    },


    //GET SPECIFIC USER APPLED JOBS
    getSingleUserAppliedjob: (id) => {
        return new Promise((resolve, reject) => {
            User.find({ _id: objectId(id) }, { applied_jobs: 1, _id: 0 }).then((data) => {
                resolve(data);
            }).catch(err => reject(err))
        })

    },
    // CHANGE STATUS OF JOB
    changeStatus: (data) => {
        return new Promise((resolve, reject) => {
            console.log(data);
            const { sts, id, userId, jobId } = data;
            User.updateOne(
                { _id: objectId(userId), "applied_jobs.job_id": jobId },
                {
                    $set: { "applied_jobs.$.status": sts },
                })
                .then(()=>{
                    apply.updateOne({ _id: objectId(id) }, { $set: { status: sts } })
                    .then((data) => {
                        resolve(data)
                    }).catch(err => reject(err))
                }).catch(err => reject(err))
        })

    },
  //CANCEL JOB HELPER
   cancelJob:(id)=>{
       console.log(id,'job id');
       return new Promise((resolve,reject)=>{
           User.updateOne(
               {"applied_jobs.job_id":id},
               {
                   $set:{"applied_jobs.$.status":"Cancelled"}
               }
           ).then(()=>{
               Job.deleteOne({_id:objectId(id)}).then((data)=>{
                   resolve(data)
               }).catch(err=>reject(err))
           }).catch(err=>reject(err))
       })
   },
   //GET JOB PROVIDERS DETAILS
getProviders:()=>{
    return new Promise((resolve,reject)=>{
        Job.aggregate([
            {
                $group:{_id:null,count:{$sum:1}}
            }
        ])
    })
}
// db.collection.aggregate( [
//     { $group: { _id: null, myCount: { $sum: 1 } } },
//     { $project: { _id: 0 } }
//   ] )

//   db.inventory.aggregate(
//     [
//        {
//           $project: {
//              item: 1,
//              numberOfColors: { $size: "$colors" }
//           }
//        }
//     ]
//  )
}
