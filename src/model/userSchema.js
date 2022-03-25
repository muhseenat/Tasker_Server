const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const UserSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
        require:true
    },
    passwordHash:{
        type:String,
        require:true
    },
    approved_jobs:{
        type:Array
    },
    applied_jobs:{
        type:Array
    },
    posted_job:{
        type:Array
    }
},{timestamps:true});

UserSchema.virtual("password").set(function (password) {
    this.passwordHash = bcrypt.hashSync(password, 10);
  });
  
  UserSchema.methods = {
    authenticate: function (password) {
      return bcrypt.compareSync(password, this.passwordHash);
    },
  };
module.exports=  mongoose.model('user',UserSchema)