const express = require('express');
const router = express.Router();
const peliculaController = require('../controllers/peliculaController');
const md_paginated = require('../middlewares/paginated');
const Pelicula = require('../models/Pelicula');

router.get('/', md_paginated.paginatedResults(Pelicula),peliculaController.obtenerPeliculas);
router.post('/', peliculaController.consultaActualizaPelicula);


module.exports = router;