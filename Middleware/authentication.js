const jwt = require('jsonwebtoken')

// Authentication
const authent = async (req, res, next) => {
    try {
        let token = req.headers['x-api-key']
        if (!token) {
            return res.status(400).send({ status: false, msg: "Header must be present !" })
        }
        let decode = jwt.verify(token,"this is a secreat key")
        if(decode){
            next()
        }else{
            return res.status(400).send({status:false,msg:"Invalid token"})
        }
    } catch (error) {
        return res.status(500).send({ Error: error.message })
    }
}

module.exports.authent = authent

