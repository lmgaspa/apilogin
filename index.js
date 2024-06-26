const express = require('express');
const AuthController = require('./src/controllers/AuthController.js');
const AdminController = require('./src/controllers/AdminController.js')
const authenticateMiddleware = require('./src/middlewares/authenticate.js')
const cors = require('cors');
const swaggerRoute = require('./src/routes/swagger.route.js')
require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

async function connectToMongoDB() {
    const client = new MongoClient(uri, {
    });

    try {
      // Connect to the MongoDB cluster
      await client.connect();

      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
  } finally {
      // Ensure the client is closed when you finish using it
      await client.close();
      console.log('Disconnected from MongoDB');
  }
}

connectToMongoDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin: *', 'https://dianaglobal.com.br', 'localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.use('/doc', swaggerRoute)
app.use('/auth', AuthController)
app.use('/admin', authenticateMiddleware, AdminController)

app.listen(4000, () => {
    console.log('Server is running');
})

module.exports = app;