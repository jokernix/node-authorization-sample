const router = require('express').Router();
const { passport } = require('../../config');

const auth = passport.authenticate('jwt', { session: false, failWithError: true });

router.use('/auth', require('./auth').authRoutes);
router.use('/profile', auth, require('./user').userRoutes);

module.exports = router;