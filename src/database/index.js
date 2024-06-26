require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI; // Lê a variável de ambiente MONGODB_URI

if (!uri) {
    console.error('A variável de ambiente MONGODB_URI não está definida.');
    process.exit(1); // Encerra o processo com erro
}

// Configura a opção strictQuery
mongoose.set('strictQuery', true); // Ou false, dependendo da sua preferência

// Conecta ao MongoDB
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Conexão com mongodb estável');
})
.catch((error) => {
    console.log('Falha ao autenticar com mongodb');
    console.log(error);
});

mongoose.Promise = global.Promise;

module.exports = mongoose;

