const express = require('express');
const {createProduct, getProducts, getProduct, updateProduct, deleteProduct} = require('../controllers/products.controller.js');
const router = express.Router();

router.post('/', createProduct);

router.get('/', getProducts);

router.get('/:id', getProduct);

router.put('/:id', updateProduct);

router.delete("/:id", deleteProduct);

module.exports = router;