const Category = require('../model/categorySchema')

module.exports={

    //GET CATAGORIES FROM DB

  getCategory:()=>{
      return new Promise((resolve,reject)=>{
          Category.find({}).then((data)=>{
              resolve(data)
          }).catch(err=>reject(err))
      })
  },
  
  
//   addCategory:(data)=>{
//       return new Promise((resolve ,reject))

//   }
}
