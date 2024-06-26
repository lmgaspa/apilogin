const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const AuthController = require('./src/controllers/AuthController.js');
const AdminController = require('./src/controllers/AdminController');
const authenticateMiddleware = require('./src/middlewares/authenticate');
const swaggerRoute = require('./src/routes/swagger.route.js');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors()); // Enable pre-flight across all routes

// CORS headers setup
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
      return res.status(200).send();
  }

  next();
});

// MongoDB connection
const uri = "mongodb+srv://luizgabi:luizgabi0410@apiluiz.ihmeusb.mongodb.net/mydatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
    serverSelectionTimeoutMS: 5000,
  }
});

async function connectToMongoDB() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connected to MongoDB!");

    // Após conectar-se ao MongoDB, configure as rotas e inicie o servidor Express
    setupRoutesAndStartServer();
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    // Trate o erro de conexão de forma apropriada
  }
}

async function setupRoutesAndStartServer() {
  // Rotas
  app.use('/doc', swaggerRoute);
  app.use('/auth', AuthController);
  app.use('/admin', authenticateMiddleware, AdminController);

  // Inicia o servidor
  const port = process.env.PORT || 10000;
  app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
  });
}

// Chama a função para conectar ao MongoDB
connectToMongoDB();
