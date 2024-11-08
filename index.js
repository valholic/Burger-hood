const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
let multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Router
const menuRoutes = require('./src/routes/menu');
const authRoutes = require('./src/routes/auth');
const promoRoutes = require('./src/routes/promo');

app.use('/public/desserts/cakes', express.static(path.join(__dirname, '/public/desserts/cakes')));
app.use('/public/desserts/ice-creams', express.static(path.join(__dirname, '/public/desserts/ice-creams')));
app.use('/public/desserts/puddings', express.static(path.join(__dirname, '/public/desserts/puddings')));
app.use('/public/drinks/smoothies', express.static(path.join(__dirname, '/public/drinks/smoothies')));
app.use('/public/drinks/sodas', express.static(path.join(__dirname, '/public/drinks/sodas')));
app.use('/public/foods/burgers', express.static(path.join(__dirname, '/public/foods/burgers')));
app.use('/public/foods/side-dishes', express.static(path.join(__dirname, '/public/foods/side-dishes')));
app.use('/public/promos', express.static(path.join(__dirname, '/public/promos')));
app.use('/public/profiles', express.static(path.join(__dirname, '/public/profiles')));

// File filter
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/webp') {
        cb(null, true)
    } else {
        cb(null, false)
    }
};

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(file.fieldname === 'image') {
            switch(req.body.type) {
                case "burger":
                    cb(null, 'public/foods/burgers');
                    break;
                
                case "side-dish": 
                    cb(null, 'public/foods/side-dishes');
                    break;

                case "ice-cream":
                    cb(null, 'public/desserts/ice-creams');
                    break;

                case "soda":
                    cb(null, 'public/drinks/sodas');
                    break;

                case "cake": 
                    cb(null, 'public/desserts/cakes');
                    break;
                
                case "smoothie": 
                    cb(null, 'public/drinks/smoothies');
                    break;

                case "pudding":
                    cb(null, 'public/desserts/puddings');
                    break;
            }
        } else if(file.fieldname === 'imagePromo') {
            cb(null, 'public/promos');
        } else if(file.fieldname === 'profile') {
            cb(null, 'public/profiles')
        }
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname);
    }
})

app.use(
    multer(
        {
            storage: fileStorage,
            fileFilter
        }
    )
    .fields(
        [
        {
            name: 'image',
            maxCount: 1,
        },
        {
            name: 'imagePromo',
            maxCount: 1,
        },
        {
            name: 'profile',
            maxCount: 1,
        }
        ]
    )
);

// set up bodyparser
app.use(bodyParser.json());

// cors origin error
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type', 'Authorization');
    next();
});

// routes
app.use('/v1/menu', menuRoutes);
app.use('/v1/auth', authRoutes);
app.use('/v1/promo', promoRoutes);

// error no toki
app.use((err, req, res, next) => {
    const status = err.errorStatus || 500;
    const message = err.message;
    const data = err.data;

    res.status(status).json({
        message,
        data,
    });
});

mongoose.connect('mongodb+srv://valholic_123:vGyYrsl1rsw5Iilz@cluster0.sgw83pg.mongodb.net/burger-hood?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    app.listen(port, () => {
        console.log(`Listening at port ${port}`)
    })
})
.catch(err => console.log(err))