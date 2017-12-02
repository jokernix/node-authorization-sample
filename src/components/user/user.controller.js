const { asyncWrap, generateError } = require('../../../utils');
const service = require('./user.service');

let get = (req, res, next) => {
    res.json({
        status: 'success',
        data: req.user
    });
};

let update = async(req, res, next) => {

    if (!req.body.email) generateError(400, 'Email is required');

    let savedUser = await service.update(req.user.get('_id'), {
        email: req.body.email
    });

    res.json({
        status: 'success',
        data: savedUser
    });
};

let remove = async(req, res, next) => {

    await service.update(req.user.get('_id'), {
        deleted: true
    });

    res.json({
        status: 'success',
        data: null
    });
};

let changePassword = async(req, res, next) => {

    if (!req.body.newPassword) generateError(400, 'New password is required');
    if (!req.body.oldPassword) generateError(400, 'Old password is required');

    let tokens = await service.changePassword(req.user, req.body);
    
    res.json({
        status: 'success',
        data: tokens
    });
};

module.exports = {
    get: get,
    update: asyncWrap(update),
    remove: asyncWrap(remove),
    changePassword: asyncWrap(changePassword)
};
