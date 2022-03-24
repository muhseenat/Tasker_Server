const mongoose  = require("mongoose")

module.exports={
    dbConnect:(url)=>{
        mongoose.connect(url).then(()=>{
            console.log('database connect with :', url)
        }).catch((err)=>{
            console.log('database error', err)
        });
    }
}