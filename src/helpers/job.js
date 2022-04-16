const Job = require('../model/jobSchema');
const Apply = require('../model/appliedJob');
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
                User.updateOne({ _id: data.user_id }, { $push: { posted_job: jobData._id } }).then((resp) => {
                    resolve(jobData)
                }).catch((err) => {
                    reject(err)
                })
            }).catch((err) => {

                reject(err)
            })
        })
    },

    // GET JOBS FROM DB
    getJobs: (search) => {
        return new Promise((resolve, reject) => {
            if (search) {
                console.log(search);
                Job.find({
                    $or: [
                        { job_designation: { $regex: search, $options: 'i' } },
                        { category: { $regex: search, $options: 'i' } },
                        { province: { $regex: search, $options: 'i' } },
                    ]
                }).then((data) => {
                    console.log('this is not found')
                    resolve(data)
                }).catch(err => reject(err))
            }
            else {
                Job.find({}).then((data) => {
                    resolve(data)
                }).catch(err => reject(err))
            }

        })
    },
    //GET JOBS BY ID
    getJobsById: (id) => {
        return new Promise((resolve, reject) => {
            Job.find({ user_id: id }).then(resp => resolve(resp))
                .catch(err => reject(err))
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
                const appliedJob = new Apply({
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
            Apply.find({ job_id: objectId(id) }).then((appliedJobs) => {
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
                .then(() => {
                    Apply.updateOne({ _id: objectId(id) }, { $set: { status: sts } }).then(() => {
                        Job.updateOne({ _id: objectId(jobId) }, { $set: { status: sts } })
                            .then((data) => {
                                resolve(data)
                            }).catch(err => reject(err))
                    }).catch(err => reject(err))
                }).catch(err => reject(err))
        })
    },
    //CANCEL JOB HELPER
    cancelJob: (id) => {
        console.log(id, 'job id');
        return new Promise((resolve, reject) => {
            User.updateOne(
                { "applied_jobs.job_id": id },
                {
                    $set: { "applied_jobs.$.status": "Cancelled" }
                }
            ).then(() => {
                Job.deleteOne({ _id: objectId(id) }).then((data) => {
                    resolve(data)
                }).catch(err => reject(err))
            }).catch(err => reject(err))
        })
    },
    //GET JOB PROVIDERS DETAILS
    getProviders: () => {
        return new Promise((resolve, reject) => {
            User.aggregate([
                {
                    $project: {
                        name: 1,
                        email: 1,
                        status: 1,
                        count: { $size: "$posted_job" }
                    }
                },
                {
                    $match: {
                        count: { $gte: 1 }
                    }
                }
            ]).then((resp) => {
                resolve(resp)
            }).catch(err => reject(err))
        })
    },
    //GET TASKERS CONTROLLER

    getTaskers: () => {
        return new Promise((resolve, reject) => {
            User.aggregate([
                {
                    $project: {
                        name: 1,
                        email: 1,
                        status: 1,
                        count: { $size: "$applied_jobs" },
                    }
                },
                {
                    $match: {
                        count: { $gte: 1 }
                    }
                }
            ]).then((resp) => {
                resolve(resp)
            }).catch(err => reject(err))
        })

    },
    //CHANGE STS OF PROVIDERS
    changeSts: (data) => {
        console.log(data, 'this us provider calll');
        return new Promise(async (resolve, reject) => {
            let user = await User.findOne({ _id: data.id });

            User.updateOne({ _id: data.id }, { $set: { status: !user.status } }).then(() => {
                if (data.provider) {

                    User.aggregate([
                        {
                            $project: {
                                name: 1,
                                email: 1,
                                status: 1,
                                count: { $size: "$posted_job" }
                            }
                        },
                        {
                            $match: {
                                count: { $gte: 1 }
                            }
                        }
                    ]).then((resp) => {
                        resolve(resp)
                    }).catch(err => reject(err))
                }
                else {
                    User.aggregate([
                        {
                            $project: {
                                name: 1,
                                email: 1,
                                status: 1,
                                count: { $size: "$applied_jobs" },
                            }
                        },
                        {
                            $match: {
                                count: { $gte: 1 }
                            }
                        }
                    ]).then((resp) => {
                        resolve(resp)
                    }).catch(err => reject(err))
                }
            }).catch(err => reject(err))

        })

    },
    // GET ALL JOB COUNT
    getCount: () => {
        return new Promise((resolve, reject) => {

            Job.count().then((resp) => {
                resolve(resp)
            }).catch(err => reject(err))
        })
    },
    //GET ALL APPLIED JOB COUNT
    getAppliedCount: () => {
        return new Promise((resolve, reject) => {
            Apply.count().then((resp) => {
                resolve(resp)
            }).catch(err => reject(err))
        })
    },
    //GET ALL  JOB DONE COUNT
    getJobsStsCount: () => {
        return new Promise((resolve, reject) => {
            Apply.aggregate([
                {
                    $group: {
                        _id: "$status",
                        count: { $sum: 1 }
                    }
                }
            ]).then((resp) => {
                resolve(resp)
            }).catch(err => reject(err))
        })
    }
}
