const {createJob} = require("../helpers/job")

const createJobFunction=(req,res)=>{
    console.log("--------jobbbbbb=========");
    console.log(req.body);
    createJob(req.body).then((data)=>{
        res.send(data)
    }).catch(err=>{
        res.code(400).send({err})
    })


}

module.exports={createJobFunction}