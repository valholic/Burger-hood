const express = require('express');
const multer = require('multer');
const upload = multer();
const router = express.Router();
const { body } = require('express-validator');

const menuControllers = require('../controllers/menu');

//POST
router.post('/addMenu', [
    body('caption').isLength({max: 85}).withMessage('Maximum 85 Characters!'),
    body('name').isLength({min: 1}).withMessage('Must fill!'),
    body('price').isLength({min: 1}).withMessage('Must fill!'),
    body('type').isLength({min: 1}).withMessage('Must fill!'),
], menuControllers.addMenu);

//GET
router.get('/getBurgers', upload.none(), menuControllers.getBurgers);
router.get('/getSideDishes', upload.none(), menuControllers.getSideDishes);
router.get('/getIceCreams', upload.none(), menuControllers.getIceCreams);
router.get('/getSodas', upload.none(), menuControllers.getSodas);
router.get('/getPuddings', upload.none(), menuControllers.getPuddings);
router.get('/getCakes', upload.none(), menuControllers.getCakes);
router.get('/getSmoothies', upload.none(), menuControllers.getSmoothies);
router.get('/getAllMenus', upload.none(), menuControllers.getAllMenus);

module.exports = router;