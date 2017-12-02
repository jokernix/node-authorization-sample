const { asyncWrap, generateError } = require('../../../utils');
const service = require('./auth.service');

let login = async (req, res, next) => {

    if (!req.body.email) generateError(400, 'Email is required');
    if (!req.body.password) generateError(400, 'Password is required');

    let tokens = await service.login(req.body);
    res.json({
        status: 'success',
        data: tokens
    });

};

let registration = async (req, res, next) => {

    if (!req.body.email) generateError(400, 'Email is required');
    if (!req.body.password) generateError(400, 'Password is required');

    let user = await service.register(req.body);
    res.json({
        status: 'success',
        data: user
    });

};

let resetPassword = async (req, res, next) => {
    generateError(500, 'resetPassword: not implemented');
};

module.exports = {
    login           : asyncWrap(login),
    registration    : asyncWrap(registration),
    resetPassword   : asyncWrap(resetPassword)
};