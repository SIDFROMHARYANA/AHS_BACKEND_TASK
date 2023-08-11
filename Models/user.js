
const mongoose = require('mongoose')

const usermodelschema = mongoose.Schema({
    name:{
      type:String,
      required:true
    },
    
    email:{
      type:String,
      required:true,
      unique:true,
    },
    password:{
      type:String,
      required:true,
      unique:true
    }
  
  },{timestamps:true})
  
  module.exports = mongoose.model('Usermodel',usermodelschema)