const mongoose = require('mongoose');
const Promise = require('bluebird');
const config = require('./config');

mongoose.connect(config.mongodb.uri, {
    useMongoClient: true,
});

mongoose.Promise = Promise;
