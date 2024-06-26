const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const config = require('../config/config');

const uri = config.MONGODB_URI;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 60000,
        socketTimeoutMS: 60000,
    }
});

module.exports = client;
