const express = require('express');
const route = express.Router();
const data = require('../data');


route.get('/', (req, res, next) => {
    try {
        res.json(data);
    } catch (err) {
        next(err);
    }
});


route.get('/:id', (req, res, next) => {
    try {
        const book = data.find(b => b.id === parseInt(req.params.id));
        if (!book) {
            const error = new Error('Book not found');
            error.status(404);
            throw error;
        }
        res.json(book);

    } catch (err) {
        next(err);
    }
});


route.post('/', (req, res, next) => {
    try {
        const { name, author, url } = req.body;
        const newBook = {
            id: data.length + 1,
            name, author, url
        };

        data.push(newBook);
        res.status(201).send('Book added successfully');
    } catch (err) {
        next(err);
    }
});


route.put('/:id', (req, res, next) => {
    try {
        const book = data.find(b => b.id === parseInt(req.params.id));

        if (!book) {
            const error = new Error('Book not found');
            error.status(404);
            throw error;
        }
        const { name, author, url } = req.body;
        book.name = name || book.name;
        book.author = author || book.author;
        book.url = url || book.url;
        res.status(201).send('Book updated successfully');

    } catch (err) {
        next(err);
    }
});


route.delete('/:id', (req, res, next) => {
    try {
        const indexBook = data.findIndex(b => b.id === parseInt(req.params.id));
    
        if (indexBook === -1) {
            const error = new Error('Book not found');
            error.status(404);
            throw error // Misma accion que el return -> Pero se lo manda como parametro a catch
        }
        const deletedBook = data.splice(indexBook, 1);
        res.json(deletedBook);

    } catch (err) {
        next(err);
    }

});


module.exports = route;