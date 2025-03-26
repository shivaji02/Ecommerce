const cartModel = require('../models/cart.js');


const addToCart = async (req,res) =>{
    try{
    const {productId,quantity} = req.body;
    const userId = req.user.userId;

    let cart = await cartModel.findOne({userId});

    if(!cart){
        cart = new cartModel({userId});
    } else{
        const productIndex = cart.products.findIndex(p=>p.productId.toString()=== productId.toString());
        if(productIndex > -1){
            cart.products[productIndex].quantity += quantity;
        }else{
            cart.products.push({productId,quantity});
        }
    }

    await cart.save();
    res.status(200).json({message:"Product added to cart successfully",cart});
    }catch(error){
        res.status(500).json({message:"Error adding product to cart",error});
    }
}


const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user.userId;

        const cart = await cartModel.findOne({ userId });
        if (!cart) {
            return res.status(400).json({ message: "Cart IS empty" });
        } else {
            const productIndex = cart.products.findIndex(p => p.productId.toString() === productId.toString());
            if (productIndex > -1) {
                cart.products.splice(productIndex, 1);
                await cart.save();
                res.status(200).json({ message: "Product removed from cart successfully", cart });
            } else {
                res.status(404).json({ message: "Product not found in cart" });
            }
        }
    } catch (error) {
        res.status(500).json({ message: "Error removing product from cart", error });
    }
};


const updateCart = async(req,res) =>{
    try{
        const{productId,quantity}=req.body;
        const userId = req.user.userId;

        const cart = await cartModel.findOne({userId});
        if(!cart){
            return res.status(400).json({message:"Cart is empty"});
        }
        const productIndex = cart.products.findIndex(p=>p.productId.toString()===productId.toString());
        if(productIndex>-1){
            cart.products[productIndex].quantity = quantity;
            await cart.save();
            res.status(200).json({message:"Cart updated successfully",cart});
        }else{
            res.status(404).json({message:"Wrong data passed Product not found in cart"});
        }
    }catch(error){
        res.status(500).json({message:"Server Error updating cart",error});
    }
}

const getCart = async(req,res) =>{
    try{
        const userId = req.user.userId;
        const cart = await cartModel.findOne({userId}).populate('products.productId');
        res.status(200).json({cart});
        if(!cart){
            return res.status(400).json({message:"Cart is Emptyy"});
        }
    }catch(error){
        res.status(500).json({message:"Server Error getting cart Data",error});
    }
}



module.exports = { addToCart, removeFromCart,updateCart,getCart };