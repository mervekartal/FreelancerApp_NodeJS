const express = require('express')
const portfolioController = require('../controllers/portfolioController')

const router = express.Router()

router.route('/').get(portfolioController.getAllPortfolios) 
router.route('/:slug').get(portfolioController.getPortfolio) //portfolio ait profil sayfasını getirme
router.route('/:slug').delete(portfolioController.deletePortfolio) //portfolio silme
router.route('/:slug').put(portfolioController.updatePortfolio) //portfolio güncelleme

module.exports = router