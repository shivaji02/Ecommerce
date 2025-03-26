const orderModel =  require('../models/order');
const cartModel = require('../models/cart');
const userModel = require('../models/user');
const productModel = require('../models/product');

const createDirectOrder = async (req,res) =>{
    try{
        const {productId,quantity} = req.body;
        const userId = req.user.userId;

        const product = await productModel.findById(productId);
        if(!product){
            return res.status(404).json({message:"Product not found"});
        }
        const totalPrice = product.product_price * quantity;
        const order = new orderModel({
            userId,
            products:[{productId,quantity}],
            totalPrice,
            address:req.body.address,
            status:'pending',
            payStatus:'pending',
        });
        await order.save();

        if (product.stockQuantity < quantity) {
            return res.status(400).json({ message: "Insufficient stock available" });
        }
        product.stockQuantity -= quantity;
        await product.save();

        res.status(201).json({message:"Order Created Successfully",order});
    } catch(error){
        res.status(500).json({message:"Error creating order",error});
    }
}




module.exports = {createDirectOrder};

