const express = require('express');
const route = express.Router();
const Libro = require('../models/Libro');

route.get('/', async (req, res, next) => {
    try {
        const libros = await Libro.find();
        if (libros.length === 0) {
            return res.status(404).json({ message: "No hay libros en la base de datos" });
        }
        res.json(libros);
        
    } catch (err) {
        next(err);
    }
});

route.get('/:id', async (req, res, next) => {
    try {
        const libro = await Libro.findById(req.params.id);
        res.json(libro);

    } catch (err) {
        err.status = 404;
        err.message = `No se ha encontrado el libro con el id ${req.params.id}`;
        next(err);
    }
});

route.post('/', async (req, res) => {
    try {
        const { name, author, url } = req.body;
        if (!name || !author) {
            return res.status(400).json({ message: "Se requiere que ingrese el nombre y el autor del libro" });
        }
        const nuevoLibro = new Libro({ name, author, url });
        nuevoLibro.save();
        res.status(201).json({ message: "Se ha cargado el libro correctamente" });

    } catch (err) {
        err.message = "No se ha podido cargar el libro";
        next(err);
    }
});

route.put('/:id', async (req, res, next) => {
    try {
        const libro = await Libro.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!libro) {
            return res.status(404).json({ error: `No se ha encontrado el libro con el id ${req.params.id}` })
        }
        res.status(201).json({ message: "Se ha actualizado el libro correctamente" });

    } catch (err) {
        err.message = "No se ha podido actualizar el libro";
        next(err);
    }
});

route.delete('/:id', async (req, res, next) => {
    try {
        const eliminarLibro = await Libro.findByIdAndDelete(req.params.id);
        if (!eliminarLibro) {
            return res.status(404).json({ error: `No se ha encontrado el libro con el id ${req.params.id}` });
        }
        return res.status(200).json({ message: "Se ha eliminado el libro correctamente" });

    } catch (err) {
        err.message = "No se ha podido eliminar el libro";
        next(err);
    }
});

module.exports = route;