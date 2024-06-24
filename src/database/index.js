require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGODB_URI, {}, (error) => {
    if (error) {
        console.log('Failed to authenticate with mongodb');
        console.log(error);
        return;
    }

    console.log('Connection to stable mongodb');
});

mongoose.Promise = global.Promise;

const secret = process.env.SECRET;

module.exports = { mongoose, secret };