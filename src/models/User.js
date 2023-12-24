const mongoose = require('../database');
const bcryptjs = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },

    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
    },

    password: {
        type: String,
        require: true,
        select: false,
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const hash = await bcryptjs.hash(this.password, 10);
        this.password = hash;
        return next();
    } catch (error) {
        return next(error);
    }
});

UserSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

const User = mongoose.model('User', UserSchema);