let config = {};

config.mongodb = {
    uri: process.env.MONGO_URI || 'mongodb://localhost/node-authorization-sample',
    port: process.env.MONGO_PORT || '27017',
    options: {
        user: process.env.MONGO_USER || '',
        pass: process.env.MONGO_PASS || ''
    }
};

config.isProd = process.env.NODE_ENV === 'production';

config.host = 'localhost:3000';

config.auth = {
    secret: 'VQJvDxD92pYvc8hVfg9FaBkvsKLDkxVWZBKGdaK8VvyqrUgnkeuF9MCXhsP2ANDNt3T5S27G',
    tokenAge: '1d', // auth expiry - 1 day
};

module.exports = config;
