const express = require('express')

//CONTROLLER FUNCTIONS
const { signupUser, loginUser } = require('../controllers/userContoller')

const router = express.Router()

//LOGIN ROUTE
router.post('/login', loginUser)

//SIGNUP ROUTE
router.post('/signup', signupUser)

module.exports = router