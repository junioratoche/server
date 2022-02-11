const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')
const express = require("express");
const conectarDB = require('./config/db');

// Creamos el servidor
const app = express();

// conectamos a la BD
conectarDB();

app.use(express.json());

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use('/api/peliculas', require('./routes/pelicula'));

// Definimos ruta principal
// app.get('/', (req, res)=>res.send('Reto CLM Junior Atoche Bravo'));


app.listen(4000, () => console.log("El servidor está corriendo correctamente"));
