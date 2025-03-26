const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {createDirectOrder}  = require('../controllers/orderController');

const router = express.Router();

router.post('/productOrder',protect,createDirectOrder);



module.exports = router;