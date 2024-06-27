const mongoose = require('mongoose')
require('dotenv').config()

const mongo_password = process.env.MONGO_PASSWORD

async function connectDB() {
    await mongoose.connect(`mongodb+srv://luizgabi:${mongo_password}@apiluiz.ihmeusb.mongodb.net/api-nodejs-mongo?retryWrites=true&w=majority`, {},
        (error) => {
            if (error) {
                console.log('Falha ao autenticar com mongodb');
                console.log(error);
                return;
            }
            console.log('Conexão com mongodb estável')
        })
}

mongoose.Promise = global.Promise;

module.exports = connectDB