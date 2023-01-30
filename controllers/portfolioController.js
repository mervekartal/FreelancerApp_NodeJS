const Portfolio = require('../models/Portfolio')

// exports.createPortfolio = async (req,res) => {
//     //template hazır olmadığı için json dosyası gönderildi.
//     const portfolio = await Portfolio.create(req.body)
//     try{
//         res.status(201).json({
//             status: 'success',
//             portfolio: portfolio
//         })
//     }catch(error){
//         res.status(400).json({
//             status: 'fail',
//             error
//         })
//     }
// }

exports.createPortfolio = async (req, res) => {  
    try{
        const portfolio = await Portfolio.create(req.body)
        res.status(201).redirect('/portfolios')      
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

exports.getPortfolio = async (req,res) => {
    try{
    const portfolio = await Portfolio.findOne({slug: req.params.slug})
        res.status(200).render('portfolio', {
            portfolio,
            page_name: "portfolio"
        })
    }catch(error){
         res.status(400).json({
         status: 'fail',
         error

        })
    }
}

exports.deletePortfolio = async (req,res) => {
    try{
        const portfolio = await Portfolio.findOneAndRemove({slug: req.params.slug})
        // req.flash("success",`${portfolio.title} has been deleted successfully`) //flash message for delete portfolio
        res.status(200).redirect('/portfolios')
    }catch(err){
         res.status(400).json({
         status: 'fail',
         err
        })
    }
}

exports.updatePortfolio = async (req,res) => {

    try{
        const portfolio = await Portfolio.findOne({slug: req.params.slug})
        portfolio.name = req.body.name
        portfolio.description = req.body.description
        
        portfolio.save()

        res.status(200).redirect(`/portfolios/${req.params.slug}`)

    }catch(err){
         res.status(400).json({
         status: 'fail',
         err
        })
    }
}
