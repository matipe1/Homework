// API para la gestion de libros

const express = require('express');
const app = express();
const booksRoute = require('./routes/libros');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.json());
app.use('/libros', booksRoute);
app.use(errorHandler);


const port = 80;
app.listen(port, () => console.log(`Listening in port ${port}...`));