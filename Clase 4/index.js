// API para la gestion de libros

const express = require('express');
const app = express();

app.use(express.json());

const data = [
    { id: 1, name: 'Atomic habits', author: 'James Clear', url: 'https://www.google.com.ar/books/edition/Atomic_Habits/fFCjDQAAQBAJ?hl=es-419&gbpv=0' },
    { id: 2, name: 'The power of positive thinking', author: 'Norman Vicent',  url: 'https://www.google.com.ar/books/edition/El_poder_del_pensamiento_positivo/pMaLDwAAQBAJ?hl=es-419&gbpv=0' },
    { id: 3, name: 'The magic of thinking big', author: 'David Schwartz', url: 'https://www.google.com.ar/books/edition/The_Magic_of_Thinking_Big/ytB1CwAAQBAJ?hl=es-419&gbpv=0' }
]


app.get('/libros', (req, res) => {
    res.json(data);
});


app.get('/libros/:id', (req, res) => {
    const book = data.find(b => b.id === parseInt(req.params.id));
    if (!book) {
        return res.status(404).send({ error: 'Book not found' });
    } else {
        res.json(book);
    }
});


app.post('/libros', (req, res) => {
    const { name, author, url } = req.body;
    const newBook = {
        id: data.length + 1,
        name, author, url
    };

    data.push(newBook);
    res.status(201).send('Book added successfully');
});


app.put('/libros/:id', (req, res) => {
    const book = data.find(b => b.id === parseInt(req.params.id));

    if (!book) {
        return res.status(404).send('Book not found');
    } else {
        const { name, author, url } = req.body;
        book.name = name || book.name;
        book.author = author || book.author;
        book.url = url || book.url;
        res.status(201).send('Book updated successfully')
    }
});


app.delete('/libros/:id', (req, res) => {
    const indexBook = data.findIndex(b => b.id === parseInt(req.params.id));
    
    if (indexBook === -1) {
        res.status(404).send('Book not found');
    } else {
        const deletedBook = data.splice(indexBook, 1);
        res.json(deletedBook);
    }

});


const port = 80;
app.listen(port, () => console.log(`Listening in port ${port}...`));