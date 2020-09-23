const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    
    name: {
        type: String,
        trim: true,
        required: true,
    },
    surname: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    cp: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
        
    },
    tokens:[String]  
});

const User = mongoose.model('User', UserSchema)

module.exports = User;