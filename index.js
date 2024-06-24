const express = require('express');
const AuthController = require('./src/controllers/AuthController');
const AdminController = require('./src/controllers/AdminController');
const authenticateMiddleware = require('./src/middlewares/authenticate');
const cors = require('cors');
const swaggerRoute = require('./src/routes/swagger.route.js');

const app = express();

app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://dianaglobal.com.br');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');    
    next();
});

app.use(express.json());
app.use('/doc', swaggerRoute);
app.use('/auth', AuthController);
app.use('/admin', authenticateMiddleware, AdminController);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
