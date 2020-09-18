const fs = require('fs');
const util = require('util');
const pegarRegistrosDeClientes = require('./pegarRegistrosDeClientes');
const pegarCaminhoCompletoDoArquivoClientesJson = require('../meus_modulos/pegarCaminhoCompletoDoArquivoClientesJson');
const criarArquivoClientesJson = require('./criarArquivoClientesJson');
const criarArquivoEmBranco = require('./criarArquivoClientesJson');



const gravar_arquivo = util.promisify(fs.writeFile);



async function adicionarClienteAoArquivo(novo_registro_de_cliente) {
    const registros_de_clientes = await pegarRegistrosDeClientes();

    registros_de_clientes.push(novo_registro_de_cliente);

    const registros_de_clientes_stringfied = JSON.stringify(registros_de_clientes);

    try {
        await gravar_arquivo(pegarCaminhoCompletoDoArquivoClientesJson(), registros_de_clientes_stringfied);
    } catch (error) {
        if (error.code == 'ENOENT') { // ENOENT == Arquivo ou diretório não encontrado. Com essa função assíncrona o arquivo é criado
            await criarArquivoEmBranco();

            await adicionarClienteAoArquivo(novo_registro_de_cliente);
        }
    }

    return true;
}



module.exports = adicionarClienteAoArquivo;