const { validationResult } = require('express-validator');
const auths = require('../models/auth');

exports.createAccount = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const err = new Error('Input invalid!');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    };

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const status = req.body.status;

    const Auth = new auths({
        name,
        email,
        password,
        status
    });

    Auth.save()
    .then(result => {
        res.status(201).json({
            message: "Account created",
            data: result
        });
    })
    .catch(err => {
        next(err);
    })
}

exports.getAccByPassword = (req, res, next) => {
    const password = req.body.password;
    const name = req.body.name;

    auths.find({
        name,
        password,
    })
    .then(result => {
        if(result.length !== 0) {
            res.status(200).json({
                message: 'Account found',
                data: result
            });
        } else {
            res.status(404).json({
                message: 'Account not found!',
                data: result
            });
        }
    })
    .catch(err => {
        next(err);
    });
}

exports.getAccById = (req, res, next) => {
    const id = req.body.uid;

    auths.findById(id)
    .then(result => {
        res.status(200).json({
            message: "Account found",
            data: result,
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.addProfile = (req, res, next) => {
    const profile = req.files.profile[0].path;
    const id = req.body.uid;

    auths.findById(id)
    .then(result => {
        const account = result;
        account.profile = profile;

        account.save()
        .then(result => {
            res.status(200).json({
                message: "Profile added",
                data: result,
            })
        })
    })
    .catch(err => {
        next(err);
    })
}