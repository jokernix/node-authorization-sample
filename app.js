const express = require('express');
const bodyParser = require('body-parser');
const { passport, mongoose } = require('./config');
const components = require('./src/components');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(passport.initialize());

app.use('/api', components);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    const status = err.status || 500;

    res.status(status);
    res.json({
        success: 'error',
        message: err.message
    });
});

module.exports = app;
