"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BairroBe_1 = __importDefault(require("../be/BairroBe"));
const BairroVo_1 = __importDefault(require("../vo/BairroVo"));
const Conexao_1 = __importDefault(require("../../framework/banco/Conexao"));
const AbstractError_1 = __importDefault(require("../../framework/exceptions/AbstractError"));
const NumeroFormatoInvalidoError_1 = __importDefault(require("../../framework/exceptions/NumeroFormatoInvalidoError"));
class BairroController {
    async incluirBairro(request, response) {
        try {
            let conexao = await Conexao_1.default.abrirConexao();
            let bairroBe = new BairroBe_1.default(conexao);
            let bairro = request.body;
            let registros = await bairroBe.incluirBairro(bairro);
            await Conexao_1.default.commit();
            return response.status(200).json(registros);
        }
        catch (error) {
            console.error(error);
            await Conexao_1.default.rollback();
            let codigoErro = error instanceof AbstractError_1.default ? error.status : 404;
            return response.status(codigoErro).json(error instanceof AbstractError_1.default ? error : { status: 404, mensagem: "Não foi possível incluir bairro." });
        }
        finally {
            await Conexao_1.default.fecharConexao();
        }
    }
    async alterarBairro(request, response) {
        try {
            let conexao = await Conexao_1.default.abrirConexao();
            let bairroBe = new BairroBe_1.default(conexao);
            let bairro = request.body;
            let registros = await bairroBe.alterarBairro(bairro);
            await Conexao_1.default.commit();
            return response.status(200).json(registros);
        }
        catch (error) {
            console.error(error);
            await Conexao_1.default.rollback();
            let codigoErro = error instanceof AbstractError_1.default ? error.status : 404;
            return response.status(codigoErro).json(error instanceof AbstractError_1.default ? error : { status: 404, mensagem: "Não foi possível alterar bairro." });
        }
        finally {
            await Conexao_1.default.fecharConexao();
        }
    }
    async pesquisarBairro(request, response) {
        try {
            let conexao = await Conexao_1.default.abrirConexao();
            let bairroBe = new BairroBe_1.default(conexao);
            let { codigoBairro } = request.query;
            let { codigoMunicipio } = request.query;
            let { status } = request.query;
            let { nome } = request.query;
            let bairroVoFiltroPesquisa = new BairroVo_1.default();
            let registros = null;
            if (codigoBairro != undefined) {
                if (isNaN(parseInt('' + codigoBairro))) {
                    throw new NumeroFormatoInvalidoError_1.default("consultar", "bairro", "codigoBairro", "" + codigoBairro, 404);
                }
                bairroVoFiltroPesquisa.codigoBairro = parseInt('' + codigoBairro);
            }
            if (codigoMunicipio != undefined) {
                if (isNaN(parseInt('' + codigoMunicipio))) {
                    throw new NumeroFormatoInvalidoError_1.default("consultar", "bairro", "codigoMunicipio", "" + codigoBairro, 404);
                }
                bairroVoFiltroPesquisa.codigoMunicipio = parseInt('' + codigoMunicipio);
            }
            if (nome != undefined) {
                bairroVoFiltroPesquisa.nome = "" + nome;
            }
            if (status != undefined) {
                if (isNaN(parseInt('' + status))) {
                    throw new NumeroFormatoInvalidoError_1.default("consultar", "bairro", "status", "" + status, 404);
                }
                bairroVoFiltroPesquisa.status = parseInt('' + status);
            }
            registros = await bairroBe.pesquisarBairro(bairroVoFiltroPesquisa);
            return response.status(200).json(registros);
        }
        catch (error) {
            console.error(error);
            let codigoErro = error instanceof AbstractError_1.default ? error.status : 404;
            return response.status(codigoErro).json(error instanceof AbstractError_1.default ? error : { status: 404, mensagem: "Não foi possível consultar bairro." });
        }
        finally {
            await Conexao_1.default.fecharConexao();
        }
    }
}
exports.default = BairroController;
//# sourceMappingURL=BairroController.js.map