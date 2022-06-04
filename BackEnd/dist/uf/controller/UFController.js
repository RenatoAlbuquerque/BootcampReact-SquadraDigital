"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UFBe_1 = __importDefault(require("../be/UFBe"));
const UFVo_1 = __importDefault(require("../vo/UFVo"));
const Conexao_1 = __importDefault(require("../../framework/banco/Conexao"));
const AbstractError_1 = __importDefault(require("../../framework/exceptions/AbstractError"));
const NumeroFormatoInvalidoError_1 = __importDefault(require("../../framework/exceptions/NumeroFormatoInvalidoError"));
class UFController {
    async incluirUF(request, response) {
        try {
            let conexao = await Conexao_1.default.abrirConexao();
            let ufBe = new UFBe_1.default(conexao);
            let uf = request.body;
            let registros = await ufBe.incluirUF(uf);
            await Conexao_1.default.commit();
            return response.status(200).json(registros);
        }
        catch (error) {
            console.error(error);
            await Conexao_1.default.rollback();
            let codigoErro = error instanceof AbstractError_1.default ? error.status : 404;
            return response.status(codigoErro).json(error instanceof AbstractError_1.default ? error : { status: 404, mensagem: "Não foi possível incluir UF." });
        }
        finally {
            await Conexao_1.default.fecharConexao();
        }
    }
    async alterarUF(request, response) {
        try {
            let conexao = await Conexao_1.default.abrirConexao();
            let ufBe = new UFBe_1.default(conexao);
            let uf = request.body;
            let registros = await ufBe.alterarUF(uf);
            await Conexao_1.default.commit();
            return response.status(200).json(registros);
        }
        catch (error) {
            console.error(error);
            await Conexao_1.default.rollback();
            let codigoErro = error instanceof AbstractError_1.default ? error.status : 404;
            return response.status(codigoErro).json(error instanceof AbstractError_1.default ? error : { status: 404, mensagem: "Não foi possível alterar UF." });
        }
        finally {
            await Conexao_1.default.fecharConexao();
        }
    }
    async pesquisarUF(request, response) {
        try {
            let conexao = await Conexao_1.default.abrirConexao();
            let ufBe = new UFBe_1.default(conexao);
            let { codigoUF } = request.query;
            let { sigla } = request.query;
            let { status } = request.query;
            let { nome } = request.query;
            let ufVoFiltroPesquisa = new UFVo_1.default();
            let registros = null;
            if (codigoUF != undefined) {
                if (isNaN(parseInt('' + codigoUF))) {
                    throw new NumeroFormatoInvalidoError_1.default("consultar", "UF", "codigoUF", "" + codigoUF, 404);
                }
                ufVoFiltroPesquisa.codigoUF = parseInt('' + codigoUF);
            }
            if (sigla != undefined) {
                ufVoFiltroPesquisa.sigla = "" + sigla;
            }
            if (nome != undefined) {
                ufVoFiltroPesquisa.nome = "" + nome;
            }
            if (status != undefined) {
                if (isNaN(parseInt('' + status))) {
                    throw new NumeroFormatoInvalidoError_1.default("consultar", "UF", "status", "" + status, 404);
                }
                ufVoFiltroPesquisa.status = parseInt('' + status);
            }
            registros = await ufBe.pesquisarUF(ufVoFiltroPesquisa);
            return response.status(200).json(registros);
        }
        catch (error) {
            console.error(error);
            let codigoErro = error instanceof AbstractError_1.default ? error.status : 404;
            return response.status(codigoErro).json(error instanceof AbstractError_1.default ? error : { status: 404, mensagem: "Não foi possível consultar UF." });
        }
        finally {
            await Conexao_1.default.fecharConexao();
        }
    }
}
exports.default = UFController;
//# sourceMappingURL=UFController.js.map