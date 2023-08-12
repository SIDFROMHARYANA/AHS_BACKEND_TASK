
const mongoose = require('mongoose');


const blog = require('../Models/blog');
const user = require('../Models/user');

const ObjectId = require('mongoose').Types.ObjectId

const createblog = async (req, res) => {
   
    try{
        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ Error: "Body  should be not empty" })
        }
        
        let body = req.body
        
        if (!(body.title)) {
            return res.status(400).send({ status: false, msg:" Body must contain title !"})
        }

        
        if (!(body.content)) {
            return res.status(400).send({ status: false, msg:" Body must contain content !"})
        }

        if (!(body.tags)) {
            return res.status(400).send({ status: false, msg:" Body must contain tags !"})
        }

        if (!(body.author)) {
            return res.status(400).send({ status: false, msg:" Body must contain author !"})
        }
        
        
       
        let id = req.body.userId
       
       
        let users = await user.findById(id)
       
        if (!users) {
            return res.status(404).send({ status: false, msg: "User not found" })
        }
                       
       
        let data = new blog(req.body)
        
        let result = await data.save()
        
        
        if(result.isPublished == false){
            result = await blog.findOneAndUpdate({$set:{ispublishedAt:Date.now()}},{new:true})
        }
        res.status(201).send({ status: true, data: result })
    }
    catch(error)
    {
        return res.status(500).send({status:false , msg : error.message})
    }
}


  

const getblogs = async (req, res) => {
    try {
        let query = req.query 
        
        if (query) {
            let blogs = await blog.find({ $and: [query, { isDeleted: false }, { isPublished: true }] })
            
             return blogs.length == 0 ?  res.status(404).send({ status: false, msg: "Blog are not found" }) : res.send({ status: true, data: blogs })
        }
        else {
            let blogs = await blog.find({ isDeleted: false , isPublished: false })
            return blogs.length == 0 ? res.status(404).send({ status: false, msg: "Blog are not found" }) : res.send({ status: true, data: blogs })
        }
        
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })

    }

}

const getblogsbyId = async(req,res) => {

     try{
   
    if (!ObjectId.isValid(req.params.blogid)) {
        return res.status(404).send({ status: false, msg: "BlogId invalid !" });
    }
    
    let blog_Id = req.params.blogid
        

    //Validate: The blogId is valid or not.
    
    let blogs = await blog.findById({ _id: blog_Id }, {isDeleted: false} , {isPublished: false })
   {
    return blogs.length == 0 ? res.status(404).send({ status: false, msg: "Blog are not found" }) : res.send({ status: true, data: blogs })
}
    }    
    
catch (err) {
    
    return res.status(500).send({ status: false, msg: " Server Error", error: err.message })
}
}


const blogsUpdate = async (req, res) => {
    try {
        let id = req.params.blogid
        let body = req.body.body
        let author = req.body.author
        let title = req.body.title
        let content = req.body.content

        let tags = req.body.tags
       
        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ Error: "Body  should be not empty" })
        }
        
        let blogid = await blog.findById(id)
       
        if (blogid.isDeleted == true) {
            return res.status(404).send({ status: false, msg: " This document already Deleted !!" })
        }

        if(author){
            var auth = blogid.author //[]
            auth.push(author)
        }
       
        if(tags){
            var tag = blogid.tags //[]
            tag.push(tags)
        }
        if(content){
            var con = blogid.content
            con.push(content)
        }
        if(isPublished){
          var date = Date.now()
        }
        
        blog = await blog.findOneAndUpdate({ _id: id }, { $set: { title: title,  body: body , auth: author ,contents: content, tags: tag , isPublished: isPublished, ispublishedAt: date } }, { new: true });
        res.status(200).send({ status: true, message:"Success", data:blog })
   
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}



const deleteblog = async function (req, res) {
    try {
        //Validate: The blogId is present in request path params or not.
        if (!ObjectId.isValid(req.params.blogid)) {
            return res.status(404).send({ status: false, msg: "BlogId invalid !" });
        }
        let blog_Id = req.params.blogid
        

        //Validate: The blogId is valid or not.
        let blog = await blog.findById(blog_Id)
        if (!blog) return res.status(404).send({ status: false, msg: "Blog does not exists" })

        //Validate: If the blogId is not deleted (must have isDeleted false)
        let is_Deleted = blog.isDeleted
        if (is_Deleted == true) return res.status(404).send({ status: false, msg: "Blog is already deleted" })

        //Delete a blog by changing the its isDeleted to true.
        
        let deletedblog = await blog.findOneAndUpdate({ _id: blog_Id },
            
            { $set: { isDeleted: true, deletedAt: Date.now() } }, { new: true })
        //Sending the Deleted response after updating isDeleted : true
        return res.status(200).send({ status: true })
    }
    catch (err) {
        
        return res.status(500).send({ status: false, msg: " Server Error", error: err.message })
    }
}


module.exports.createblog = createblog
module.exports.getblogs = getblogs
module.exports.getblogsbyId = getblogsbyId

module.exports.blogsUpdate = blogsUpdate
module.exports.deleteblog = deleteblog

