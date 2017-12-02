const { generateError } = require('../../../utils');
const { User } = require('../../models');

module.exports.get = async id => {
    let user = await User.findById(id);
    
    if (!user) generateError(404, 'User is not found');

    return user;
};

module.exports.update = async(id, fields) => {
    let options = {
        new: true
    };
    let updatedUser = await User.findByIdAndUpdate(id, fields, options)
        .exec();
    return updatedUser;
}

module.exports.changePassword = async(user, {newPassword, oldPassword}) => {
    let isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) generateError(400, 'Incorrect password');

    user.password = newPassword;
    let savedUser = await user.save();

    return savedUser.getToken();
}