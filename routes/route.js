const express = require('express');
const router = express.Router()

const Usercontroller = require('../Controllers/usercontroller')
const BlogController = require('../Controllers/blogcontroller')

const check = require('../Middleware/authentication')
const access = require('../Middleware/authorization')


router.post('/users', Usercontroller.createUser)
router.post("/login", Usercontroller.login)

router.post('/posts', check.authent  ,BlogController.createblog)
router.get('/posts' , check.authent ,BlogController.getblogs)
router.get('/posts/:postid', access.authorz , BlogController.getblogs)

router.put('/posts/:postid', access.authorz , BlogController.blogsUpdate)
router.delete("/posts/:postid",  access.authorz , BlogController.deleteblog)

module.exports = router;
// adding this comment for no reason