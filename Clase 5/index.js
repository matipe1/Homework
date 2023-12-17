const express = require('express');
const app = express();
const librosRoute = require('./routes/libros');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.json());
app.use('/libros', librosRoute);
app.use(errorHandler);


port = 80;
app.listen(port, () => console.log(`Escuchando en el puerto ${port}...`));