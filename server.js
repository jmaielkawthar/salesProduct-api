const env = require('dotenv').config({ path: './config/.env' });
const port = 3008;

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

// Mount the userRouter on the /users route
app.use('/users', userRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use('/commande', commandeRouter);
app.use('/transportation', transportationRouter);

// Start the server
app.listen(port, function () {
  console.log(
    'The server is running, please open your browser at http://localhost:%s',
    port
  );
});