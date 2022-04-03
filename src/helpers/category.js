const Category = require('../model/categorySchema')

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
              name:data.category,
              
          })
          category.save().then((category)=>{
              resolve(category)
          }).catch(err=>reject(err))
      })

  }
}
