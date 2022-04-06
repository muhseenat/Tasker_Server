 const {addCategoryFunction,getCategoryFunction,
    deleteCategoryFunction} =require('../controllers/category');
 
 //CATEGORY ITEM
 const categoryItem={
     type:'array',
     properties:{
        _id:{type:'string'},
        name:{type:'string'},
  
     }
     
 }
 
 
 
 
 //ADD CATEGORY OPTION SCHEMA
 const addCategoryOption={
    schema:{
        body:{
            type:'string',
            required:["category"]
        }

      
    },
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

 //DELETE CATEGOTY OPTION SCHEMA
 const deleteCategoryOption={
     schema:{
      
         body:{
            type:"string",
             required:["id"]
         }
     },
     handler:deleteCategoryFunction
 }

 

 module.exports={addCategoryOption,getCategoryOption,deleteCategoryOption}