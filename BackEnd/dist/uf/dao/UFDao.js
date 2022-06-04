"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractDao_1 = __importDefault(require("../../framework/dao/AbstractDao"));
const AlterarError_1 = __importDefault(require("../../framework/exceptions/AlterarError"));
const ConsultarError_1 = __importDefault(require("../../framework/exceptions/ConsultarError"));
const IncluirError_1 = __importDefault(require("../../framework/exceptions/IncluirError"));
const UFVo_1 = __importDefault(require("../vo/UFVo"));
class UFDao extends AbstractDao_1.default {
    async incluirUF(ufVo) {
        let sequence = await this.gerarSequence('SEQUENCE_UF');
        try {
            ufVo.codigoUF = sequence;
            let sql = 'INSERT INTO TB_UF (CODIGO_UF, SIGLA, NOME, STATUS) VALUES (:codigoUF, :sigla, :nome, :status)';
            let resultado = await this.conexao.execute(sql, [ufVo.codigoUF, ufVo.sigla, ufVo.nome, ufVo.status]);
            console.log('Foram inseridos ' + resultado.rowsAffected + ' registros no banco de dados.');
        }
        catch (error) {
            throw new IncluirError_1.default("uf", "Erro ao inserir no banco de dados", 404, error);
        }
    }
    async alterarUF(ufVo) {
        let resultado = null;
        try {
            const sql = 'UPDATE TB_UF SET SIGLA = :sigla, NOME = :nome, STATUS = :status  WHERE CODIGO_UF = :codigoUF';
            resultado = await this.conexao.execute(sql, [ufVo.sigla, ufVo.nome, ufVo.status, ufVo.codigoUF]);
            console.log('QUANTIDADE DE REGISTROS ALTERADOS: ' + resultado.rowsAffected);
            if (resultado.rowsAffected == 0) {
                throw new AlterarError_1.default("UF", "Não existe UF com o código " + ufVo.codigoUF, 404, null);
            }
        }
        catch (error) {
            if (error instanceof AlterarError_1.default) {
                throw error;
            }
            else {
                throw new AlterarError_1.default("uf", "Erro ao alterar no banco de dados", 404, error);
            }
        }
    }
    async pesquisarUF(ufVoFiltroPesquisa) {
        try {
            let recursos = this.gerarSQLConsultarListar(ufVoFiltroPesquisa);
            let sql = recursos[0]; //sql
            let parametros = recursos[1]; //parametros
            let resultSet = await this.conexao.execute(sql, parametros);
            console.log('QUANTIDADE DE REGISTROS ENCONTRADOS: ' + resultSet.rows.length);
            let retorno = (resultSet.rows.length == 1 ? this.buscarUmRegistro(resultSet) : this.buscarVariosRegistros(resultSet));
            return retorno;
        }
        catch (error) {
            throw new ConsultarError_1.default("uf", "Erro ao pesquisar no banco de dados", 404, error);
        }
    }
    buscarUmRegistro(resultSet) {
        let ufVo = new UFVo_1.default();
        ufVo.codigoUF = resultSet.rows[0][0];
        ufVo.sigla = resultSet.rows[0][1];
        ufVo.nome = resultSet.rows[0][2];
        ufVo.status = resultSet.rows[0][3];
        return ufVo;
    }
    buscarVariosRegistros(resultSet) {
        let listaUFs = [];
        let numeroCampo = 0;
        let numeroLinha = 0;
        let quantidadeResultados = resultSet.rows.length;
        while (numeroLinha < quantidadeResultados) {
            let ufAtual = new UFVo_1.default();
            {
                ufAtual.codigoUF = resultSet.rows[numeroLinha][numeroCampo++],
                    ufAtual.sigla = resultSet.rows[numeroLinha][numeroCampo++],
                    ufAtual.nome = resultSet.rows[numeroLinha][numeroCampo++],
                    ufAtual.status = resultSet.rows[numeroLinha][numeroCampo++];
            }
            ;
            listaUFs.push(ufAtual);
            numeroLinha++;
            numeroCampo = 0;
        }
        return listaUFs;
    }
    gerarSQLConsultarListar(ufVoFiltroPesquisa) {
        let parametros = [];
        let sql = 'SELECT CODIGO_UF, SIGLA, NOME, STATUS FROM TB_UF WHERE 1 = 1 ';
        if (ufVoFiltroPesquisa.codigoUF != 0) {
            sql += ' AND CODIGO_UF = :codigoUF ';
            parametros = [...parametros, ufVoFiltroPesquisa.codigoUF]; //outra forma de adicionar um elemento dentro de um array (não é muito usual, mas é possível)
        }
        if (ufVoFiltroPesquisa.sigla != "") {
            sql += ' AND SIGLA = :sigla ';
            parametros = [...parametros, ufVoFiltroPesquisa.sigla];
        }
        if (ufVoFiltroPesquisa.nome != "") {
            sql += ' AND NOME = :nome ';
            parametros = [...parametros, ufVoFiltroPesquisa.nome];
        }
        if (ufVoFiltroPesquisa.status != 0) {
            sql += ' AND STATUS = :status ';
            parametros = [...parametros, ufVoFiltroPesquisa.status];
        }
        sql += " ORDER BY CODIGO_UF DESC ";
        return [sql, parametros];
    }
}
exports.default = UFDao;
//# sourceMappingURL=UFDao.js.map