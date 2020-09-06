const http = require(`http`);

// Event emitter
const server = http.createServer((request, response) => {
    console.log(`Recebido um request!`);

    if (request.url === `/`) {
        response.write(`Hello, World!`);

        response.end();
    }

    if (request.url === `/api`) {
        response.write(JSON.stringify([1, 2, 3]));

        response.end();
    }
});

server.listen(3000);

console.log(`Ouvindo na porta 3000`);