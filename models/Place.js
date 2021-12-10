const moongose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate')
const uploader = require('../models/Uploader')
const slugify = require('../plugins/slugify')

let placeSchema = new moongose.Schema({
    title:{
        type: String,
        required: [true, 'El titulo es obligatorio']
    },
    description: String,
    acceptsCreditCard:{
        type: Boolean,
        default: false 
    },
    avatarImage: String,
    coverImage: String,
   
    openHour: Number,
    closeHour: Number,
    slug: {
        type: String,
        unique: true
    },
    address:String
});

placeSchema.methods.updateImage = function(path, imageType){
    return uploader(path)
    .then(secure_url=>this.saveImagerUrl(secure_url.secure_url, imageType));
}

placeSchema.methods.saveImagerUrl = function(secureUrl, imageType){
    this[imageType +'Image'] = secureUrl;
    return this.save();
}

placeSchema.pre('save', function(next){
    this.slug = slugify(this.title)
    next();
})



placeSchema.plugin(mongoosePaginate);

let Place = moongose.model('Places', placeSchema);

module.exports = Place;