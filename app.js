const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const fileUpload = require('express-fileupload')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')

const pageController = require('./controllers/pageController')
const portfolioController = require('./controllers/portfolioController')

const pageRoute = require('./routes/pageRoute')
const portfolioRoute = require('./routes/portfolioRoute')
const userRoute = require('./routes/userRoute')

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
app.use(fileUpload())
app.use(session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/freelancer-db' })
  }))
app.use(flash())
  //flash'taki mesajları flashMessages değişkenine atamak için bir middleware yaratıldı
app.use((req, res, next) => {
    res.locals.flashMessages = req.flash()
    next()
  })
  

//Template Engine
app.set("view engine", "ejs")

//global variable
global.userIN = null //false

app.use('*',(req, res, next) => {
    userIN = req.session.userID
    next()
})


//routes - CRUD
app.use('/', pageRoute) //aynı kullanım -> app.get('/', pageRoute) 
app.use('/portfolios', portfolioRoute)
app.use('/users', userRoute)


const port = 3000
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})