const express = require('express');
const { createProduct, getProducts,getProductById,updateProduct,deleteProduct,getCategories,sortProductByHighPrice,sortProductByLowPrice,recentAddedProduct } = require('../controllers/productController');
const router = express.Router();

router.get('/',getProducts);
router.get('/categories',getCategories);
router.get('/sortHigh',sortProductByHighPrice);
router.get('/sortLow',sortProductByLowPrice);
router.get('/recent',recentAddedProduct);
router.post('/',createProduct);
router.get('/:id',getProductById);
router.put('/:id',updateProduct);
router.delete('/:id',deleteProduct);


module.exports =  router;

