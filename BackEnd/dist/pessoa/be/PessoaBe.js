"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractBe_1 = __importDefault(require("../../framework/be/AbstractBe"));
const CampoObrigatorioError_1 = __importDefault(require("../../framework/exceptions/CampoObrigatorioError"));
const RegistroJaExisteError_1 = __importDefault(require("../../framework/exceptions/RegistroJaExisteError"));
const PessoaDao_1 = __importDefault(require("../dao/PessoaDao"));
const PessoaVo_1 = __importDefault(require("../vo/PessoaVo"));
class PessoaBe extends AbstractBe_1.default {
    constructor(conexao) {
        super(conexao);
        this.pessoaDao = new PessoaDao_1.default(this.conexao);
    }
    async incluirPessoa(pessoaVo) {
        this.validarCampos(pessoaVo, "incluir pessoa", false);
        await this.verificarSeExistePessoa(pessoaVo, "incluir", "pessoa");
        await this.pessoaDao.incluirPessoa(pessoaVo);
        let registros = await this.pessoaDao.pesquisarPessoa(new PessoaVo_1.default());
        return registros;
    }
    async alterarPessoa(pessoaVo) {
        this.validarCampos(pessoaVo, "alterar pessoa", true);
        await this.verificarSeExistePessoa(pessoaVo, "alterar", "pessoa");
        await this.pessoaDao.alterarPessoa(pessoaVo);
        let registros = await this.pessoaDao.pesquisarPessoa(new PessoaVo_1.default());
        return registros;
    }
    async verificarSeExistePessoa(pessoaVo, acao, modulo) {
        let pessoaVoFiltroPesquisa = new PessoaVo_1.default();
        pessoaVoFiltroPesquisa.login = pessoaVo.login;
        let registros = await this.pessoaDao.pesquisarPessoa(pessoaVoFiltroPesquisa);
        if ((registros != undefined && ((registros.length != undefined && registros.length > 0 && registros[0].codigoPessoa != pessoaVo.codigoPessoa) || (registros.codigoPessoa != undefined && registros.codigoPessoa > 0 && registros.codigoPessoa != pessoaVo.codigoPessoa)))) {
            throw new RegistroJaExisteError_1.default(acao, modulo, "o login " + pessoaVo.login, 404);
        }
    }
    async pesquisarPessoa(pessoaVoFiltroPesquisa) {
        let registros = await this.pessoaDao.pesquisarPessoa(pessoaVoFiltroPesquisa);
        if (registros.codigoPessoa != undefined && pessoaVoFiltroPesquisa.codigoPessoa == 0) //REGRA: ADICIONAR EM UMA LISTA SE A PESQUISA NÃO POR PELA PK
         {
            let lista = [];
            lista.push(registros);
            registros = lista;
        }
        return registros;
    }
    validarCampos(pessoaVo, acao, alteracao) {
        if (pessoaVo == null || pessoaVo == undefined) {
            throw new CampoObrigatorioError_1.default(acao, "o JSON ");
        }
        if (pessoaVo.nome == undefined || pessoaVo.nome == null || pessoaVo.nome.trim() == "") {
            throw new CampoObrigatorioError_1.default(acao, "nome");
        }
        if (pessoaVo.sobrenome == undefined || pessoaVo.sobrenome == null || pessoaVo.sobrenome.trim() == "") {
            throw new CampoObrigatorioError_1.default(acao, "sobrenome");
        }
        if (pessoaVo.idade == undefined || pessoaVo.idade == null) {
            throw new CampoObrigatorioError_1.default(acao, "idade");
        }
        if (pessoaVo.login == undefined || pessoaVo.login == null || pessoaVo.login.trim() == "") {
            throw new CampoObrigatorioError_1.default(acao, "login");
        }
        if (pessoaVo.senha == undefined || pessoaVo.senha == null || pessoaVo.senha.trim() == "") {
            throw new CampoObrigatorioError_1.default(acao, "senha");
        }
        if (pessoaVo.status == undefined || pessoaVo.status == null || pessoaVo.status < 1) {
            throw new CampoObrigatorioError_1.default(acao, "status");
        }
        if (alteracao && (pessoaVo.codigoPessoa == undefined || pessoaVo.codigoPessoa == null || pessoaVo.codigoPessoa < 1)) {
            throw new CampoObrigatorioError_1.default(acao, "codigoPessoa");
        }
    }
}
exports.default = PessoaBe;
//# sourceMappingURL=PessoaBe.js.map