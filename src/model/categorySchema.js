const mongoose = require ('mongoose')


const CategorySchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:Array,
        required:true
    }
},{timestamps:true})


module.exports=mongoose.model('category',CategorySchema)