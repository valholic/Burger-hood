const express = require('express');
const multer = require('multer');
const router = express.Router();

const authControllers = require('../controllers/auth');
const { body } = require('express-validator');

//POST
router.post('/cacc', [
    body('name').isLength({min: 5}).withMessage('Minimal 5 Characters!'),
    body('email').isEmail().withMessage('Use @gmail.com!'),
    body('password').isLength({min: 8}).withMessage('Minimal 8 Characters!'),
], authControllers.createAccount);
router.post('/facc', authControllers.getAccByPassword);
router.post('/fidacc', authControllers.getAccById);
router.post('/addProfile', authControllers.addProfile);

module.exports = router;