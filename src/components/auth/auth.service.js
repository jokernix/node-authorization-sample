const { User } = require('../../models');

module.exports.login = async ({ email, password }) => {
    let user = await User.findOne({ email });
    if (!user || user.deleted) throwError();

    let isMatch = await user.comparePassword(password);
    if (!isMatch) throwError();

    return user.getToken();

    function throwError() {
        let err = new Error('Invalid email or password. Try again');
        err.status = 401;
        throw err;
    }
};

module.exports.register = ({ email, password }) => {
    let user = new User({
        email,
        password
    });
    return user.save();
};
