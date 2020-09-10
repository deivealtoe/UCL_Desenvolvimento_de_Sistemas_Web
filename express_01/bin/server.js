const express = require('express');

const server = express();

server.get('/', (request, response) => {
    response.send('<h1>Hello, World!</h1>');
});

const PORT = 3000;
const HOST = '0.0.0.0';

server.listen(PORT, HOST, () => {
    console.log(`Escutando na porta ${PORT}`);
})