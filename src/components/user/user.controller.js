const service = require('./user.service');

let get = async (req, res, next) => {
    res.send('get user');
};

let update = async (req, res, next) => {
    res.send('update user');
};

let remove = async (req, res, next) => {
    res.send('remove user');
};

let changePassword = async (req, res, next) => {

};

module.exports = {
    get,
    update,
    remove,
    changePassword
};