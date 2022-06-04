"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MunicipioBe_1 = __importDefault(require("../be/MunicipioBe"));
const MunicipioVo_1 = __importDefault(require("../vo/MunicipioVo"));
const Conexao_1 = __importDefault(require("../../framework/banco/Conexao"));
const AbstractError_1 = __importDefault(require("../../framework/exceptions/AbstractError"));
const NumeroFormatoInvalidoError_1 = __importDefault(require("../../framework/exceptions/NumeroFormatoInvalidoError"));
class MunicipioController {
    async incluirMunicipio(request, response) {
        try {
            let conexao = await Conexao_1.default.abrirConexao();
            let municipioBe = new MunicipioBe_1.default(conexao);
            let municipio = request.body;
            let registros = await municipioBe.incluirMunicipio(municipio);
            await Conexao_1.default.commit();
            return response.status(200).json(registros);
        }
        catch (error) {
            console.error(error);
            await Conexao_1.default.rollback();
            let codigoErro = error instanceof AbstractError_1.default ? error.status : 404;
            return response.status(codigoErro).json(error instanceof AbstractError_1.default ? error : { status: 404, mensagem: "Não foi possível incluir município." });
        }
        finally {
            await Conexao_1.default.fecharConexao();
        }
    }
    async alterarMunicipio(request, response) {
        try {
            let conexao = await Conexao_1.default.abrirConexao();
            let municipioBe = new MunicipioBe_1.default(conexao);
            let municipio = request.body;
            let registros = await municipioBe.alterarMunicipio(municipio);
            await Conexao_1.default.commit();
            return response.status(200).json(registros);
        }
        catch (error) {
            console.error(error);
            await Conexao_1.default.rollback();
            let codigoErro = error instanceof AbstractError_1.default ? error.status : 404;
            return response.status(codigoErro).json(error instanceof AbstractError_1.default ? error : { status: 404, mensagem: "Não foi possível alterar município." });
        }
        finally {
            await Conexao_1.default.fecharConexao();
        }
    }
    async pesquisarMunicipio(request, response) {
        try {
            let conexao = await Conexao_1.default.abrirConexao();
            let municipioBe = new MunicipioBe_1.default(conexao);
            let { codigoMunicipio } = request.query;
            let { codigoUF } = request.query;
            let { status } = request.query;
            let { nome } = request.query;
            let municipioVoFiltroPesquisa = new MunicipioVo_1.default();
            let registros = null;
            if (codigoMunicipio != undefined) {
                if (isNaN(parseInt('' + codigoMunicipio))) {
                    throw new NumeroFormatoInvalidoError_1.default("consultar", "município", "codigoMunicipio", "" + codigoMunicipio, 404);
                }
                municipioVoFiltroPesquisa.codigoMunicipio = parseInt('' + codigoMunicipio);
            }
            if (codigoUF != undefined) {
                if (isNaN(parseInt('' + codigoUF))) {
                    throw new NumeroFormatoInvalidoError_1.default("consultar", "município", "codigoUF", "" + codigoMunicipio, 404);
                }
                municipioVoFiltroPesquisa.codigoUF = parseInt('' + codigoUF);
            }
            if (nome != undefined) {
                municipioVoFiltroPesquisa.nome = "" + nome;
            }
            if (status != undefined) {
                if (isNaN(parseInt('' + status))) {
                    throw new NumeroFormatoInvalidoError_1.default("consultar", "município", "status", "" + status, 404);
                }
                municipioVoFiltroPesquisa.status = parseInt('' + status);
            }
            registros = await municipioBe.pesquisarMunicipio(municipioVoFiltroPesquisa);
            return response.status(200).json(registros);
        }
        catch (error) {
            console.error(error);
            let codigoErro = error instanceof AbstractError_1.default ? error.status : 404;
            return response.status(codigoErro).json(error instanceof AbstractError_1.default ? error : { status: 404, mensagem: "Não foi possível consultar município." });
        }
        finally {
            await Conexao_1.default.fecharConexao();
        }
    }
}
exports.default = MunicipioController;
//# sourceMappingURL=MunicipioController.js.map