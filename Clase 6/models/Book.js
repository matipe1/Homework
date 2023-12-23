const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/library")
    .then(() => {
        console.log("Successful database connection");
    })
    .catch((error) => {
        console.log("Connection error:", error);
    });

const bookSchema = new mongoose.Schema({
    name: {type: String, require: true, message: "Need to add a name"},
    author: {type: String, require: true, message: "Need to add an author"},
}, { collection: "books" });

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;