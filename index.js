const express = require('express');
const app = express();
const cors = require('cors');
const AuthController = require('./src/controllers/AuthController.js');
const AdminController = require('./src/controllers/AdminController');
const authenticateMiddleware = require('./src/middlewares/authenticate');
const swaggerRoute = require('./src/routes/swagger.route.js');
const client = require('./src/database/db')

client.connect()
    .then(() => {
        console.log('Successfully connected to MongoDB Atlas');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB Atlas:', error);
    });
;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors()); // Enable pre-flight across all routes

// CORS headers setup
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).send();
  }

  next();
});

  app.use('/doc', swaggerRoute);
  app.use('/auth', AuthController);
  app.use('/admin', authenticateMiddleware, AdminController);
