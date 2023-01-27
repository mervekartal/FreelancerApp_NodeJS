const Portfolio = require('../models/Portfolio')

exports.createPortfolio = async (req,res) => {
    //template hazır olmadığı için json dosyası gönderildi.
    const portfolio = await Portfolio.create(req.body)
    try{
        res.status(201).json({
            status: 'success',
            portfolio: portfolio
        })
    }catch(error){
        res.status(400).json({
            status: 'fail',
            error
        })
    }
}

exports.getAllPortfolios = async (req,res) => {
    try{
    const portfolios = await Portfolio.find({}).sort('-createdAt')
        res.status(200).render('portfolios', {
            portfolios,
            page_name: "portfolios"
        })
    }catch(error){
         res.status(400).json({
         status: 'fail',
         error

        })
    }
}
