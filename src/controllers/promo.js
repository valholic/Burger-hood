const promos = require('../models/promo');
const bodyParser = require('body-parser');

exports.addPromo = (req, res, next) => {
    const imagePromo = req.files.imagePromo[0].path;
    const name = req.body.name;

    const Promo = new promos({
        imagePromo,
        name,
    });

    Promo.save()
    .then(result => {
        res.status(201).json({
            message: "Promo added",
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
};

exports.getPromos = (req, res, next) => {
    promos.find()
    .then(result => {
        res.status(200).json({
            message: "Data found",
            data: result,
        })
    })
    .catch(err => {
        next(err);
    })
}