const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const mongoose = require('mongoose');

const pageController = require('./controllers/pageController')


mongoose.set('strictQuery', false)

//connect db
mongoose.connect('mongodb://localhost:27017/freelancer-db').then(() => {
    console.log('DB Connection Successful')
}).catch((err) => {
    console.log(err)
})

process.on('warning', (warning) => {
    console.log(warning.stack);
})


//middlewares
app.use(express.static('public'))

//Template Engine
app.set("view engine", "ejs")

//routes
app.get('/', pageController.getIndexPage) //home page - index
app.get('/about', pageController.getAboutPage) //about
app.get('/contact', pageController.getContactPage) //contact
app.get('/portfolios', pageController.getPortfoliosPage) //all portfolios 




const port = 3000
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})