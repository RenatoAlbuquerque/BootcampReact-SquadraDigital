"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractDao_1 = __importDefault(require("../../framework/dao/AbstractDao"));
const AlterarError_1 = __importDefault(require("../../framework/exceptions/AlterarError"));
const ConsultarError_1 = __importDefault(require("../../framework/exceptions/ConsultarError"));
const IncluirError_1 = __importDefault(require("../../framework/exceptions/IncluirError"));
const PessoaVo_1 = __importDefault(require("../vo/PessoaVo"));
class PessoaDao extends AbstractDao_1.default {
    async incluirPessoa(pessoaVo) {
        let sequence = await this.gerarSequence('SEQUENCE_PESSOA');
        try {
            pessoaVo.codigoPessoa = sequence;
            let sql = 'INSERT INTO TB_PESSOA (CODIGO_PESSOA, NOME, SOBRENOME, IDADE, LOGIN, SENHA, STATUS) VALUES (:codigoPessoa, :nome, :sobrenome, :idade, :login, :senha, :status)';
            let resultado = await this.conexao.execute(sql, [pessoaVo.codigoPessoa, pessoaVo.nome, pessoaVo.sobrenome, pessoaVo.idade, pessoaVo.login, pessoaVo.senha, pessoaVo.status]);
            console.log('Foram inseridos ' + resultado.rowsAffected + ' registros no banco de dados.');
        }
        catch (error) {
            throw new IncluirError_1.default("pessoa", "Erro ao inserir no banco de dados", 404, error);
        }
    }
    async alterarPessoa(pessoaVo) {
        let resultado = null;
        try {
            const sql = 'UPDATE TB_PESSOA SET NOME = :nome, SOBRENOME = :sobrenome, IDADE = :idade, LOGIN = :login, SENHA = :senha, STATUS = :status  WHERE CODIGO_PESSOA = :codigoPessoa';
            resultado = await this.conexao.execute(sql, [pessoaVo.nome, pessoaVo.sobrenome, pessoaVo.idade, pessoaVo.login, pessoaVo.senha, pessoaVo.status, pessoaVo.codigoPessoa]);
            console.log('QUANTIDADE DE REGISTROS ALTERADOS: ' + resultado.rowsAffected);
            if (resultado.rowsAffected == 0) {
                throw new AlterarError_1.default("pessoa", "Não existe pessoa com o código " + pessoaVo.codigoPessoa, 404, null);
            }
        }
        catch (error) {
            if (error instanceof AlterarError_1.default) {
                throw error;
            }
            else {
                throw new AlterarError_1.default("pessoa", "Erro ao alterar no banco de dados", 404, error);
            }
        }
    }
    async pesquisarPessoa(pessoaVoFiltroPesquisa) {
        try {
            let recursos = this.gerarSQLConsultarListar(pessoaVoFiltroPesquisa);
            let sql = recursos[0]; //sql
            let parametros = recursos[1]; //parametros
            let resultSet = await this.conexao.execute(sql, parametros);
            console.log('QUANTIDADE DE REGISTROS ENCONTRADOS: ' + resultSet.rows.length);
            let retorno = (resultSet.rows.length == 1 ? this.buscarUmRegistro(resultSet) : this.buscarVariosRegistros(resultSet));
            return retorno;
        }
        catch (error) {
            throw new ConsultarError_1.default("pessoa", "Erro ao pesquisar no banco de dados", 404, error);
        }
    }
    buscarUmRegistro(resultSet) {
        let pessoaVo = new PessoaVo_1.default();
        pessoaVo.codigoPessoa = resultSet.rows[0][0];
        pessoaVo.nome = resultSet.rows[0][1];
        pessoaVo.sobrenome = resultSet.rows[0][2];
        pessoaVo.idade = resultSet.rows[0][3];
        pessoaVo.login = resultSet.rows[0][4];
        pessoaVo.senha = resultSet.rows[0][5];
        pessoaVo.status = resultSet.rows[0][6];
        return pessoaVo;
    }
    buscarVariosRegistros(resultSet) {
        let listaPessoas = [];
        let numeroCampo = 0;
        let numeroLinha = 0;
        let quantidadeResultados = resultSet.rows.length;
        while (numeroLinha < quantidadeResultados) {
            let pessoaAtual = new PessoaVo_1.default();
            {
                pessoaAtual.codigoPessoa = resultSet.rows[numeroLinha][numeroCampo++],
                    pessoaAtual.nome = resultSet.rows[numeroLinha][numeroCampo++],
                    pessoaAtual.sobrenome = resultSet.rows[numeroLinha][numeroCampo++],
                    pessoaAtual.idade = resultSet.rows[numeroLinha][numeroCampo++],
                    pessoaAtual.login = resultSet.rows[numeroLinha][numeroCampo++],
                    pessoaAtual.senha = resultSet.rows[numeroLinha][numeroCampo++],
                    pessoaAtual.status = resultSet.rows[numeroLinha][numeroCampo++];
            }
            ;
            listaPessoas.push(pessoaAtual);
            numeroLinha++;
            numeroCampo = 0;
        }
        return listaPessoas;
    }
    gerarSQLConsultarListar(pessoaVoFiltroPesquisa) {
        let parametros = [];
        let sql = 'SELECT CODIGO_PESSOA, NOME, SOBRENOME, IDADE, LOGIN, SENHA, STATUS FROM TB_PESSOA WHERE 1 = 1 ';
        if (pessoaVoFiltroPesquisa.codigoPessoa != 0) {
            sql += ' AND CODIGO_PESSOA = :codigoPessoa ';
            parametros = [...parametros, pessoaVoFiltroPesquisa.codigoPessoa]; //outra forma de adicionar um elemento dentro de um array (não é muito usual, mas é possível)
        }
        if (pessoaVoFiltroPesquisa.login != "") {
            sql += ' AND LOGIN = :login ';
            parametros = [...parametros, pessoaVoFiltroPesquisa.login];
        }
        if (pessoaVoFiltroPesquisa.status != 0) {
            sql += ' AND STATUS = :status ';
            parametros = [...parametros, pessoaVoFiltroPesquisa.status];
        }
        sql += " ORDER BY CODIGO_PESSOA DESC ";
        return [sql, parametros];
    }
}
exports.default = PessoaDao;
//# sourceMappingURL=PessoaDao.js.map