"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractBe_1 = __importDefault(require("../../framework/be/AbstractBe"));
const CampoObrigatorioError_1 = __importDefault(require("../../framework/exceptions/CampoObrigatorioError"));
const RegistroJaExisteError_1 = __importDefault(require("../../framework/exceptions/RegistroJaExisteError"));
const BairroDao_1 = __importDefault(require("../dao/BairroDao"));
const BairroVo_1 = __importDefault(require("../vo/BairroVo"));
class BairroBe extends AbstractBe_1.default {
    constructor(conexao) {
        super(conexao);
        this.bairroDao = new BairroDao_1.default(this.conexao);
    }
    async incluirBairro(bairroVo) {
        this.validarCampos(bairroVo, "incluir bairro", false);
        await this.verificarSeExisteBairro(bairroVo, "incluir", "bairro");
        await this.bairroDao.incluirBairro(bairroVo);
        let registros = await this.bairroDao.pesquisarBairro(new BairroVo_1.default());
        return registros;
    }
    async alterarBairro(bairroVo) {
        this.validarCampos(bairroVo, "alterar bairro", true);
        await this.verificarSeExisteBairro(bairroVo, "alterar", "bairro");
        await this.bairroDao.alterarBairro(bairroVo);
        let registros = await this.bairroDao.pesquisarBairro(new BairroVo_1.default());
        return registros;
    }
    async verificarSeExisteBairro(bairroVo, acao, modulo) {
        let bairroVoFiltroPesquisa = new BairroVo_1.default();
        bairroVoFiltroPesquisa.nome = bairroVo.nome;
        bairroVoFiltroPesquisa.codigoMunicipio = bairroVo.codigoMunicipio;
        let registros = await this.bairroDao.pesquisarBairro(bairroVoFiltroPesquisa);
        if ((registros != undefined && ((registros.length != undefined && registros.length > 0 && registros[0].codigoBairro != bairroVo.codigoBairro) || (registros.codigoBairro != undefined && registros.codigoBairro > 0 && registros.codigoBairro != bairroVo.codigoBairro)))) {
            throw new RegistroJaExisteError_1.default(acao, modulo, "o nome " + bairroVo.nome + " para o mesmo município " + bairroVo.codigoMunicipio, 404);
        }
    }
    async pesquisarBairro(bairroVoFiltroPesquisa) {
        let registros = await this.bairroDao.pesquisarBairro(bairroVoFiltroPesquisa);
        if (registros.codigoBairro != undefined && bairroVoFiltroPesquisa.codigoBairro == 0) //REGRA: ADICIONAR EM UMA LISTA SE A PESQUISA NÃO POR PELA PK
         {
            let lista = [];
            lista.push(registros);
            registros = lista;
        }
        return registros;
    }
    validarCampos(bairroVo, acao, alteracao) {
        if (bairroVo == null || bairroVo == undefined) {
            throw new CampoObrigatorioError_1.default(acao, "o JSON ");
        }
        if (bairroVo.nome == undefined || bairroVo.nome == null || bairroVo.nome.trim() == "") {
            throw new CampoObrigatorioError_1.default(acao, "nome");
        }
        if (bairroVo.status == undefined || bairroVo.status == null || bairroVo.status < 1) {
            throw new CampoObrigatorioError_1.default(acao, "status");
        }
        if (bairroVo.codigoMunicipio == undefined || bairroVo.codigoMunicipio == null || bairroVo.codigoMunicipio < 1) {
            throw new CampoObrigatorioError_1.default(acao, "codigoMunicipio");
        }
        if (alteracao && (bairroVo.codigoBairro == undefined || bairroVo.codigoBairro == null || bairroVo.codigoBairro < 1)) {
            throw new CampoObrigatorioError_1.default(acao, "codigoBairro");
        }
    }
}
exports.default = BairroBe;
//# sourceMappingURL=BairroBe.js.map