const express = require('express');
const AuthController = require('./src/controllers/AuthController.js');
const AdminController = require('./src/controllers/AdminController');
const authenticateMiddleware = require('./src/middlewares/authenticate');
const cors = require('cors');
const swaggerRoute = require('./src/routes/swagger.route.js');

const app = express();

// Definição das origens permitidas
const allowedOrigins = [
    'https://diana-global.vercel.app',
    'https://dianaglobal.com.br',
    'http://localhost:3000'
];

// Configuração do middleware CORS
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

// Aplicação do middleware CORS
app.use(cors(corsOptions));
app.use(express.json());

// Remoção do middleware CORS redundante
/*
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
*/

app.use('/doc', swaggerRoute);
app.use('/auth', AuthController);
app.use('/admin', authenticateMiddleware, AdminController);

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
