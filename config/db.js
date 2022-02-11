const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});
const URI = process.env.DB_MONGO;

const conectarDB = async()=>{
    try {
        mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Base de datos conectada');
        
    } catch (error) {
        console.log(error);
        process.exit(1);
        
    }
}
module.exports = conectarDB