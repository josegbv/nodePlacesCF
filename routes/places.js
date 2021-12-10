const express = require('express');
const Place = require('../models/Place');
const placesControllers = require( '../controllers/placesController');
const { actualizarImagenCloudinary } = require('../models/Uploader');
let router = express.Router();

router.route('/')
  .get(placesControllers.index)
  .post(placesControllers.multerMiddleware(),  placesControllers.create, placesControllers.saveImage)


  router.route('/:id')
  .get(placesControllers.find, placesControllers.show)
  .put(placesControllers.update)
  .delete(placesControllers.find, placesControllers.destroy)


/* app.post('/places', (req, res)=>{
    Places.create({
      title: req.body.title,
      description: req.body.description,
      acceptsCreditCard: req.body.acceptsCreditCard,
      coverImage: req.body.coverImage,
      avatarImage:req.body.avatarImage,
      openHour: req.body.openHour,
      closeHour: req.body.closeHour
    }).then(doc=>{
      res.json(doc)
    }). catch(err=>{
      console.log(err);
      res.json(err)
    }, {new: true})
  }) */
  
  /* app.get('/places', (req, res)=>{
    Places.find({})
    .then(docs=>{
      res.json(docs)
    })
    .catch(err=>{
      console.log(err)
      res.json(err)
    })
  }) */
  
  /* app.get('/places/:id', (req, res)=>{
    Places.findById(req.params.id)
      .then(doc=>{
        res.json(doc)
      })
      .catch(err=>{
        console.log(err)
        res.json(err)
      } )
  }) */
  
  /* app.put('/places/:id', (req, res)=>{
    Places.findByIdAndUpdate({'_id': req.params.id}, {
      title: req.body.title,
      description: req.body.description,
      acceptsCreditCard: req.body.acceptsCreditCard,
      coverImage: req.body.coverImage,
      avatarImage:req.body.avatarImage,
      openHour: req.body.openHour,
      closeHour: req.body.closeHour
    }, {new: true})
    .then(doc=>{
      res.json(doc)
    })
    .catch(err=>{
      console.log(err);
      res.json(err);
    }, {new: true})
  }) */
  
/*   app.delete('/places/:id', (req, res)=>{
    Places.findByIdAndRemove(req.params.id)
    .then(doc=>{
      res.json(doc)
    })
    .catch(err=>{
      console.log(err)
      res.json(err)
    })
  }) */


module.exports = router;