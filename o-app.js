const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv/config');

app.use(cors());
app.options('*', cors());

const api = process.env.API_URL;
const dbCon = process.env.DB_CON;

const productsRouter = require('./routes/products');

app.use(express.json());
app.use(morgan('tiny'));

// const productSchema = mongoose.Schema({
//   name: String,
//   image: String,
//   //countInStock: Number,
//   countInStock: {
//     type: Number,
//     required: true,
//   },
// });

// const Product = mongoose.model('Product', productSchema);

app.get('/', (req, res) => {
  res.send('hello API!');
});

app.use(`${api}/products`, productsRouter);

mongoose
  .connect(dbCon, { dbName: 'eshop' })
  .then(() => {
    console.log('db connected');
  })
  .catch((err) => {
    console.log(err);
  });

app.listen('3000', () => {
  console.log(api);
  console.log('server is running on http://localhost:3000');
});
