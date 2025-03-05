const Product = require('../models/product');
const productModel = require('../models/product');

const createProduct = async (req, res) => {
    try {
        const { product_name, product_price, isInStock, category } = req.body;
        if (!product_name || !product_price || isInStock === undefined || !category) {
            return res.status(400).json({ success: false, error: 'You must provide a complete product' });
        }
        const product = await productModel.create({ product_name, product_price, isInStock, category });
        res.status(201).json({ success: true, message: `Product created successfully: ${product.product_name}` });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Product not found, try another ID' });
    }
};

const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }
        res.status(200).json({ success: true, data: updatedProduct, message: "Product updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

const deleteProduct = async (req,res) =>{
    try{
        const deletedProduct = await productModel.findByIdAndDelete(req.params.id);
        if(!deletedProduct){
            return res.status(404).json({success:false, error:"Delete operation failed check id again"});
        }
            res.json({success:true, message:"Product deleted successfully"});
        } catch(error){
            res.status(500).json({success:false, error:"Error deleting Product"})
        }
    }



module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
}