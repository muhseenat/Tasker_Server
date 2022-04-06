const { createJob, getJobs,
    applyJob, getAppliedJob,
    getSingleUserAppliedjob,
    changeStatus } = require("../helpers/job")

// JOB CREATING CONTROLER
const createJobFunction = (req, res) => {
    createJob(req.body).then((data) => {
        res.send(data)
    }).catch(err => {
        res.code(400).send({ err })
    })


}

// JOB GETS CONTROLLER
const getJobsFunction = (req, res) => {
    getJobs().then((data) => {

        res.send(data)
    }).catch(err => {
        res.code(400).send({ err })
    })
}

//JOB APPLING CONTROLLER
const applyJobFunction = (req, res) => {
    console.log(req.body);
    applyJob(req.body).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.code(400).send(err)
    })
}

//APPLIED  USERS FOR A SPECIFIC JOB GETTING CONTROLLER
const getAppliedJobFunction = (req, res) => {
    const { id } = req.params
    getAppliedJob(id).then((data) => {
        res.send(data)
    }).catch(err => res.code(400).send({ err }))
}

//GET SINGLE USER APPLIED JOB CONTROLLER
const SingleUserAppliedJobsFuntion = (req, res) => {
    const { id } = req.params
    getSingleUserAppliedjob(id).then((data) => {
        res.send(data)

    }).catch(err => res.code(400).send(err))
}
//CHANGE STATUS OF JOBS CONTROLLER
const changeStatusFunction = (req, res) => {
    changeStatus(req.body).then((data) => {
        res.send(data)
    }).catch(err => res.code(400).send(err))
}

module.exports = {
    createJobFunction, getJobsFunction,
    applyJobFunction, getAppliedJobFunction, changeStatusFunction,
    SingleUserAppliedJobsFuntion
}