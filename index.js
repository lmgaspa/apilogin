const express = require('express');
const AuthController = require('./src/controllers/AuthController.js');
const AdminController = require('./src/controllers/AdminController')
const swaggerRoute = require('./src/routes/swagger.route.js')

const authenticateMiddleware = require('./src/middlewares/authenticate')
const cors = require('cors');

const app = express();
app.use(express.json());

const allowedOrigins = [
  'https://dianaglobal.com.br',
  'http://localhost:3000',
  'https://apilogin-mvf1.onrender.com'
];

const corsOptions = {
  origin: (origin, callback) => {
    // Permite requisições sem origem (e.g. mobile apps, curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Se você precisar enviar cookies ou autenticação
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('CORS is configured properly.');
});

app.use('/doc', swaggerRoute)
app.use('/auth', AuthController)
app.use('/admin', authenticateMiddleware, AdminController)

app.listen(3001, () => {
  console.log('Server is running');
})