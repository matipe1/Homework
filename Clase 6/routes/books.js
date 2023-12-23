const express = require('express');
const route = express.Router();
const Book = require('../models/Book');
const { requiredScopes } = require('express-oauth2-jwt-bearer');


route.get('/', requiredScopes("read:books"), async (req, res, next) => {
    try {
        const books = await Book.find();
        if (books.length === 0) {
            return res.json({ message: "List of books is empty" });
        }
        res.json(books);

    } catch (err) {
        next(err);
    }
});


route.get('/:id', requiredScopes("read:books"), async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);

        res.status(200).json(book);

    } catch (err) {
        err.message = "Book not found";
        err.status = 404;
        next(err);
    }
});


route.post('/', requiredScopes("write:books"), async (req, res, next) => {
    try {
        const { name, author } = req.body;
        
        if (!name || !author) {
            const error = new Error("It's needed to include name and author of the book");
            error.status = 400;
            throw error;
        }

        const newBook = new Book({ name, author });
        await newBook.save();
        res.json({ message: "Book has been created successfully", book: newBook });

    } catch (err) {
        next(err);
    }
});


route.put('/:id', requiredScopes("write:books"), async (req, res, next) => {
    try {
        const  { name, author } = req.body;

        if (!name || !author) {
            const error = new Error("It's needed to include name and author of the book");
            error.status = 400;
            throw error;
        }
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedBook) {
            let error = new Error("Book not found");
            error.status = 404;
            throw error;
        }
        res.json(updatedBook);

    } catch (err) {
        next(err);
    }

});


route.delete('/:id', requiredScopes("write:books"), async (req, res, next) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);

        if (!deletedBook) {
            let error = new Error("Book not found");
            error.status = 404;
            throw error;
        }
        res.json({ message: "The book has been deleted successfully", book: deletedBook });

    } catch (err) {
        next(err);
    }
});

module.exports = route;