
const {createJobFunction,getJobsFunction,applyJobFunction} = require('../controllers/job')
// JOB ITEM
const jobItem = {
    type:'array',
    properties:{
        _id:{type:'string'},
        user_id:{type:'string'},
        job_designation:{type :'string'},
        job_desc:{type:'string'},
        category:{type :'string'},
        province:{type :'string'},
        city:{type :'string'},
        minimum_pay:{type :'string'},
        from:{type :'string'},
        to:{type :'string'},
        skills:{type :'string'}
    } 
}

// APPLIED JOB ITEM
const appliedJobItem={
    type:'array',
    properties:{
        user_id:{type:'string'},
        job_id:{type:'string'},
        tasker_id:{type:'string'},
        resume:{type:'object'},
     
        
    }
}

// CREATE JOB OPTION SCHEMA
const createJobOption={
    schema:{
        response:{
            200:jobItem
        },
        body:{
            type:'object',
            required:["job_designation","category",'province','minimum_pay','from','to','skills'],
            properties:{
                ...jobItem.properties
            }
        }
    },
    handler:createJobFunction
}

//GET JOB OPTION SCHEMA
const getJobOptions={
    schema:{
        response:{
            200:jobItem
        }
    },
    handler:getJobsFunction
}

//APPLY JOB OPTION SCHEMA
const applyJobOptions={
    schema:{
       
        body:{
            type:'object',
            required:["user_id","job_id","tasker_id","resume"],
            properties:{
              ...appliedJobItem.properties
            }
        }
    },
    handler:applyJobFunction
}

module.exports={createJobOption,getJobOptions,applyJobOptions}