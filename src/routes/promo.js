const express = require('express');
const multer = require('multer');
const router = express.Router();

const upload = multer();

const promoControllers = require('../controllers/promo');

// POST
router.post('/addPromo', promoControllers.addPromo);

//GET
router.get('/getPromos', promoControllers.getPromos);

module.exports = router;