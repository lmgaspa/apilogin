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

UserSchema.pre('save', async function(next) {
    const hash = await bcryptjs.hash(this.password, 10);
    console.log(this);
    console.log(hash);
    this.password = hash;
})

const User = mongoose.model('User', UserSchema);

module.exports = User