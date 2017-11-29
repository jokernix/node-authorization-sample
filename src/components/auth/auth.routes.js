const { mapRoute } = require('../../../utils');
const ctrl = require('./auth.controller');

let routes = [
    {
        method: 'POST',
        path: '/login',
        handler: ctrl.login
    },
    {
        method: 'POST',
        path: '/registration',
        handler: ctrl.registration
    },
    {
        // reset password
        method: 'DELETE',
        path: '/password',
        handler: ctrl.resetPassword
    }
];

module.exports = mapRoute(routes);
