const User = require('../../models').User;

module.exports = {
    login: async ({email, password}) => {
        let user = await User.findOne({ email });
        if (!user) throwError();

        let isMatch = await user.comparePassword(password);
        if (!isMatch) throwError();

        return user.getToken();

        function throwError() {
            let err = new Error('Invalid email or password. Try again');
            err.status = 401;
            throw err;
        }
    },

    register: ({email, password}) => {
        let user = new User({
            email,
            password
        });
        return user.save();
    }
};
