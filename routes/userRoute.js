const express = require('express')
const authController = require('../controllers/authController')
const authMiddleware = require('../middlewares/authMiddleware')
const { body } = require('express-validator')
const User = require('../models/User')

const router = express.Router()

router.route('/signup').post([
    body('name').not().isEmpty().withMessage('Please Enter Your Name'),
    body('email').isEmail().withMessage('Please Enter Valid Email')
    .custom((userEmail) => {
        return User.findOne({email: userEmail}).then(user => {
            if(user){
                return Promise.reject('This email already exists')
            }
        })
    }),
    body('password').isEmail().withMessage('Please Enter A Password'),
],authController.createUser) 

router.route('/login').post(authController.loginUser) 
router.route('/logout').get(authController.logoutUser) 
router.route('/portfolios').get(authMiddleware, authController.getPortfoliosPage) //url üzerinden portfolios sayfasına gitmek isteyen kullanıcılar, giriş yapmadıysa login sayfasına yönlendirilir. 


module.exports = router