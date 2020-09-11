const express = require('express');
const path = require('path');

const server = express();

server.set('view engine', 'ejs');

var listaNumerica = [1, 2, 3, 4, 5];

server.get('/', (request, response) => {
    response.render('teste', { listaNumerica });
});

// server.get('/', (request, response) => {
//     response.write('<h1>Hello, World!</h1>');

//     response.end();
// });

// server.get('/index', (request, response) => {
//     response.sendFile(path.resolve('src', 'web_pages', 'index.html'));
// });

const PORT = 3000;
const HOST = '0.0.0.0';

server.listen(PORT, HOST, () => {
    console.log(`Listening on ${PORT}`);
});