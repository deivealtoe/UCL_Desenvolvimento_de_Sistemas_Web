const http = require(`http`);
const fs = require(`fs`);
const path = require(`path`);

/*const server =*/ http.createServer((request, response) => {
    //response.end('<h1>Oi pessoal!</h1>');

    /*if (request.url === `/`) {
        response.end(`<h1>Barra</h1>`)
    }

    if (request.url === `/api`) {
        response.end(`<h1>Barra API</h1>`)
    }*/

    if (request.url != `/favicon.ico`) {
        fs.readdir(request.url, (error, files) => {
            if (error) {
                response.end(`<h1>Deu erro! ${error}</h1>`);
            }

            response.write(`<h1>Caminho atual: ${request.url}</h1>`);

            response.write(`<ul>`);

            // Caso seja a raiz do diretório, não mostra para voltar
            if (request.url != `/`) {
                response.write(`<li><a href="http://127.0.0.1:3000${path.resolve(request.url, `..`)}">..</a></li>`)
            }

            for (let i = 0; i < files.length; i++) {
                if (fs.lstatSync(`${request.url}/${files[i]}`).isDirectory()) {
                    response.write(`<li><a href="http://127.0.0.1:3000${request.url}${files[i]}/">${files[i]}</a></li>`);
                } else {
                    response.write(`<li>${files[i]}</li>`);
                }
            }

            response.write(`</ul>`);

            response.end();
        });
    }

    //response.end(`${request.method} : ${request.url}`);    
}).listen(3000, () => {
    console.log(`Ouvindo na porta 3000`);
});

/*server.listen(3000, () => {
    console.log(`Ouvindo na porta 3000`);
});*/