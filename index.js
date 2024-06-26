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

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const corsOptions = {
  origin: ['http://localhost:3000', 'http://www.dianaglobal.com.br'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use('/doc', swaggerRoute)
app.use('/auth', AuthController)
app.use('/admin', authenticateMiddleware, AdminController)

app.listen(4000, () => {
    console.log('Server is running');
})

module.exports = app;