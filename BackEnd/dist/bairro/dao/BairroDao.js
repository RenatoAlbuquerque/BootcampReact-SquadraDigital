"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractDao_1 = __importDefault(require("../../framework/dao/AbstractDao"));
const AlterarError_1 = __importDefault(require("../../framework/exceptions/AlterarError"));
const ConsultarError_1 = __importDefault(require("../../framework/exceptions/ConsultarError"));
const IncluirError_1 = __importDefault(require("../../framework/exceptions/IncluirError"));
const BairroVo_1 = __importDefault(require("../vo/BairroVo"));
class BairroDao extends AbstractDao_1.default {
    async incluirBairro(bairroVo) {
        let sequence = await this.gerarSequence('SEQUENCE_BAIRRO');
        try {
            bairroVo.codigoBairro = sequence;
            let sql = 'INSERT INTO TB_BAIRRO (CODIGO_BAIRRO, CODIGO_MUNICIPIO, NOME, STATUS) VALUES (:codigoBairro, :codigoMunicipio, :nome, :status)';
            let resultado = await this.conexao.execute(sql, [bairroVo.codigoBairro, bairroVo.codigoMunicipio, bairroVo.nome, bairroVo.status]);
            console.log('Foram inseridos ' + resultado.rowsAffected + ' registros no banco de dados.');
        }
        catch (error) {
            throw new IncluirError_1.default("bairro", "Erro ao inserir no banco de dados", 404, error);
        }
    }
    async alterarBairro(bairroVo) {
        let resultado = null;
        try {
            const sql = 'UPDATE TB_BAIRRO SET CODIGO_MUNICIPIO = :codigoMunicipio, NOME = :nome, STATUS = :status  WHERE CODIGO_BAIRRO = :codigoBairro';
            resultado = await this.conexao.execute(sql, [bairroVo.codigoMunicipio, bairroVo.nome, bairroVo.status, bairroVo.codigoBairro]);
            console.log('QUANTIDADE DE REGISTROS ALTERADOS: ' + resultado.rowsAffected);
            if (resultado.rowsAffected == 0) {
                throw new AlterarError_1.default("bairro", "Não existe bairro com o código " + bairroVo.codigoBairro, 404, null);
            }
        }
        catch (error) {
            if (error instanceof AlterarError_1.default) {
                throw error;
            }
            else {
                throw new AlterarError_1.default("bairro", "Erro ao alterar no banco de dados", 404, error);
            }
        }
    }
    async pesquisarBairro(bairroVoFiltroPesquisa) {
        try {
            let recursos = this.gerarSQLConsultarListar(bairroVoFiltroPesquisa);
            let sql = recursos[0]; //sql
            let parametros = recursos[1]; //parametros
            let resultSet = await this.conexao.execute(sql, parametros);
            console.log('QUANTIDADE DE REGISTROS ENCONTRADOS: ' + resultSet.rows.length);
            let retorno = (resultSet.rows.length == 1 ? this.buscarUmRegistro(resultSet) : this.buscarVariosRegistros(resultSet));
            return retorno;
        }
        catch (error) {
            throw new ConsultarError_1.default("bairro", "Erro ao pesquisar no banco de dados", 404, error);
        }
    }
    buscarUmRegistro(resultSet) {
        let bairroVo = new BairroVo_1.default();
        bairroVo.codigoBairro = resultSet.rows[0][0];
        bairroVo.codigoMunicipio = resultSet.rows[0][1];
        bairroVo.nome = resultSet.rows[0][2];
        bairroVo.status = resultSet.rows[0][3];
        return bairroVo;
    }
    buscarVariosRegistros(resultSet) {
        let listaBairros = [];
        let numeroCampo = 0;
        let numeroLinha = 0;
        let quantidadeResultados = resultSet.rows.length;
        while (numeroLinha < quantidadeResultados) {
            let bairroAtual = new BairroVo_1.default();
            {
                bairroAtual.codigoBairro = resultSet.rows[numeroLinha][numeroCampo++],
                    bairroAtual.codigoMunicipio = resultSet.rows[numeroLinha][numeroCampo++],
                    bairroAtual.nome = resultSet.rows[numeroLinha][numeroCampo++],
                    bairroAtual.status = resultSet.rows[numeroLinha][numeroCampo++];
            }
            ;
            listaBairros.push(bairroAtual);
            numeroLinha++;
            numeroCampo = 0;
        }
        return listaBairros;
    }
    gerarSQLConsultarListar(bairroVoFiltroPesquisa) {
        let parametros = [];
        let sql = 'SELECT CODIGO_BAIRRO, CODIGO_MUNICIPIO, NOME, STATUS FROM TB_BAIRRO WHERE 1 = 1 ';
        if (bairroVoFiltroPesquisa.codigoBairro != 0) {
            sql += ' AND CODIGO_BAIRRO = :codigoBairro ';
            parametros = [...parametros, bairroVoFiltroPesquisa.codigoBairro]; //outra forma de adicionar um elemento dentro de um array (não é muito usual, mas é possível)
        }
        if (bairroVoFiltroPesquisa.codigoMunicipio != 0) {
            sql += ' AND CODIGO_MUNICIPIO = :codigoMunicipio ';
            parametros = [...parametros, bairroVoFiltroPesquisa.codigoMunicipio];
        }
        if (bairroVoFiltroPesquisa.nome != "") {
            sql += ' AND NOME = :nome ';
            parametros = [...parametros, bairroVoFiltroPesquisa.nome];
        }
        if (bairroVoFiltroPesquisa.status != 0) {
            sql += ' AND STATUS = :status ';
            parametros = [...parametros, bairroVoFiltroPesquisa.status];
        }
        sql += " ORDER BY CODIGO_MUNICIPIO DESC, CODIGO_BAIRRO DESC ";
        return [sql, parametros];
    }
}
exports.default = BairroDao;
//# sourceMappingURL=BairroDao.js.map