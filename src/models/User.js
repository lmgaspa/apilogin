const mongoose = require('../database/index');
const bcryptjs = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        const hash = await bcryptjs.hash(this.password, 10);
        this.password = hash;
    }
    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;