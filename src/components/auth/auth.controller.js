const { asyncWrap } = require('../../../utils');
const service = require('./auth.service');

let login = async (req, res, next) => {

    let tokens = await service.login(req.body);
    res.json({
        status: 'success',
        data: tokens
    });

};

let registration = async (req, res, next) => {

    let user = await service.register(req.body);
    res.json({
        status: 'success',
        data: user
    });

};

let resetPassword = async (req, res, next) => {
    res.send('resetPassword: not implemented');
};

module.exports = {
    login           : asyncWrap(login),
    registration    : asyncWrap(registration),
    resetPassword   : asyncWrap(resetPassword)
};