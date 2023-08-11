
const mongoose =require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId

const blogmodelschema = mongoose.Schema({
 
   title:{
    type:String,
    required:true
  },

  content:{
    type:String,
    required:true
  },

   userId:{
    type:ObjectId,
    ref:'user'
  },
  
  author:{
    type: String,
  },

  tags:[String],
 
  isPublished:{
    type:Boolean,
    default: false
  },
   
  isDeleted:{
    type : Boolean,
    default: false
  },
  
  ispublishedAt:{
    type:Date,
    default:null
  },
  
},{timestamps:true})

module.exports=mongoose.model('Blogmodel',blogmodelschema)

