const jwt = require("jsonwebtoken")
const validator = require('validator');
const { fn } = require('moment/moment');
const user = require('../Models/user');

function isEmail(emailAdress) {
  
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // w use for char * use for breakpoint $ for end
    if (regex.test(emailAdress))
        return true;
    else
        return false;
}

  
const createUser = async(req, res) => {
    try {
        let body = req.body
        if (Object.keys(body).length == 0) {
            return res.status(400).send({ Error: "Body should be not empty" })
        }
       const {name,email,password} = body

        if(!(name && email && password)){
            return res.status(400).send({status:false,message:"name ,email and password are required fields"})
        }
       
       
        let emailvalid = isEmail(body.email)
        if (emailvalid == false) {
            return res.status(400).send({ status: false, msg: "Invalid email ! please enter valid email address ! " })
        }
        if (!validator.isStrongPassword(body.password)) {
            return res.status(400).send({ status: false, msg: "Password must be contain 1 uppercase 1 lowercase special char and min 8 length" })
        }
        let checkemail = await user.findOne({email:body.email})
        if(checkemail){
            return res.status(400).send({status:false,msg:"Email already exit"})
        }
        let data = new user(req.body)
        let result = await data.save()
        res.status(201).send({ status: true, data: result })
    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }


}
const login = async function (req, res) {
    // try {
        let email = req.body.email
        let password = req.body.password
        let data = req.body
       
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "Email and Password Required !" })
        
        if (!email) return res.status(400).send({ status: false, msg: "email is required" })
        
        if (!password) return res.status(400).send({ status: false, msg: "password is required" })
        
        const users = await user.findOne({ email: email, password: password })
       
        if (!users) return res.status(401).send({ status: false, msg: "Email or Password Invalid Please try again !!" })
        
        const token = jwt.sign({
            userId: user._id,
            batch: "plutonium",

        }, "this is a secreat key")
        res.setHeader("x-api-key", token)

        res.status(200).send({ status: true, data:{token:token} })

    }
//     catch (error) {
//         return res.status(500).send({ status: false, msg: error.message })
//     }
// }

module.exports.createUser = createUser
module.exports.login = login