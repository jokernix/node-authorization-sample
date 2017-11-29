const { mapRoute } = require('../../../utils');
const ctrl = require('./user.controller');

let routes = [
    {
        method: 'GET',
        path: '/',
        handler: ctrl.get
    },
    {
        method: 'PUT',
        path: '/',
        handler: ctrl.update
    },
    {
        method: 'DELETE',
        path: '/',
        handler: ctrl.remove

    },
    {
        // update password
        method: 'PUT',
        path: '/password',
        handler: ctrl.changePassword
    },
];

module.exports = mapRoute(routes);
