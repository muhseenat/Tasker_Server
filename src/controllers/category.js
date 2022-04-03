
const {getCategory,addCategory} = require('../helpers/category')

// CONTROLLER TO ADD CATEGORIES TO DB
const addCategoryFunction= (req,res)=>{
  
     addCategory(req.body).then((data)=>{
       res.send(data)
     }).catch((err)=>{
       res.code(400).send({err})
     })

    }

// CONTROLLER FOR GET CATEGORIES FROM DB
const getCategoryFunction=(req,res)=>{
  getCategory().then((data)=>{
    res.send(data)
  }).catch((err)=>{
    res.code(400).send({err})
  })

}



module.exports={addCategoryFunction,getCategoryFunction}