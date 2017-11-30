const { asyncWrap } = require('../../../utils');
const service = require('./user.service');

let get = (req, res, next) => {
    res.json({
        status: 'success',
        data: req.user
    });
};

let update = async(req, res, next) => {

    if (!req.body.email) throwError();

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
    let user = req.user;

    let tokens = await service.changePassword(user, req.body);
    
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

function throwError(message = 'Invalid data. Try again') {
    let err = new Error(message);
    err.status = 400;
    throw err;
}