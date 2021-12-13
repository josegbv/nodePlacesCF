const jwt = require('jsonwebtoken');
const secret  = require('../config/secret');
const User = require('../models/User');


function authenticate(req, res, next){
    User.findOne({email:req.body.email})
    .then(user=>{
        user.verifyPassword(req.body.password).then(valid=>{
            if(valid){
                req.user = user;
                next()
            }else{
                next(new Error('Credenciales invalidas'))
            }
        })
    }).catch(error=>{
        next(error)
    })
}

function generateToken(req, res, next){
    if(!req.user) return next();
    
    req.token = jwt.sign({id:req.user._id}, secret.jwtSecret);
    next();
}

function sendtToken(req, res){
    if(req.user){
        res.json({
            user: req.user,
            token: req.token
        })
    }else{
        res.status(422).json({
            error: 'No se pudo crear el usuario'
        })
    }
}

module.exports = {
    generateToken,
    sendtToken, authenticate
}