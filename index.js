const express = require('express');
const AuthController = require('./src/controllers/AuthController.js');
const AdminController = require('./src/controllers/AdminController')

const authenticateMiddleware = require('./src/middlewares/authenticate')
const cors = require('cors');
const swaggerRoute = require('./src/routes/swagger.route.js')

const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin: *', 'https://diana-global.vercel.app/', 'dianaglobal.com.br', 'https://dianaglobal.com.br',
    'https://diana-global.vercel.app/api/auth/', 'https://diana-global.vercel.app/api/auth/', 'localhost:3000', 'localhost:3000/signup');
    
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.use('/doc', swaggerRoute)
app.use('/auth', AuthController)
app.use('/admin', authenticateMiddleware, AdminController)

app.listen(3001, () => {
    console.log('Server is running');
})