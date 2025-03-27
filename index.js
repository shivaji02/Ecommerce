require('dotenv').config();
const express = require('express');
const ConnectDB = require('./src/config/index');
const cors = require('cors');
const productRoutes = require('./src/routes/productRoute');
const userRoutes = require('./src/routes/userRoutes');
const cartRoutes = require('./src/routes/cartRoutes');
const orderRoutes = require('./src/routes/orderRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
ConnectDB();

//Middleware
app.use(cors());
app.use(express.json());
//Routes
app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/cart',cartRoutes);
app.use('/api/order',orderRoutes);

app.get('/', (req, res) => {
    res.send(">>>>>>>Ecommerce API server is Running 🚀 successfully");
});
app.get('/products', (req, res) => {
    res.send(">>>>>>>Ecommerce Product API server is Running 🚀 successfully");
});
app.get('/users', (req, res) => {
    res.send(">>>>>>>Users API server is Running 🚀 successfully");
});

//server connection
app.listen(PORT,()=>{
    console.log(`>>>>>Server is running on port ${PORT}`);
})
