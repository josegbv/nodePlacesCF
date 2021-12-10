const Place = require('../models/Place');
const upload = require('../config/upload');
const uploader = require('../models/uploader');

function find(req, res, next){
    Place.findById(req.params.id)
    .then(place =>
        {
            req.place = place
            next()
        })
    .catch(err=>{
        next(err)
        })
}

function index(req,res){
    //muestra todo
   

    Place.paginate({}, {page: req.params.query || 1, limit: 8, sort: {'_id': -1} }).then(docs=>{ 
      res.json(docs)
    })
    .catch(err=>{ 
      console.log(err)
      res.json(err)
    })
}

function show(req, res){
    //muestra solo uno
    res.json(req.place)
}

function create(req, res, next){
    
    Place.create({
        title: req.body.title,
        description: req.body.description,
        acceptsCreditCard: req.body.acceptsCreditCard,
        coverImage: req.body.coverImage,
        avatarImage:req.body.avatarImage,
        openHour: req.body.openHour,
        closeHour: req.body.closeHour
     

      }).then(doc=>{ 
          req.place = doc;
          next();
      })
      .catch(err=>{
        next(err, "hubo un error en la creacion")
      })
}

function update(req, res){
    
    Place.findByIdAndUpdate({'_id': req.params.id}, {
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
}

function destroy(req, res){
   req.place.remove()
    .then(doc=>{
      res.json(doc)
    })
    .catch(err=>{
      console.log(err)
      res.json(err)
    })
}

function multerMiddleware(){
    return upload.fields([
        {name:'avatar', maxCount: 1},
        {name:'cover', maxCount: 1}])
}

  function saveImage(req, res){
   
    if(req.place){
        const files = ['avatar', 'cover'];
        const promises = [];

        files.forEach(imageType=>{
            if(req.files && req.files[imageType]){
               const path = req.files[imageType][0].path;
               promises.push(req.place.updateImage(path, imageType)) ;
           }
        })

        Promise.all(promises).then(result=>{
                console.log(result);
                res.json(req.place);
            })
            .catch(err=>{
                console.log(err);
                res.json(err, 'error en la resolucion de la promesa');
            });
    }else{
        res.status(422).json({
            error: req.error || 'No se pudo guardar el Lugar'
        })
    }
}

module.exports = {
    index: index,
    show: show,
    create: create,
    update: update,
    destroy: destroy,
    find,
    multerMiddleware,
    saveImage
}