const express = require('express')
const router  = express.Router()
const {user} = require('../controllers/user')


router.post('/user' , user);




module.exports = router;