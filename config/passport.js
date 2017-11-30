const passport = require('passport');
const passportJwt = require('passport-jwt');
const config = require('./config');
const { userService } = require('../src/components/user');

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

let opts = {
    jwtFromRequest: ExtractJwt.fromHeader('auth_token'),
    secretOrKey: config.auth.secret
};

passport.use(new JwtStrategy(opts, async(jwtPayload, done) => {
    try {
        let user = await userService.get(jwtPayload.id);
        done(null, user.deleted ? false : user);
    } catch (err) {
        done(err, false);
    }
}));

module.exports = passport;
