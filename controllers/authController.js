const bcrypt = require('bcrypt')

const User = require('../models/User')
const { validationResult } = require('express-validator')

exports.createUser = async (req,res) => {
    try{
        const user = await User.create(req.body)
        res.status(201).redirect('/login')
    }catch(error){
        // res.status(400).json({
        //     status: 'fail',
        //     error
        // })
        const errors = validationResult(req)
        console.log(errors)
        console.log(errors.array()[0].msg)
        // for(let i = 0; i < errors.array().length; i++){
        //     req.flash("error",`${errors.array()[i].msg}`) //flash messages for register  
        // }
        res.status(400).redirect('/register')

    }
}

exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      //mongoose 6
      const user = await User.findOne({ email });
      if (user) {
        bcrypt.compare(password, user.password, (err, same) => {
          if (same) {
            // USER SESSION
            req.session.userID = user._id;
            res.status(200).redirect('/portfolios');
          } else {
            req.flash('error', 'Your email or password is  incorrect!');
            res.status(400).redirect('/login');
          }
        });
      } else {
        req.flash('error', 'User is not exist!');
        res.status(400).redirect('/login');
      }
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        error,
      });
    }
}

exports.logoutUser = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}

exports.getPortfoliosPage = async (req,res) => {
    const user = await (await User.findOne({_id: req.session.userID}))
    const portfolios = await Portfolio.find()
    const users = await User.find()
    res.status(200).render('portfolios',{
        page_name: "portfolios",
        user,
        portfolios,
        users
    })
}
