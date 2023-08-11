const blog = require('../Models/blog')

// Authorization
const jwt  =require('jsonwebtoken')

const authorz = async (req, res, next) => {
    try {
        
        let id = req.params.blogid
        
        let blog = await blog.findById(id)
        if (!blog) {
            return res.status(404).send({status:false,msg:"blog is not found given id"})
        }
        
        let userId = blog.userId

        let token = req.headers['x-api-key']
        
        if (!token) {
            return res.status(400).send({status:false, msg:"Header must be present !"})
        }
        
        jwt.verify(token,"this is a secreat key" , function (err, valid) {
            
            if (err) {
                return res.status(403).send({status:false,msg:"Invalid token !"})
            }
            
            if (valid) {
                
                if (valid.userId == userId) { //here I checked user have permit to access this resources
                    next()
                } else {
                    return res.status(403).send({ status: false, msg: "you have not authorized person!!" })
                }
            }
        });
    } catch (error) {
        return res.status(500).send({ Error: error.message })
    }
}



module.exports.authorz = authorz
