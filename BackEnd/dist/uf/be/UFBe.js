"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractBe_1 = __importDefault(require("../../framework/be/AbstractBe"));
const CampoObrigatorioError_1 = __importDefault(require("../../framework/exceptions/CampoObrigatorioError"));
const RegistroJaExisteError_1 = __importDefault(require("../../framework/exceptions/RegistroJaExisteError"));
const UFDao_1 = __importDefault(require("../dao/UFDao"));
const UFVo_1 = __importDefault(require("../vo/UFVo"));
class UFBe extends AbstractBe_1.default {
    constructor(conexao) {
        super(conexao);
        this.ufDao = new UFDao_1.default(this.conexao);
    }
    async incluirUF(ufVo) {
        this.validarCampos(ufVo, "incluir UF", false);
        await this.verificarSeExisteUF(ufVo, "incluir", "UF");
        await this.ufDao.incluirUF(ufVo);
        let registros = await this.ufDao.pesquisarUF(new UFVo_1.default());
        return registros;
    }
    async alterarUF(ufVo) {
        this.validarCampos(ufVo, "alterar UF", true);
        await this.verificarSeExisteUF(ufVo, "alterar", "UF");
        await this.ufDao.alterarUF(ufVo);
        let registros = await this.ufDao.pesquisarUF(new UFVo_1.default());
        return registros;
    }
    async verificarSeExisteUF(ufVo, acao, modulo) {
        let ufVoFiltroPesquisa = new UFVo_1.default();
        ufVoFiltroPesquisa.nome = ufVo.nome;
        let registros = await this.ufDao.pesquisarUF(ufVoFiltroPesquisa);
        if ((registros != undefined && ((registros.length != undefined && registros.length > 0 && registros[0].codigoUF != ufVo.codigoUF) || (registros.codigoUF != undefined && registros.codigoUF > 0 && registros.codigoUF != ufVo.codigoUF)))) {
            throw new RegistroJaExisteError_1.default(acao, modulo, "o nome " + ufVo.nome, 404);
        }
        ufVoFiltroPesquisa = new UFVo_1.default();
        ufVoFiltroPesquisa.sigla = ufVo.sigla;
        registros = await this.ufDao.pesquisarUF(ufVoFiltroPesquisa);
        if ((registros != undefined && ((registros.length != undefined && registros.length > 0 && registros[0].codigoUF != ufVo.codigoUF) || (registros.codigoUF != undefined && registros.codigoUF > 0 && registros.codigoUF != ufVo.codigoUF)))) {
            throw new RegistroJaExisteError_1.default(acao, modulo, "a sigla " + ufVo.sigla, 404);
        }
    }
    async pesquisarUF(ufVoFiltroPesquisa) {
        let registros = await this.ufDao.pesquisarUF(ufVoFiltroPesquisa);
        if (registros.codigoUF != undefined && ufVoFiltroPesquisa.codigoUF == 0 && ufVoFiltroPesquisa.nome == "" && ufVoFiltroPesquisa.sigla == "") //REGRA: ADICIONAR EM UMA LISTA SE A PESQUISA NÃO POR PELA PK
         {
            let lista = [];
            lista.push(registros);
            registros = lista;
        }
        return registros;
    }
    validarCampos(ufVo, acao, alteracao) {
        if (ufVo == null || ufVo == undefined) {
            throw new CampoObrigatorioError_1.default(acao, "o JSON ");
        }
        if (ufVo.sigla == undefined || ufVo.sigla == null || ufVo.sigla.trim() == "") {
            throw new CampoObrigatorioError_1.default(acao, "sigla");
        }
        if (ufVo.nome == undefined || ufVo.nome == null || ufVo.nome.trim() == "") {
            throw new CampoObrigatorioError_1.default(acao, "nome");
        }
        if (ufVo.status == undefined || ufVo.status == null || ufVo.status < 1) {
            throw new CampoObrigatorioError_1.default(acao, "status");
        }
        if (alteracao && (ufVo.codigoUF == undefined || ufVo.codigoUF == null || ufVo.codigoUF < 1)) {
            throw new CampoObrigatorioError_1.default(acao, "codigoUF");
        }
    }
}
exports.default = UFBe;
//# sourceMappingURL=UFBe.js.map