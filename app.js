const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')


//middlewares
app.use(express.static('public'))

//Template Engine
app.set("view engine", "ejs")

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'temp/index.html'))
  })



const port = 3000
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})