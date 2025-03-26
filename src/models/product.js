const { mongo, default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({

   
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
        get: function() {
            return this.stockQuantity > 0;
        }
    },
    stockQuantity: {
        type:Number,
        default:0,
        required:true
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
