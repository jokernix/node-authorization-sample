const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');

let userSchema = new mongoose.Schema({

    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: 'Email address is required'
    },

    password: {
        type: String,
        required: 'Password is required'
    },

    deleted: Boolean,

    tokens: {
        refresh: String,
        resetPassword: String
    }
});

userSchema.options = {
    timestamps: true,
    toJSON: {
        transform: (doc, ret, options) => {
            ret.id = ret._id;
            delete ret.password;
            delete ret.tokens;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
};

userSchema.pre('save', async function (next) {
    try {
        const user = this;

        // only hash the password if it has been modified (or is new)
        if (user.isNew  || user.isModified('password')) {
            user.password = await bcrypt.hash(user.get('password'), 10);
        }

        return next();
    } catch (e) {
        return next(e);
    }
});

userSchema.methods.comparePassword = function (pw) {
    return bcrypt.compare(pw, this.get('password'));
};

userSchema.methods.getToken = async function () {
    let currentUser = {
        id: this.get('_id'),
        email: this.get('email'),
    };

    let accessToken = jwt.sign(currentUser, config.auth.secret, { expiresIn: config.auth.tokenAge });
    this.tokens.refresh = `${currentUser.id.toString()}.${crypto.randomBytes(40).toString('hex')}`;

    let savedUser = await this.save();
    return {
        currentUser: currentUser,
        accessToken: accessToken,
        refreshToken: savedUser.tokens.refresh,
        tokenType: 'JWT',
    };
};

module.exports = mongoose.model('User', userSchema);
