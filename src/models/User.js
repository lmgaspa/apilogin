const mongoose = require('mongoose');
mongoose.set('strictQuery', true); // Configura strictQuery como true

const Schema = mongoose.Schema;
const bcryptjs = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

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

module.exports = mongoose.model('User', UserSchema);
