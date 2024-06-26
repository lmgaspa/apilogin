const express = require('express');
const app = express();
const cors = require('cors');
const AuthController = require('./src/controllers/AuthController.js');
const AdminController = require('./src/controllers/AdminController');
const authenticateMiddleware = require('./src/middlewares/authenticate');
const swaggerRoute = require('./src/routes/swagger.route.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Permite solicitações de qualquer origem
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      return res.status(200).json({});
  }

  next();
});

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://luizgabi:luizgabi0410@apiluiz.ihmeusb.mongodb.net/?appName=APILuiz";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.use('/doc', swaggerRoute);
app.use('/auth', AuthController);
app.use('/admin', authenticateMiddleware, AdminController);

const port = process.env.PORT || 10000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
