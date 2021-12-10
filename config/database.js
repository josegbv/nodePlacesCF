const mongoose = require('mongoose');


const dbConnection = async()=>{
    try {
        await mongoose.connect('mongodb+srv://jose_br_Media:jose@cluster0.bbyzc.mongodb.net/test')
        console.log('Basa de datos Online')
    } catch (error) {
        console.log(error)
        throw new Error('error al iniciar la base de datos')
    }
}

module.exports = {
    dbConnection
    }
 

