const { mongo, default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({

    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },
    product_name: {
        type: String,
        required: true
    },
    product_price: {
        type: Number,
        required: true
    },
    isInStock: {
        type: Boolean,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;
