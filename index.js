const express = require('express');
const cors = require('cors');
const AuthController = require('./src/controllers/AuthController.js');
const AdminController = require('./src/controllers/AdminController');
const authenticateMiddleware = require('./src/middlewares/authenticate');
const swaggerRoute = require('./src/routes/swagger.route.js');

const app = express();

// Use CORS middleware with specific origin
app.use(cors({
    origin: ['https://dianaglobal.com.br', 'http://localhost:3000'], // Allowed origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
}));

app.use(express.json());

// Custom middleware to set headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow all origins or specify specific origins
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/doc', swaggerRoute);
app.use('/auth', AuthController);
app.use('/admin', authenticateMiddleware, AdminController);

const port = process.env.PORT || 10000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
