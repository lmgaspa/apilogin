const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    const dbRole = await client.db().command({ hello: 1 });
    console.log(
      `Role of database - Host: ${dbRole.me}  Is primary: ${dbRole.isWritablePrimary}`
    );
    await client.close();
    
    // Mongoose connection
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Mongoose connected');
  } catch (e) {
    console.log('Error: ', e.message);
  }
}

mongoose.Promise = global.Promise;

module.exports = connectDB;
