
const {getCategory} = require('../helpers/category')

// CONTROLLER TO ADD CATEGORIES TO DB
const addCategoryFunction= async(req,res)=>{
    const url=[]
    const files = req.files;
    for(const file of files){
      const {path} = file
      await cloudUpload.uploader.upload(path,{
          resource_type:'auto',
          folder:"Tasker"
        }).then((result)=>{
          url.push({url:result.url, id: result.public_id})
      })
    }
      const data = JSON.parse(req.body.data);

      console.log(files);
      console.log(data,'after adding to cloudinaty');

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