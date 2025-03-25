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

const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await productModel.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ success: false, error: "Delete operation failed check id again" });
        }
        res.json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error deleting Product" })
    }
}

const getCategories = async (req, res) => {
    try {
        const getCategories = await productModel.find({}).distinct('category');
        res.json({ success: true, data: getCategories });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error fetching categories" });
    }
}

const sortProductByHighPrice = async (req,res) => {
    try{
        const products = await productModel.find({}).sort({product_price:-1});
        res.json({data:products});
    }catch(error){
        res.status(500).json({error:"Price is not sorted"});
    }
}

const sortProductByLowPrice = async (req,res) => {
    try{
        const products  = await productModel.find({}).sort({product_price:1});
        res.json({data:products});
    }catch(error){
        res.status(500).json({error:'Price is not Low sorted'});
    }
}

const recentAddedProduct = async(req,res)=>{
    try{
        const products = await productModel.find({}).sort({createdAt:1});
        console.log(products);
        res.json({data:products});
    }catch(error){
        res.status(500).json({error:"Error fetching recent added products"});
    }
}

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getCategories,
    sortProductByHighPrice,
    sortProductByLowPrice,
    recentAddedProduct
};