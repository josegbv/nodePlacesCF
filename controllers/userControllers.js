const User = require('../models/User')


function create(req, res, next){
    
    User.create({
       name: req.body.name,
       email: req.body.email,
       password: req.body.password

      }).then(user=>{ 
          req.user = user;
          next()
          //res.json(user)
      })
      .catch(err=>{
        console.log(err);
        res.status(422).json({
            error:err
        })
      })
}

function get(req, res){
    User.find().then(result=>{
        res.json(result)
    })
}

module.exports = {create, get};