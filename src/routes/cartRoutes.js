const {addToCart,removeFromCart,updateCart,getCart} = require('../controllers/cartController');
const express = require('express');
const {protect} = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add2Cart',protect,addToCart);
router.delete('/removeFromCart',protect,removeFromCart);
router.put('/updateCart',protect,updateCart);
router.get('/getCart',getCart);


module.exports = router;