const { generateError } = require('../../../utils');
const { User } = require('../../models');

module.exports.login = async ({ email, password }) => {
    let user = await User.findOne({ email });
    if (!user || user.deleted) generateError(404, 'User is not found');

    let isMatch = await user.comparePassword(password);
    if (!isMatch) generateError(400, 'Incorrect password')

    return user.getToken();
};

module.exports.register = ({ email, password }) => {
    let user = new User({
        email,
        password
    });
    return user.save();
};
