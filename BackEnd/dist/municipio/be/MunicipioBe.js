"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractBe_1 = __importDefault(require("../../framework/be/AbstractBe"));
const CampoObrigatorioError_1 = __importDefault(require("../../framework/exceptions/CampoObrigatorioError"));
const RegistroJaExisteError_1 = __importDefault(require("../../framework/exceptions/RegistroJaExisteError"));
const MunicipioDao_1 = __importDefault(require("../dao/MunicipioDao"));
const MunicipioVo_1 = __importDefault(require("../vo/MunicipioVo"));
class MunicipioBe extends AbstractBe_1.default {
    constructor(conexao) {
        super(conexao);
        this.municipioDao = new MunicipioDao_1.default(this.conexao);
    }
    async incluirMunicipio(municipioVo) {
        this.validarCampos(municipioVo, "incluir município", false);
        await this.verificarSeExisteMunicipio(municipioVo, "incluir", "município");
        await this.municipioDao.incluirMunicipio(municipioVo);
        let registros = await this.municipioDao.pesquisarMunicipio(new MunicipioVo_1.default());
        return registros;
    }
    async alterarMunicipio(municipioVo) {
        this.validarCampos(municipioVo, "alterar município", true);
        await this.verificarSeExisteMunicipio(municipioVo, "alterar", "município");
        await this.municipioDao.alterarMunicipio(municipioVo);
        let registros = await this.municipioDao.pesquisarMunicipio(new MunicipioVo_1.default());
        return registros;
    }
    async verificarSeExisteMunicipio(municipioVo, acao, modulo) {
        let municipioVoFiltroPesquisa = new MunicipioVo_1.default();
        municipioVoFiltroPesquisa.nome = municipioVo.nome;
        municipioVoFiltroPesquisa.codigoUF = municipioVo.codigoUF;
        let registros = await this.municipioDao.pesquisarMunicipio(municipioVoFiltroPesquisa);
        if ((registros != undefined && ((registros.length != undefined && registros.length > 0 && registros[0].codigoMunicipio != municipioVo.codigoMunicipio) || (registros.codigoMunicipio != undefined && registros.codigoMunicipio > 0 && registros.codigoMunicipio != municipioVo.codigoMunicipio)))) {
            throw new RegistroJaExisteError_1.default(acao, modulo, "o nome " + municipioVo.nome, 404);
        }
    }
    async pesquisarMunicipio(municipioVoFiltroPesquisa) {
        let registros = await this.municipioDao.pesquisarMunicipio(municipioVoFiltroPesquisa);
        if (registros.codigoMunicipio != undefined && municipioVoFiltroPesquisa.codigoMunicipio == 0) //REGRA: ADICIONAR EM UMA LISTA SE A PESQUISA NÃO POR PELA PK
         {
            let lista = [];
            lista.push(registros);
            registros = lista;
        }
        return registros;
    }
    validarCampos(municipioVo, acao, alteracao) {
        if (municipioVo == null || municipioVo == undefined) {
            throw new CampoObrigatorioError_1.default(acao, "o JSON ");
        }
        if (municipioVo.nome == undefined || municipioVo.nome == null || municipioVo.nome.trim() == "") {
            throw new CampoObrigatorioError_1.default(acao, "nome");
        }
        if (municipioVo.status == undefined || municipioVo.status == null || municipioVo.status < 1) {
            throw new CampoObrigatorioError_1.default(acao, "status");
        }
        if (municipioVo.codigoUF == undefined || municipioVo.codigoUF == null || municipioVo.codigoUF < 1) {
            throw new CampoObrigatorioError_1.default(acao, "codigoUF");
        }
        if (alteracao && (municipioVo.codigoMunicipio == undefined || municipioVo.codigoMunicipio == null || municipioVo.codigoMunicipio < 1)) {
            throw new CampoObrigatorioError_1.default(acao, "codigoMunicipio");
        }
    }
}
exports.default = MunicipioBe;
//# sourceMappingURL=MunicipioBe.js.map