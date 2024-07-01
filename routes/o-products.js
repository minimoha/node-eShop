const express = require('express');
const router = express.Router();
const { Product } = require('../models/product');

// app.get(`${api}/products`, (req, res) => {
//   const product = {
//     id: 1,
//     name: 'hair_dresser',
//     image: 'some_url',
//   };
//   res.send(product);
// });

router.get(`/`, async (req, res) => {
  const productList = await Product.find();
  if (!productList) {
    res.status(500).json({
      success: false,
    });
  }
  res.send(productList);
});

// app.post(`${api}/products`, (req, res) => {
//   const newProduct = req.body;
//   res.send(newProduct);
// });

router.post(`/`, (req, res) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    countInStock: req.body.countInStock,
  });

  product
    .save()
    .then((createdProduct) => {
      res.status(201).json(createdProduct);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false,
      });
    });

  //res.send(newProduct);
});

module.exports = router;
