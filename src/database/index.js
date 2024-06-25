require('dotenv').config();

const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

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
