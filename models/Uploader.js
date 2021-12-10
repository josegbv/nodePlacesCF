var cloudinary = require('cloudinary').v2;
const secrets = require('../config/secret');

cloudinary.config(secrets.cloudinary);

module.exports = async function(imagePath){
return {secure_url} = await cloudinary.uploader.upload(imagePath)
}