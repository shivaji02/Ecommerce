const bcrypt = require('bcryptjs');
const { mongo, default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        // required:true
    },
    name: {
        type: String,
        required: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true
     },
    password: { 
        type: String, 
        required: true
     },
    // isAdmin:{type:Boolean,required:true,default:false},
}, {
    timestamps: true
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = async function (eneteredPassword) {
    return await bcrypt.compare(eneteredPassword, this.password);
};

const user = mongoose.model('user', userSchema);
module.exports = user;