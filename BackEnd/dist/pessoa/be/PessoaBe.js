"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BairroBe_1 = __importDefault(require("../../bairro/be/BairroBe"));
const BairroVo_1 = __importDefault(require("../../bairro/vo/BairroVo"));
const AbstractBe_1 = __importDefault(require("../../framework/be/AbstractBe"));
const CampoObrigatorioError_1 = __importDefault(require("../../framework/exceptions/CampoObrigatorioError"));
const RegistroJaExisteError_1 = __importDefault(require("../../framework/exceptions/RegistroJaExisteError"));
const MunicipioBe_1 = __importDefault(require("../../municipio/be/MunicipioBe"));
const MunicipioVo_1 = __importDefault(require("../../municipio/vo/MunicipioVo"));
const UFBe_1 = __importDefault(require("../../uf/be/UFBe"));
const UFVo_1 = __importDefault(require("../../uf/vo/UFVo"));
const EnderecoDao_1 = __importDefault(require("../dao/EnderecoDao"));
const PessoaDao_1 = __importDefault(require("../dao/PessoaDao"));
const EnderecoVo_1 = __importDefault(require("../vo/EnderecoVo"));
const PessoaVo_1 = __importDefault(require("../vo/PessoaVo"));
class PessoaBe extends AbstractBe_1.default {
    constructor(conexao) {
        super(conexao);
        this.pessoaDao = new PessoaDao_1.default(this.conexao);
        this.enderecoDao = new EnderecoDao_1.default(this.conexao);
    }
    async incluirPessoa(pessoaVo) {
        this.validarCampos(pessoaVo, "incluir pessoa", false);
        await this.verificarSeExistePessoa(pessoaVo, "incluir", "pessoa");
        await this.pessoaDao.incluirPessoa(pessoaVo);
        await this.incluirEnderecos(pessoaVo, "incluir", false);
        let registros = await this.pessoaDao.pesquisarPessoa(new PessoaVo_1.default());
        return registros;
    }
    async incluirEnderecos(pessoaVo, acao, isAlteracao) {
        let posicao = 0;
        while (pessoaVo.enderecos.length > posicao) {
            let enderecoVoAtual = pessoaVo.enderecos[posicao];
            enderecoVoAtual.codigoPessoa = pessoaVo.codigoPessoa;
            await this.incluirEndereco(enderecoVoAtual, acao);
            posicao++;
        }
    }
    async alterarPessoa(pessoaVo) {
        this.validarCampos(pessoaVo, "alterar pessoa", true);
        await this.verificarSeExistePessoa(pessoaVo, "alterar pessoa", "pessoa");
        await this.pessoaDao.alterarPessoa(pessoaVo);
        await this.gerirEnderecos(pessoaVo, "alterar pessoa", true);
        let registros = await this.pessoaDao.pesquisarPessoa(new PessoaVo_1.default());
        return registros;
    }
    async gerirEnderecos(pessoaVo, acao, isAlteracao) {
        let posicao = 0;
        let codigosEnderecosAtuais = [];
        //ENDEREÇOS QUE SERÃO ALTERADOS OU INCLUIDOS
        while (pessoaVo.enderecos.length > posicao) {
            let enderecoVoAtual = pessoaVo.enderecos[posicao];
            if (enderecoVoAtual.codigoEndereco == undefined || enderecoVoAtual.codigoEndereco == 0) {
                enderecoVoAtual.codigoPessoa = pessoaVo.codigoPessoa;
                await this.incluirEndereco(enderecoVoAtual, acao);
                codigosEnderecosAtuais.push(enderecoVoAtual.codigoEndereco);
            }
            else {
                await this.alterarEndereco(enderecoVoAtual);
                codigosEnderecosAtuais.push(enderecoVoAtual.codigoEndereco);
            }
            posicao++;
        }
        //ENDEREÇOS QUE SERÃO EXCLUÍDOS
        let enderecoVoFiltroPesquisa = new EnderecoVo_1.default();
        enderecoVoFiltroPesquisa.codigoPessoa = pessoaVo.codigoPessoa;
        let listaEnderecosOriginal = await this.enderecoDao.pesquisarEndereco(enderecoVoFiltroPesquisa);
        posicao = 0;
        while (listaEnderecosOriginal.length > posicao) {
            let enderecoVoAtual = listaEnderecosOriginal[posicao];
            let posicaoEncontrada = codigosEnderecosAtuais.indexOf(enderecoVoAtual.codigoEndereco);
            if (posicaoEncontrada == -1) {
                await this.excluirEndereco(enderecoVoAtual, acao);
            }
            posicao++;
        }
    }
    async incluirEndereco(enderecoVoAtual, acao) {
        this.validarCamposEndereco(enderecoVoAtual, acao, false);
        await this.enderecoDao.incluirEndereco(enderecoVoAtual);
    }
    async alterarEndereco(enderecoVoAtual) {
        this.validarCamposEndereco(enderecoVoAtual, "alterar", true);
        await this.enderecoDao.alterarEndereco(enderecoVoAtual);
    }
    async excluirEndereco(enderecoVoAtual, acao) {
        if (enderecoVoAtual.codigoEndereco == undefined || enderecoVoAtual.codigoEndereco == null || enderecoVoAtual.codigoEndereco < 1) {
            throw new CampoObrigatorioError_1.default(acao, "codigoEndereco");
        }
        await this.enderecoDao.excluirEndereco(enderecoVoAtual);
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
        else {
            let enderecoVoFiltroPesquisa = new EnderecoVo_1.default();
            enderecoVoFiltroPesquisa.codigoPessoa = pessoaVoFiltroPesquisa.codigoPessoa;
            let listaEnderecos = await this.enderecoDao.pesquisarEndereco(enderecoVoFiltroPesquisa);
            let pessoaVo = registros;
            pessoaVo.enderecos = listaEnderecos;
            let posicao = 0;
            while (pessoaVo.enderecos.length > posicao) {
                let enderecoVo = pessoaVo.enderecos[posicao];
                //
                let bairroVo = new BairroVo_1.default();
                bairroVo.codigoBairro = enderecoVo.codigoBairro;
                let bairroAtual = await new BairroBe_1.default(this.conexao).pesquisarBairro(bairroVo);
                enderecoVo.bairro = bairroAtual;
                //
                let municipioVo = new MunicipioVo_1.default();
                municipioVo.codigoMunicipio = enderecoVo.bairro.codigoMunicipio;
                let municipioAtual = await new MunicipioBe_1.default(this.conexao).pesquisarMunicipio(municipioVo);
                enderecoVo.bairro.municipio = municipioAtual;
                //
                let ufVo = new UFVo_1.default();
                ufVo.codigoUF = enderecoVo.bairro.municipio.codigoUF;
                let ufAtual = await new UFBe_1.default(this.conexao).pesquisarUF(ufVo);
                enderecoVo.bairro.municipio.uf = ufAtual;
                //
                posicao++;
            }
            registros = pessoaVo;
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
        if (pessoaVo.enderecos == undefined || pessoaVo.enderecos == null || pessoaVo.enderecos.length == 0) {
            throw new CampoObrigatorioError_1.default(acao, "enderecos");
        }
        if (alteracao && (pessoaVo.codigoPessoa == undefined || pessoaVo.codigoPessoa == null || pessoaVo.codigoPessoa < 1)) {
            throw new CampoObrigatorioError_1.default(acao, "codigoPessoa");
        }
    }
    validarCamposEndereco(enderecoVo, acao, alteracao) {
        if (enderecoVo == null || enderecoVo == undefined) {
            throw new CampoObrigatorioError_1.default(acao, "endereço no JSON ");
        }
        if (enderecoVo.codigoPessoa == undefined || enderecoVo.codigoPessoa == null || enderecoVo.codigoPessoa < 1) {
            throw new CampoObrigatorioError_1.default(acao, "codigoPessoa");
        }
        if (enderecoVo.codigoBairro == undefined || enderecoVo.codigoBairro == null || enderecoVo.codigoBairro < 1) {
            throw new CampoObrigatorioError_1.default(acao, "codigoBairro");
        }
        if (enderecoVo.nomeRua == undefined || enderecoVo.nomeRua == null || enderecoVo.nomeRua.trim() == "") {
            throw new CampoObrigatorioError_1.default(acao, "nomeRua");
        }
        if (enderecoVo.numero == undefined || enderecoVo.numero == null) {
            throw new CampoObrigatorioError_1.default(acao, "numero");
        }
        if (enderecoVo.complemento == undefined || enderecoVo.complemento == null || enderecoVo.complemento.trim() == "") {
            throw new CampoObrigatorioError_1.default(acao, "complemento");
        }
        if (enderecoVo.cep == undefined || enderecoVo.cep == null || enderecoVo.cep.trim() == "") {
            throw new CampoObrigatorioError_1.default(acao, "cep");
        }
        if (alteracao && (enderecoVo.codigoEndereco == undefined || enderecoVo.codigoEndereco == null || enderecoVo.codigoEndereco < 1)) {
            throw new CampoObrigatorioError_1.default(acao, "codigoEndereco");
        }
    }
}
exports.default = PessoaBe;
//# sourceMappingURL=PessoaBe.js.map