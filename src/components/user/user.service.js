const { User } = require('../../models');

module.exports.get = async id => {
    let user = await User.findById(id);
    
    if (!user) {
        let err = new Error('Not Found');
        err.status = 404;
        throw err;
    }

    return user;
};
