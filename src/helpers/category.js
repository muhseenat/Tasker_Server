const Category = require('../model/categorySchema')
const mongoose = require('mongoose')
const objectId = mongoose.Types.ObjectId;
module.exports={
    
//  GET CATAGORIES FROM DB
  getCategory:()=>{
      return new Promise((resolve,reject)=>{
          Category.find({}).then((data)=>{
              resolve(data)
          }).catch(err=>reject(err))
      })
  },
  
  //  ADD CATAGORIES TO DB 
  addCategory:(data)=>{
  
      return new Promise((resolve ,reject)=>{
          const category=new Category({
              name:data,
          })
          category.save().then(()=>{
            Category.find({}).then((data)=>{
                resolve(data)
            }).catch(err=>reject(err))
          }).catch(err=>reject(err))
      })

  },
//DELETE CATEGORY FROM DB
deleteCategory:(id)=>{
    return new Promise((resolve,reject)=>{
        Category.deleteOne({_id:objectId(id)}).then(()=>{
            Category.find({}).then((data)=>{
                resolve(data)
            }).catch(err=>reject(err))
        }).catch(err=>reject(err))

    })
},


}
