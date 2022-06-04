"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractDao_1 = __importDefault(require("../../framework/dao/AbstractDao"));
const AlterarError_1 = __importDefault(require("../../framework/exceptions/AlterarError"));
const ConsultarError_1 = __importDefault(require("../../framework/exceptions/ConsultarError"));
const IncluirError_1 = __importDefault(require("../../framework/exceptions/IncluirError"));
const MunicipioVo_1 = __importDefault(require("../vo/MunicipioVo"));
class MunicipioDao extends AbstractDao_1.default {
    async incluirMunicipio(municipioVo) {
        let sequence = await this.gerarSequence('SEQUENCE_MUNICIPIO');
        try {
            municipioVo.codigoMunicipio = sequence;
            let sql = 'INSERT INTO TB_MUNICIPIO (CODIGO_MUNICIPIO, CODIGO_UF, NOME, STATUS) VALUES (:codigoMunicipio, :codigoUF, :nome, :status)';
            let resultado = await this.conexao.execute(sql, [municipioVo.codigoMunicipio, municipioVo.codigoUF, municipioVo.nome, municipioVo.status]);
            console.log('Foram inseridos ' + resultado.rowsAffected + ' registros no banco de dados.');
        }
        catch (error) {
            throw new IncluirError_1.default("município", "Erro ao inserir no banco de dados", 404, error);
        }
    }
    async alterarMunicipio(municipioVo) {
        let resultado = null;
        try {
            const sql = 'UPDATE TB_MUNICIPIO SET CODIGO_UF = :codigoUF, NOME = :nome, STATUS = :status  WHERE CODIGO_MUNICIPIO = :codigoMunicipio';
            resultado = await this.conexao.execute(sql, [municipioVo.codigoUF, municipioVo.nome, municipioVo.status, municipioVo.codigoMunicipio]);
            console.log('QUANTIDADE DE REGISTROS ALTERADOS: ' + resultado.rowsAffected);
            if (resultado.rowsAffected == 0) {
                throw new AlterarError_1.default("município", "Não existe município com o código " + municipioVo.codigoMunicipio, 404, null);
            }
        }
        catch (error) {
            if (error instanceof AlterarError_1.default) {
                throw error;
            }
            else {
                throw new AlterarError_1.default("município", "Erro ao alterar no banco de dados", 404, error);
            }
        }
    }
    async pesquisarMunicipio(municipioVoFiltroPesquisa) {
        try {
            let recursos = this.gerarSQLConsultarListar(municipioVoFiltroPesquisa);
            let sql = recursos[0]; //sql
            let parametros = recursos[1]; //parametros
            let resultSet = await this.conexao.execute(sql, parametros);
            console.log('QUANTIDADE DE REGISTROS ENCONTRADOS: ' + resultSet.rows.length);
            let retorno = (resultSet.rows.length == 1 ? this.buscarUmRegistro(resultSet) : this.buscarVariosRegistros(resultSet));
            return retorno;
        }
        catch (error) {
            throw new ConsultarError_1.default("município", "Erro ao pesquisar no banco de dados", 404, error);
        }
    }
    buscarUmRegistro(resultSet) {
        let municipioVo = new MunicipioVo_1.default();
        municipioVo.codigoMunicipio = resultSet.rows[0][0];
        municipioVo.codigoUF = resultSet.rows[0][1];
        municipioVo.nome = resultSet.rows[0][2];
        municipioVo.status = resultSet.rows[0][3];
        return municipioVo;
    }
    buscarVariosRegistros(resultSet) {
        let listaMunicipios = [];
        let numeroCampo = 0;
        let numeroLinha = 0;
        let quantidadeResultados = resultSet.rows.length;
        while (numeroLinha < quantidadeResultados) {
            let municipioAtual = new MunicipioVo_1.default();
            {
                municipioAtual.codigoMunicipio = resultSet.rows[numeroLinha][numeroCampo++],
                    municipioAtual.codigoUF = resultSet.rows[numeroLinha][numeroCampo++],
                    municipioAtual.nome = resultSet.rows[numeroLinha][numeroCampo++],
                    municipioAtual.status = resultSet.rows[numeroLinha][numeroCampo++];
            }
            ;
            listaMunicipios.push(municipioAtual);
            numeroLinha++;
            numeroCampo = 0;
        }
        return listaMunicipios;
    }
    gerarSQLConsultarListar(municipioVoFiltroPesquisa) {
        let parametros = [];
        let sql = 'SELECT CODIGO_MUNICIPIO, CODIGO_UF, NOME, STATUS FROM TB_MUNICIPIO WHERE 1 = 1 ';
        if (municipioVoFiltroPesquisa.codigoMunicipio != 0) {
            sql += ' AND CODIGO_MUNICIPIO = :codigoMunicipio ';
            parametros = [...parametros, municipioVoFiltroPesquisa.codigoMunicipio]; //outra forma de adicionar um elemento dentro de um array (não é muito usual, mas é possível)
        }
        if (municipioVoFiltroPesquisa.codigoUF != 0) {
            sql += ' AND CODIGO_UF = :codigoUF ';
            parametros = [...parametros, municipioVoFiltroPesquisa.codigoUF];
        }
        if (municipioVoFiltroPesquisa.nome != "") {
            sql += ' AND NOME = :nome ';
            parametros = [...parametros, municipioVoFiltroPesquisa.nome];
        }
        if (municipioVoFiltroPesquisa.status != 0) {
            sql += ' AND STATUS = :status ';
            parametros = [...parametros, municipioVoFiltroPesquisa.status];
        }
        sql += " ORDER BY CODIGO_UF DESC, CODIGO_MUNICIPIO DESC ";
        return [sql, parametros];
    }
}
exports.default = MunicipioDao;
//# sourceMappingURL=MunicipioDao.js.map