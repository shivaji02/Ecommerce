const mongoose = require('mongoose');


const addressSchema = new mongoose.Schema({
    type:{
        type:String,
        enum:['home','office','other'],
        required:true
    },
    details:{
    pincode: { type: Number, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    street: { type: String, required: true },
    landmark: { type: String, required: true },
    name: { type: String, required: true },
    },
})



const orderSchema = new mongoose.Schema({
   
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        required: true,
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                default: 1,
                required: true
            },
        }
    ],
    address: addressSchema,
    totalPrice: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['pending', 'delivered', 'cancelled', 'success'],
        default: 'pending',

    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'offline', 'failed'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now,
    }
}, {
    timestamps: true
})

orderSchema.pre('save',async function (next){
    let total = 0;
    for(const  product of  this.products){
        const product = await mongoose.model('product').findById(item.productId);
        total += product.price * product.quantity;
    }
    this.totalPrice = total;
    updatedAt = Date.now();
    next();
})

const orderModel = mongoose.model('Order', orderSchema);
module.exports = orderModel;