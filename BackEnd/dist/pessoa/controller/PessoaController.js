"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PessoaVo_1 = __importDefault(require("../vo/PessoaVo"));
const Conexao_1 = __importDefault(require("../../framework/banco/Conexao"));
const AbstractError_1 = __importDefault(require("../../framework/exceptions/AbstractError"));
const NumeroFormatoInvalidoError_1 = __importDefault(require("../../framework/exceptions/NumeroFormatoInvalidoError"));
const PessoaBe_1 = __importDefault(require("../be/PessoaBe"));
class PessoaController {
    async incluirPessoa(request, response) {
        try {
            let conexao = await Conexao_1.default.abrirConexao();
            let pessoaBe = new PessoaBe_1.default(conexao);
            let pessoaVo = request.body;
            let registros = await pessoaBe.incluirPessoa(pessoaVo);
            await Conexao_1.default.commit();
            return response.status(200).json(registros);
        }
        catch (error) {
            console.error(error);
            await Conexao_1.default.rollback();
            let codigoErro = error instanceof AbstractError_1.default ? error.status : 404;
            return response.status(codigoErro).json(error instanceof AbstractError_1.default ? error : { status: 404, mensagem: "Não foi possível incluir pessoa." });
        }
        finally {
            await Conexao_1.default.fecharConexao();
        }
    }
    async alterarPessoa(request, response) {
        try {
            let conexao = await Conexao_1.default.abrirConexao();
            let pessoaBe = new PessoaBe_1.default(conexao);
            let pessoaVo = request.body;
            let registros = await pessoaBe.alterarPessoa(pessoaVo);
            await Conexao_1.default.commit();
            return response.status(200).json(registros);
        }
        catch (error) {
            console.error(error);
            await Conexao_1.default.rollback();
            let codigoErro = error instanceof AbstractError_1.default ? error.status : 404;
            return response.status(codigoErro).json(error instanceof AbstractError_1.default ? error : { status: 404, mensagem: "Não foi possível alterar pessoa." });
        }
        finally {
            await Conexao_1.default.fecharConexao();
        }
    }
    async pesquisarPessoa(request, response) {
        try {
            let conexao = await Conexao_1.default.abrirConexao();
            let pessoaBe = new PessoaBe_1.default(conexao);
            let { codigoPessoa } = request.query;
            let { login } = request.query;
            let { status } = request.query;
            let pessoaVoFiltroPesquisa = new PessoaVo_1.default();
            let registros = null;
            if (codigoPessoa != undefined) {
                if (isNaN(parseInt('' + codigoPessoa))) {
                    throw new NumeroFormatoInvalidoError_1.default("consultar", "pessoa", "codigoPessoa", "" + codigoPessoa, 404);
                }
                pessoaVoFiltroPesquisa.codigoPessoa = parseInt('' + codigoPessoa);
            }
            if (login != undefined) {
                pessoaVoFiltroPesquisa.login = "" + login;
            }
            if (status != undefined) {
                if (isNaN(parseInt('' + status))) {
                    throw new NumeroFormatoInvalidoError_1.default("consultar", "pessoa", "status", "" + status, 404);
                }
                pessoaVoFiltroPesquisa.status = parseInt('' + status);
            }
            registros = await pessoaBe.pesquisarPessoa(pessoaVoFiltroPesquisa);
            return response.status(200).json(registros);
        }
        catch (error) {
            console.error(error);
            let codigoErro = error instanceof AbstractError_1.default ? error.status : 404;
            return response.status(codigoErro).json(error instanceof AbstractError_1.default ? error : { status: 404, mensagem: "Não foi possível consultar pessoa." });
        }
        finally {
            await Conexao_1.default.fecharConexao();
        }
    }
}
exports.default = PessoaController;
//# sourceMappingURL=PessoaController.js.map