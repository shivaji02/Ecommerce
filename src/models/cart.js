const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true   
    },
    products:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product',
                required:true
            },
            quantity:{
                type:Number,
                default:1,
            }
        }
    ],

    totalPrice:{
        type:Number,
        default:0,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

cartSchema.pre('save',async function(next){
    this.totalPrice = await this.populate('products.productId').execPopulate()
    .then(doc => doc.products.reduce((total,item)=>total+item.productId.price * item.quantity,0));
    next();
});

const cartModel = mongoose.model('Cart',cartSchema);
module.exports = cartModel;



// const addToCart = async (req,res) =>{
//     try{
//         const {product_id,quantity} = req.body;
//         if(!product_id || !quantity){
//             return res.status(400).json({success:false,error:'You must provide a valid product and quantity'});
//         }
//         const cart = await 
//     }
// }