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
    if (!isMatch) {
        let err = new Error('Invalid password. Try again');
        err.status = 400;
        throw err;
    }

    user.password = newPassword;
    let savedUser = await user.save();

    return savedUser.getToken();
}