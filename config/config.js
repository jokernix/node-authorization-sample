module.exports = {
    auth: {
        secret: 'VQJvDxD92pYvc8hVfg9FaBkvsKLDkxVWZBKGdaK8VvyqrUgnkeuF9MCXhsP2ANDNt3T5S27G',
        tokenAge: '1d', // auth expiry - 1 day
    },

    mongodb: {
        uri: 'mongodb://localhost/node-authorization-sample',
        port: '27017',
    },

    isProd: process.env.NODE_ENV === 'production',

    baseUrl: 'http://localhost:3000'
};
