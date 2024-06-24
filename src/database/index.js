require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000
}, (error) => {
    if (error) {
        console.log('Failed to authenticate with mongodb');
        console.log(error);
        return;
    }

    console.log('Connection to stable mongodb');
});

mongoose.Promise = global.Promise;

module.exports = mongoose