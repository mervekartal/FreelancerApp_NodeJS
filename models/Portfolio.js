const mongoose = require('mongoose')
const slugify = require('slugify')
const Schema = mongoose.Schema 

//create schema
const PortfolioSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        unique: true
    }
})

PortfolioSchema.pre('validate', function(next){
    this.slug = slugify(this.title, {
        lower: true,
        strict: true
    })
    next()
})

const Portfolio = mongoose.model('Portfolio',PortfolioSchema)
module.exports = Portfolio

