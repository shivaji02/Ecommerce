// Desc: MongoDB connection
// Export: ConnectDB

const { MongoClient, ServerApiVersion } = require('mongodb');
const { default: mongoose } = require('mongoose');
const uri = "mongodb+srv://shivajimandapati:nirmalam1@cluster0.vqi2h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const ConnectDB = async()=>{
    try{
        await mongoose.connect(uri,{
        });
        console.log("Connected to MongoDB +++++++++++++");
    }catch(err){
        console.log("Error connecting to MongoDB----------",err);
    }
}

module.exports = ConnectDB;

// mongoose.connect(
//     uri
// ).then(()=>{
//     console.log("Connected to MongoDB");
// })
// .catch((err)=>{
//     console.log("Error connecting to MongoDB",err);
// }
// );
