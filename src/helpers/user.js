const User = require("../model/userSchema")

module.exports={
    // USER LOGIN HELPER
    userLogin : ( data)=>{
        return new Promise(async(resolve,reject)=>{
            const {email, password}= data
            User.findOne({email}).then((data)=>{
                if(!data){ 
                    reject('User not found')
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

    // USER SIGNUP HELPER
    userSignup:(data)=>{
        return new Promise(async(resolve,reject)=>{

            // finding email exist or phone

           const userExit = await User.findOne({$or:[{email:data.email},{phone:data.phone}]}) 
           console.log(userExit);

            if(userExit) reject('User already exist')
             
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


    },

    getUsers:(id)=>{
        return new Promise((resolve,reject)=>{

            User.findById(id).then((data)=>{
                resolve(data)
            }).catch(err=>reject(err))
        
        })
    },

    //GET USERS COUNT
    getCount:()=>{
    return new Promise((resolve,reject)=>{
        User.count().then((resp)=>{
            console.log(resp);
            resolve(resp)
        }).catch(err=>reject(err))
    })
    }
}