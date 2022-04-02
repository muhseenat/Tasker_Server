 const {addCategoryFunction,getCategoryFunction} =require('../controllers/category');
 const upload = require('../config/multer');
 
 //CATEGORY ITEM
 const categoryItem={
     type:'array',
     properties:{
        _id:{type:'string'},
        name:{type:'string'},
        url:{type:'string'}
     }
     
 }
 
 
 
 
 //ADD CATEGORY OPTION SCHEMA
 const addCategoryOption={
  
     preHandler:upload.array('img'),
     handler:addCategoryFunction
 }
//GET CATEGORIES OPTION SCHEMA
 const getCategoryOption={
     schema:{
         response:{
             200:categoryItem
         }
       
     },
     handler:getCategoryFunction
 }


 module.exports={addCategoryOption,getCategoryOption}