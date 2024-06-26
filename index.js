const express = require('express');
const AuthController = require('./src/controllers/AuthController.js');
const AdminController = require('./src/controllers/AdminController')

const authenticateMiddleware = require('./src/middlewares/authenticate')
const cors = require('cors');
const swaggerRoute = require('./src/routes/swagger.route.js')

const app = express();
app.use(cors());
app.use(express.json());


app.use('/doc', swaggerRoute)
app.use('/auth', AuthController)
app.use('/admin', authenticateMiddleware, AdminController)

app.listen(10000, () => {
    console.log('Server is running babe');
})