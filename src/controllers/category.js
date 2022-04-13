
const {getCategory,addCategory,  deleteCategory,} = require('../helpers/category')

// CONTROLLER TO ADD CATEGORIES TO DB
const addCategoryFunction= (req,res)=>{
  console.log(req.body,'this is dataaaa');
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
//DELETE CATEGORY CONTROLLER
const deleteCategoryFunction=(req,res)=>{
  const {id} =req.params;
  console.log(id,'this is id');
  deleteCategory(id).then((data)=>{
    res.send(data)
  }).catch(err=>res.code(400).send(err))
}

module.exports={addCategoryFunction,getCategoryFunction,deleteCategoryFunction}