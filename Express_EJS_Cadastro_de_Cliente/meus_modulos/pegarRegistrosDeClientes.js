const fs = require('fs');
const util = require('util');
const criarArquivoClientesJson = require('./criarArquivoClientesJson');
const pegarCaminhoCompletoDoArquivoClientesJson = require('../meus_modulos/pegarCaminhoCompletoDoArquivoClientesJson');



const ler_arquivo = util.promisify(fs.readFile);



async function pegarRegistrosDeClientes() {
    try {
        let registros = await ler_arquivo(pegarCaminhoCompletoDoArquivoClientesJson());

        registros = JSON.parse(registros);

        return registros;
    } catch (error) {
        if (error.code == 'ENOENT') { // ENOENT == Arquivo ou diretório não encontrado. Com essa função assíncrona o arquivo é criado
            await criarArquivoClientesJson();

            return pegarRegistrosDeClientes();
        } else {
            console.log(error);
        }
    }
}



module.exports = pegarRegistrosDeClientes;