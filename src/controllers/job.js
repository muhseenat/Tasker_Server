const { createJob, getJobs,
    applyJob, getAppliedJob,
    getSingleUserAppliedjob,
    changeStatus, cancelJob, getProviders,
    changeSts,getTaskers, getCount,
    getJobsStsCount,
    getAppliedCount
} = require("../helpers/job")

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
 const {search}=req.query
    getJobs(search).then((data) => {

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

//CANCEL JOB CONTROLLER
const cancelJobFunction = (req, res) => {
    const { id } = req.params;
    cancelJob(id).then((data) => {
        res.send(data)
    }).catch(err => res.code(400).send(err))
}

//GET PROVIDERS DETAILS 
const getProviderFunction = (req, res) => {
    getProviders().then((data) => {
        res.send(data)
    }).catch(err => res.code(400).send(err))
}

//GET PROVIDERS DETAILS 
const getTaskersFunction = (req, res) => {
    getTaskers().then((data) => {
        res.send(data)
    }).catch(err => res.code(400).send(err))
}

//CHANGE STS OF PROVIDERS
const changeStsFunction = (req, res) => {
    // const { id } = req.params
    changeSts(req.body).then((data) => {
        res.send(data)
    }).catch((err) => {
        res.code(400).send(err)
    })
}
//GET ALL JOB COUNT
const getJobCountFunction=(req,res)=>{
    getCount().then((data)=>{
        res.send(data)
    }).catch(err=>res.code(400).send(err))
}
//GET ALL APPLIED JOBS COUNT
const getAppliedJobCountFunction=(req,res)=>{
    getAppliedCount().then((data)=>{
        res.send(data)
    }).catch(err=>res.code(400).send(err))
}
//GET ALL JOBS STATUS COUNT
const getJobStsFunction=(req,res)=>{
    getJobsStsCount().then((data)=>{
        res.send(data)
    }).catch(err=>res.code(400).send(err))
}

module.exports = {
    createJobFunction, getJobsFunction,
    applyJobFunction, getAppliedJobFunction, changeStatusFunction,
    SingleUserAppliedJobsFuntion, cancelJobFunction, getProviderFunction,getJobStsFunction,
    changeStsFunction, getTaskersFunction,getJobCountFunction,getAppliedJobCountFunction
}