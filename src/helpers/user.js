const User = require("../model/userSchema")

module.exports={
    userLogin : ( data)=>{
        return new Promise(async(resolve,reject)=>{
            const {email, password}= data
            User.findOne({email}).then((data)=>{
                if(!data){ 
                    reject('not found')
                }else{
                    data.comparePassword(password,(err,success)=>{
                        if(success){
                            resolve(data)
                            
                        }else{
                            reject('Email or Password Invalid')
                        }
                    })
                    
                }
               
            })
        })
    },

    userSignup:(data)=>{
        return new Promise(async(resolve,reject)=>{

            // finding email exist or phone

           const userExit = await User.findOne({$or:[{email:data.email},{phone:data.phone}]}) 
           console.log(userExit);

            if(userExit) reject('user already exist')
             
            const user = new User({
                name:data.name,
                email:data.email,
                phone:data.phone,
                password:data.password
            })

            user.save().then((userData)=>{
                resolve(userData)
            }).catch((err)=>{
                reject(err)
            })

        })


    }

}