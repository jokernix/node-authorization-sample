/**
 * A module for configuring routes
 * @module map-route
 */

/**
 * @example route:
 *  {
 *      method: 'GET',
 *      path:   '/hello/:id',
 *      handler: function() {} || [ function() {}, function() {} ]
 *  }
 */
module.exports = (routes) => {
    const router = require('express').Router();

    if (!Array.isArray(routes)) {
        throw new Error('"routes" must be an array');
    }

    routes.forEach(route => {
        let method = route.method.toLowerCase();
        router[method](route.path, route.handler);
    });

    return router;
};
