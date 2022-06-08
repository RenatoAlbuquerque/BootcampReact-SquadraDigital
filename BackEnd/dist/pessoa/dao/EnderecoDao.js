"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractDao_1 = __importDefault(require("../../framework/dao/AbstractDao"));
const AlterarError_1 = __importDefault(require("../../framework/exceptions/AlterarError"));
const ConsultarError_1 = __importDefault(require("../../framework/exceptions/ConsultarError"));
const DeletarError_1 = __importDefault(require("../../framework/exceptions/DeletarError"));
const IncluirError_1 = __importDefault(require("../../framework/exceptions/IncluirError"));
const EnderecoVo_1 = __importDefault(require("../vo/EnderecoVo"));
class EnderecoDao extends AbstractDao_1.default {
    async incluirEndereco(enderecoVo) {
        let sequence = await this.gerarSequence('SEQUENCE_ENDERECO');
        try {
            enderecoVo.codigoEndereco = sequence;
            let sql = 'INSERT INTO TB_ENDERECO (CODIGO_ENDERECO, CODIGO_PESSOA, CODIGO_BAIRRO, NOME_RUA, NUMERO, COMPLEMENTO, CEP)';
            sql += ' VALUES (:codigoEndereco, :codigoPessoa, :codigoBairro, :nomeRua, :numero, :complemento, :cep)';
            let parametros = [enderecoVo.codigoEndereco, enderecoVo.codigoPessoa, enderecoVo.codigoBairro, enderecoVo.nomeRua, enderecoVo.numero, enderecoVo.complemento, enderecoVo.cep];
            let resultado = await this.conexao.execute(sql, parametros);
            console.log('Foram inseridos ' + resultado.rowsAffected + ' registros no banco de dados.');
        }
        catch (error) {
            throw new IncluirError_1.default("endereço", "Erro ao inserir no banco de dados", 404, error);
        }
    }
    async alterarEndereco(enderecoVo) {
        let resultado = null;
        try {
            let sql = 'UPDATE TB_ENDERECO SET CODIGO_PESSOA = :codigoPessoa, CODIGO_BAIRRO = :codigoBairro, NOME_RUA = :nomeRua, ';
            sql += ' NUMERO = :numero, COMPLEMENTO = :complemento, CEP = :cep  WHERE CODIGO_ENDERECO = :codigoEndereco';
            let parametros = [enderecoVo.codigoPessoa, enderecoVo.codigoBairro, enderecoVo.nomeRua, enderecoVo.numero, enderecoVo.complemento, enderecoVo.cep, enderecoVo.codigoEndereco];
            resultado = await this.conexao.execute(sql, parametros);
            console.log('QUANTIDADE DE REGISTROS ALTERADOS (ENDEREÇOS): ' + resultado.rowsAffected);
            if (resultado.rowsAffected == 0) {
                throw new AlterarError_1.default("endereço", "Não existe endereço com o código " + enderecoVo.codigoEndereco, 404, null);
            }
        }
        catch (error) {
            if (error instanceof AlterarError_1.default) {
                throw error;
            }
            else {
                throw new AlterarError_1.default("endereço", "Erro ao alterar no banco de dados", 404, error);
            }
        }
    }
    async excluirEndereco(enderecoVo) {
        try {
            let sql = 'DELETE FROM TB_ENDERECO WHERE CODIGO_ENDERECO = :codigoEndereco ';
            let resultSet = await this.conexao.execute(sql, [enderecoVo.codigoEndereco]);
            console.log('QUANTIDADE DE REGISTROS DELETADOS (ENDEREÇOS): ' + resultSet.rowsAffected);
        }
        catch (error) {
            throw new DeletarError_1.default("endereço", "Erro ao deletar no banco de dados", 404, error);
        }
    }
    async pesquisarEndereco(enderecoVoFiltroPesquisa) {
        try {
            let recursos = this.gerarSQLConsultarListar(enderecoVoFiltroPesquisa);
            let sql = recursos[0]; //sql
            let parametros = recursos[1]; //parametros
            let resultSet = await this.conexao.execute(sql, parametros);
            console.log('QUANTIDADE DE REGISTROS ENCONTRADOS (ENDEREÇOS): ' + resultSet.rows.length);
            let retorno = this.buscarVariosRegistros(resultSet);
            return retorno;
        }
        catch (error) {
            throw new ConsultarError_1.default("endereço", "Erro ao pesquisar no banco de dados", 404, error);
        }
    }
    buscarVariosRegistros(resultSet) {
        let listaEnderecos = [];
        let numeroCampo = 0;
        let numeroLinha = 0;
        let quantidadeResultados = resultSet.rows.length;
        while (numeroLinha < quantidadeResultados) {
            let enderecoAtual = new EnderecoVo_1.default();
            {
                enderecoAtual.codigoEndereco = resultSet.rows[numeroLinha][numeroCampo++],
                    enderecoAtual.codigoPessoa = resultSet.rows[numeroLinha][numeroCampo++],
                    enderecoAtual.codigoBairro = resultSet.rows[numeroLinha][numeroCampo++],
                    enderecoAtual.nomeRua = resultSet.rows[numeroLinha][numeroCampo++],
                    enderecoAtual.numero = resultSet.rows[numeroLinha][numeroCampo++],
                    enderecoAtual.complemento = resultSet.rows[numeroLinha][numeroCampo++],
                    enderecoAtual.cep = resultSet.rows[numeroLinha][numeroCampo++];
            }
            ;
            listaEnderecos.push(enderecoAtual);
            numeroLinha++;
            numeroCampo = 0;
        }
        return listaEnderecos;
    }
    gerarSQLConsultarListar(enderecoVoFiltroPesquisa) {
        let parametros = [];
        let sql = 'SELECT CODIGO_ENDERECO, CODIGO_PESSOA, CODIGO_BAIRRO, NOME_RUA, NUMERO, COMPLEMENTO, CEP FROM TB_ENDERECO WHERE 1 = 1 ';
        if (enderecoVoFiltroPesquisa.codigoEndereco != 0) {
            sql += ' AND CODIGO_ENDERECO = :codigoEndereco ';
            parametros = [...parametros, enderecoVoFiltroPesquisa.codigoEndereco]; //outra forma de adicionar um elemento dentro de um array (não é muito usual, mas é possível)
        }
        if (enderecoVoFiltroPesquisa.codigoPessoa != 0) {
            sql += ' AND CODIGO_PESSOA = :codigoPessoa ';
            parametros = [...parametros, enderecoVoFiltroPesquisa.codigoPessoa];
        }
        if (enderecoVoFiltroPesquisa.codigoBairro != 0) {
            sql += ' AND CODIGO_BAIRRO = :codigoBairro ';
            parametros = [...parametros, enderecoVoFiltroPesquisa.codigoBairro];
        }
        sql += " ORDER BY CODIGO_ENDERECO DESC ";
        return [sql, parametros];
    }
}
exports.default = EnderecoDao;
//# sourceMappingURL=EnderecoDao.js.map