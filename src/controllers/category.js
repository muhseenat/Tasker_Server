



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

//GET CATAGORIES FROM DB CONTROLLER
const getCategoryFunction=(req,res)=>{
  getCategory()

}



module.exports={addCategoryFunction}