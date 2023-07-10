const env = require('dotenv').config({ path: './config/.env' });
const port = 3008;
const cors = require('cors');

const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const userRouter = require('./routes/user');
const Category = require('./models/category');
const categoryRouter = require('./routes/category');
const Product = require('./models/product');
const productRouter = require('./routes/product');
const Transportation = require('./models/transportation');
const transportationRouter = require('./routes/transportation');
const Commande = require('./models/commande');
const commandeRouter = require('./routes/commande');
const app = express();

// Body parser middleware
app.use(express.json());

// Connect to the database
mongoose
  .connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connection successful');
  })
  .catch((err) => {
    console.error('Database connection error', err);
  });
// Enable CORS for all routes
// app.use(cors());
const corsOptions = {
  origin: 'https://salesproduct.onrender.com',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));


// Mount the userRouter on the /users route
app.use('https://salesproduct-api.onrender.com/users', userRouter);
app.use('https://salesproduct-api.onrender.com/category', categoryRouter);
app.use('https://salesproduct-api.onrender.com/product', productRouter);
app.use('https://salesproduct-api.onrender.com/commande', commandeRouter);
app.use('https://salesproduct-api.onrender.com/transportation', transportationRouter);


// Start the server
app.listen(port, function () {
  console.log(
    'The server is running, please open your browser at https://salesproduct.onrender.com',
    port
  );
});