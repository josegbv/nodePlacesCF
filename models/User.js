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
    },
    password: { type: String, required: true, bcrypt: true },
});

userSchema.post('save', function(user, next){
    User.count({}).then(count=>{
        if(count === 1){
            User.update({"id":user._id}, {admin:true}).then(result=>{
                next();
            })
        }else{
            next()
        }
    })
})

userSchema.plugin(bcrypt);

const User = mongoose.model('User', userSchema);

module.exports = User;