const https = require(`https`);
const fs = require(`fs`);
const path = require(`path`);

/* certificado SSL (self signed)
   https://nodejs.org/en/knowledge/HTTP/servers/how-to-create-a-HTTPS-server/ */
const options = {
    /* path.resolve() - começa do ponto onde o "node *.js" é executado
       ex: node /bin/server.js
       a outra opção seria passar o caminho completo */
    key: fs.readFileSync(path.resolve(`https/key.pem`)),
    cert: fs.readFileSync(path.resolve(`https/cert.pem`))
}

function getSlashOrNot(url) {
    return url === `/` ? url : url + `/`;
}

function getFullUrl(url, path) {
    return `https://127.0.0.1:3000` + getSlashOrNot(url) + path;
}

function getPath(url, file) {
    return url + `/` + file;
}

const server = https.createServer(options, (request, response) => {
    /* Duas requisições / - motivo de ter essas duas requisições
       https://stackoverflow.com/questions/10314174/difference-between-pragma-and-cache-control-headers */
    console.log(`{${request.method} - ${request.url}}`);

    if (request.url != `/favicon.ico`) {
        fs.readdir(request.url, (err, files) => {
            if (err) {
                response.write(`<h1>${err}</h1>`);

                response.write(`<li><a href="${path.resolve(getPath(request.url, `..`))}">..</a></li>`);

                response.end();
            } else {
                response.write(`<h1>Caminho atual: ${request.url}</h1>`);
                
                response.write(`<ul>`);

                request.url == `/` ? null : response.write(`<li><a href="${path.resolve(getPath(request.url, `..`))}">..</a></li>`);
                
                for (let i = 0; i < files.length; i++) {
                    if (fs.lstatSync(getPath(request.url, files[i])).isDirectory()) {
                        response.write(`<li><a href="${getFullUrl(request.url, files[i])}">${files[i]}</a></li>`);
                    } else {
                        response.write(`<li>${files[i]}</li>`);
                    }
                }
                
                response.write(`</ul>`);
    
                response.end();
            }
        });
    } else {
        response.end();
    }
});

server.listen(3000, () => {
    console.log(`Ouvindo na porta 3000`);
});