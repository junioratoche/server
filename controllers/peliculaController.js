const Pelicula = require('../models/Pelicula');

exports.consultaActualizaPelicula = async (req, res) => {

    try {

        const req_movie = req.body.movie;
        const req_find = req.body.find;
        const req_replace = req.body.replace;

        const { title, year, released, genre, director, actors, plot, ratings } = req.body;

        let pelicula_exist = await Pelicula.find({ $or: [{ title: title }, { title: req_movie }] });

        if (pelicula_exist.length === 0) {
            //Insertar una nueva pelicula
            let pelicula = new Pelicula(req.body);
            await pelicula.save();
            res.send(pelicula);
        }
        else {
            if (!req_find && !req_replace && !req_movie) {
                res.status(404).json({ msg: 'Pelicula ya registrada' });
            }
            else {
                //Buscar y reemplazar:
                let pelicula_update = await Pelicula.find({ title: req_movie });

                let txt_change = pelicula_update[0].plot.replace(req_find, req_replace);
                pelicula_update[0].plot = txt_change;

                pelicula_update = await Pelicula.findOneAndUpdate({ _id: pelicula_update[0].id }, pelicula_update[0], { new: true });

                res.send(pelicula_update);

            }
        }

        // pelicula = new Pelicula(req.body);
        // await pelicula.save();
        // res.send(pelicula);

    } catch (error) {
        res.status(500).send('Hubo un error');
    }
};

exports.obtenerPeliculas = async (req, res) => {
    try {

        res.json({
            search: res.paginatedResults,
            response: (!res.paginatedResults) ? false : true
        });

    } catch (error) {
        res.status(500).send({ response: false, mensaje: 'Hubo un error al obtener película' });
    }
};

exports.actualizarPelicula = async (req, res) => {
    try {
        const { title, year, released, genre, director, actors, plot, ratings } = req.body;
        let pelicula = await Pelicula.findById(req.params.id);

        if (!pelicula) {
            res.status(404).json({ msg: 'No existe la pelicula' });
        };

        pelicula.title = title;
        pelicula.year = year;
        pelicula.released = released;
        pelicula.genre = genre;
        pelicula.director = director;
        pelicula.actors = actors;
        pelicula.plot = plot;
        pelicula.ratings = ratings;

        pelicula = await Pelicula.findOneAndUpdate({ _id: req.params.id }, pelicula, { new: true });

        res.json(pelicula);

    } catch (error) {
        res.status(500).send('Hubo un error');
    }
};

exports.obtenerPelicula = async (req, res) => {
    try {
        let pelicula = await Pelicula.findById(req.params.id);

        if (!pelicula) {
            res.status(404).json({ msg: 'No existe la pelicula' });
        };

        res.json(pelicula);

    } catch (error) {
        res.status(500).send('Hubo un error');
    }
};

exports.eliminarPelicula = async (req, res) => {
    try {

        let pelicula = await Pelicula.findById(req.params.id);

        if (!pelicula) {
            res.status(404).json({ msg: 'No existe la pelicula' });
        };

        await Pelicula.findOneAndRemove({ _id: req.params.id });

        res.json({ msg: 'Película eliminada con exito' });

    } catch (error) {
        res.status(500).send('Hubo un error');
    }
};