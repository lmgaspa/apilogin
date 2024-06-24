const express = require('express');
const AuthController = require('./src/controllers/AuthController');
const AdminController = require('./src/controllers/AdminController');
const authenticateMiddleware = require('./src/middlewares/authenticate');
const cors = require('cors');
const swaggerRoute = require('./src/routes/swagger.route.js');

const app = express();

// Configuração básica do CORS usando o pacote cors
app.use(cors());

// Middleware para tratar CORS de maneira mais granular
app.use((req, res, next) => {
    // Permitindo requisições de um único domínio específico (https://dianaglobal.com.br)
    res.header('Access-Control-Allow-Origin', 'https://dianaglobal.com.br');
    // Permitindo requisições de localhost na porta 3000 (para ambiente de desenvolvimento)
    // res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    
    // Permitindo métodos permitidos
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    
    // Permitindo headers permitidos
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Invocando próximo middleware
    next();
});

// Parse do corpo da requisição como JSON
app.use(express.json());

// Rotas para documentação Swagger
app.use('/doc', swaggerRoute);

// Rotas de autenticação
app.use('/auth', AuthController);

// Rotas administrativas protegidas
app.use('/admin', authenticateMiddleware, AdminController);

// Iniciando o servidor na porta 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
