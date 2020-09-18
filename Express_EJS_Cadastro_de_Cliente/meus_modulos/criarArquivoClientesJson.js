const fs = require('fs');
const util = require('util');
const pegarCaminhoCompletoDoArquivoClientesJson = require('../meus_modulos/pegarCaminhoCompletoDoArquivoClientesJson');



/* O método fs.writeFile() substitui o arquivo especificado e seu conteúdi se ele existir.
   Se o  arquivo não existir, um novo arquivo contendo o conteúdo especificado será criado */
const criar_arquivo = util.promisify(fs.writeFile);



async function criarArquivoEmBranco() {
    try {
        await criar_arquivo(pegarCaminhoCompletoDoArquivoClientesJson(), '[]');

        console.log('Arquivo não encontrado. Um novo foi criado.');
    } catch (error) {
        console.log(error);
    }
}



module.exports = criarArquivoEmBranco;