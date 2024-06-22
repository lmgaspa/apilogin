// index.js (ou app.js)

// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

const mongoose = require('mongoose');

// Obtém a URL de conexão do MongoDB a partir das variáveis de ambiente
const mongodbURI = process.env.MONGODB_URI;

// Conecta ao MongoDB usando Mongoose
mongoose.connect(mongodbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // Increase server selection timeout
  socketTimeoutMS: 45000 // Increase socket timeout
});

// Verifica se a conexão foi bem sucedida
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error of conexion to MongoDB:'));
db.once('open', function() {
  console.log('Conected to MongoDB with sucess!');
});

// Resto do seu código da aplicação
