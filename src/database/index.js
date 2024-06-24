require('dotenv').config();

const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

mongoose.connect(uri, {
});

(error) => {
    if (error) {
        console.log('Falha ao autenticar com mongodb');
        console.log(error);
        return;
    }
    console.log('Conexão com mongodb estável')
}

mongoose.Promise = global.Promise;

module.exports = mongoose;