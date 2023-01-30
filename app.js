const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const mongoose = require('mongoose');
const methodOverride = require('method-override')

const pageController = require('./controllers/pageController')
const portfolioController = require('./controllers/portfolioController')


//connect db
mongoose.set('strictQuery', false)

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
app.use(express.json()) 
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method',{
    methods: ['POST','GET'],
}))

//Template Engine
app.set("view engine", "ejs")

//routes
app.get('/', pageController.getIndexPage) //home page - index
app.get('/about', pageController.getAboutPage) //about
app.get('/contact', pageController.getContactPage) //contact
// app.get('/portfolios', pageController.getPortfoliosPage) //portfolio page

app.post('/portfolios',portfolioController.createPortfolio) //create a new portfolio
app.get('/portfolios', portfolioController.getAllPortfolios) //all portfolio list
app.get('/portfolios/:slug', portfolioController.getPortfolio) //portfolio's single page
app.delete('/portfolios/:slug', portfolioController.deletePortfolio) //delete portfolio
app.put('/portfolios/:slug', portfolioController.updatePortfolio) //update portfolio



const port = 3000
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})