const mongoose = require('mongoose');
const PeliculaSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    released:{
        type:String,
        required:true
    },
    genre:{
        type:String,
        required:true
    },
    director:{
        type:String,
        required:true
    },
    actors:{
        type:String,
        required:true
    },
    plot:{
        type:String,
        required:true
    },
    ratings: [
        {
            Source: String,
            Value: String
        }
      ],
    fechaCreacion:{
        type:Date,
        default:Date.now()
    }        

});
module.exports = mongoose.model('Pelicula', PeliculaSchema);