const menus = require('../models/menu');
const bodyParser = require('body-parser');
const { validationResult } = require('express-validator');

exports.addMenu = (req, res, next) => {
    const errors = validationResult(req);
    const errorArray = [];
    
    if(!errors.isEmpty()) {
        const err = new Error('Input invalid!');
        err.errorStatus = 400;
        err.data = errors.array();
        errorArray.push({
            message: err.message,
            data: err.data
        })
    };

    if(!req.files.image) {
        const err = new Error('Image must be uploaded!');
        err.errorStatus = 400;
        errorArray.push({
            message: err.message,
        })
    }

    if(errorArray.length !== 0) {
        res.status(400).json(errorArray);
        return;
    }

    const name = req.body.name;
    const price = req.body.price;
    const caption = req.body.caption;
    const type = req.body.type;
    const image = req.files.image[0].path;

    const Menu = new menus({
        name,
        price,
        caption,
        type,
        image,
    });

    Menu.save()
    .then(result => {
        res.status(201).json({
            message: "Menu added",
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.getBurgers = (req, res, next) => {
    menus.find({
        type: "burger"
    })
    .then(result => {
        res.status(200).json({
            message: 'Data found',
            data: result
        });
    })
    .catch(err => {
        next(err);
    })
}

exports.getSodas = (req, res, next) => {
    menus.find({
        type: "soda"
    })
    .then(result => {
        res.status(200).json({
            message: 'Data found',
            data: result
        });
    })
    .catch(err => {
        next(err);
    })
}

exports.getSideDishes = (req, res, next) => {
    menus.find({
        type: "side-dish"
    })
    .then(result => {
        res.status(200).json({
            message: 'Data found',
            data: result
        });
    })
    .catch(err => {
        next(err);
    })
}

exports.getIceCreams = (req, res, next) => {
    menus.find({
        type: "ice-cream"
    })
    .then(result => {
        res.status(200).json({
            message: 'Data found',
            data: result
        });
    })
    .catch(err => {
        next(err);
    })
}

exports.getCakes = (req, res, next) => {
    menus.find({
        type: "cake"
    })
    .then(result => {
        res.status(200).json({
            message: 'Data found',
            data: result
        });
    })
    .catch(err => {
        next(err);
    })
}

exports.getSmoothies = (req, res, next) => {
    menus.find({
        type: "smoothie"
    })
    .then(result => {
        res.status(200).json({
            message: 'Data found',
            data: result
        });
    })
    .catch(err => {
        next(err);
    })
}

exports.getPuddings = (req, res, next) => {
    menus.find({
        type: "pudding"
    })
    .then(result => {
        res.status(200).json({
            message: 'Data found',
            data: result
        });
    })
    .catch(err => {
        next(err);
    })
}

exports.getAllMenus = (req, res, next) => {
    menus.find({})
    .then(result => {
        res.status(200).json({
            message: "Data found",
            data: result
        });
    })
    .catch(err => {
        next(err);
    })
}
