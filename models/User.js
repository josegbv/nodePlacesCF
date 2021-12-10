const mongoose = require('mongoose');
const bcrypt = require('mongoose-bcrypt');

let userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    name: String,
    admin: {
        type: Boolean,
        default: false
    }
});

userSchema.plugin(bcrypt);

const User = mongoose.model('User', userSchema);

module.exports = User;