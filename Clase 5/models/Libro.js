const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/libros');

const libroSchema = new mongoose.Schema({
    name: {type: String, required: true, message: 'El nombre del libro es obligatorio'},
    author: {type: String, required: true, message: 'El nombre del autor es obligatorio'},
    url: {type: String, required: false},
}, { collection: 'libros' });

const Libro = mongoose.model('Libro', libroSchema);

module.exports = Libro;