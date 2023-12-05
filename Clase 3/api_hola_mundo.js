const http = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end('Hello World!!');
})

server.listen(port, hostname, () => {
    console.log(`Server Running at "http://${hostname}:${port}/"`);
})