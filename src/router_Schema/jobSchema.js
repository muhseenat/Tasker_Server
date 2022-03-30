
const {createJobFunction} = require('../controllers/job')

const jobItem = {
    type:'object',
    properties:{
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

module.exports={createJobOption}