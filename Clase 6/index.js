const express = require('express');
const app = express();
const routeBooks = require('./routes/books');
const errorHandler = require('./middlewares/errorHandler');
const { auth } = require('express-oauth2-jwt-bearer');


const jwtCheck = auth({
    audience: 'http://localhost:80/api/books',
    issuerBaseURL: 'https://dev-c4bin7prelxddrh2.us.auth0.com/',
    tokenSigningAlg: 'RS256'
  });


app.use(express.json());

// app.use(jwtCheck);
app.use('/api/books', jwtCheck, routeBooks);

app.use(errorHandler);


const port = 80;
app.listen(80, () => { console.log(`Listening in port ${port}...`) });