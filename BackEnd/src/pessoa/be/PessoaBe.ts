import AbstractBe from "../../framework/be/AbstractBe";
import CampoObrigatorioError from "../../framework/exceptions/CampoObrigatorioError";
import RegistroJaExisteError from "../../framework/exceptions/RegistroJaExisteError";
import PessoaDao from "../dao/PessoaDao";
import PessoaVo from "../vo/PessoaVo";

class PessoaBe extends AbstractBe
{
    private pessoaDao : PessoaDao = new PessoaDao(this.conexao);

    constructor(conexao : any)
    {
        super(conexao);
    }

    public async incluirPessoa(pessoaVo : PessoaVo)
    {
        this.validarCampos(pessoaVo, "incluir pessoa", false);
        await this.verificarSeExistePessoa(pessoaVo, "incluir", "pessoa");
        await this.pessoaDao.incluirPessoa(pessoaVo);
        let registros = await this.pessoaDao.pesquisarPessoa(new PessoaVo());
        return registros;
    }

    public async alterarPessoa(pessoaVo : PessoaVo)
    {
        this.validarCampos(pessoaVo, "alterar pessoa", true);
        await this.verificarSeExistePessoa(pessoaVo, "alterar", "pessoa");
        await this.pessoaDao.alterarPessoa(pessoaVo);
        let registros = await this.pessoaDao.pesquisarPessoa(new PessoaVo());
        return registros;
    }

    public async verificarSeExistePessoa(pessoaVo : PessoaVo, acao : string, modulo : string)
    {
        let pessoaVoFiltroPesquisa = new PessoaVo();
        pessoaVoFiltroPesquisa.login = pessoaVo.login;
        let registros = await this.pessoaDao.pesquisarPessoa(pessoaVoFiltroPesquisa);
        if( (registros!= undefined && ((registros.length != undefined && registros.length > 0 && registros[0].codigoPessoa != pessoaVo.codigoPessoa)  || (registros.codigoPessoa != undefined && registros.codigoPessoa > 0 && registros.codigoPessoa != pessoaVo.codigoPessoa))))
        {
            throw new RegistroJaExisteError(acao, modulo, "o login " + pessoaVo.login, 404);
        }
    }

    public async pesquisarPessoa(pessoaVoFiltroPesquisa : PessoaVo)
    {
        let registros = await this.pessoaDao.pesquisarPessoa(pessoaVoFiltroPesquisa);
        if(registros.codigoPessoa != undefined && pessoaVoFiltroPesquisa.codigoPessoa == 0) //REGRA: ADICIONAR EM UMA LISTA SE A PESQUISA NÃO POR PELA PK
        {
            let lista = [];
            lista.push(registros);
            registros = lista;
        }
        return registros;
    }

    private validarCampos(pessoaVo : PessoaVo, acao : string, alteracao : boolean)
    {
        if(pessoaVo == null || pessoaVo == undefined){throw new CampoObrigatorioError(acao, "o JSON ");}
        if(pessoaVo.nome == undefined || pessoaVo.nome == null || pessoaVo.nome.trim() == ""){throw new CampoObrigatorioError(acao, "nome");}
        if(pessoaVo.sobrenome == undefined || pessoaVo.sobrenome == null || pessoaVo.sobrenome.trim() == ""){throw new CampoObrigatorioError(acao, "sobrenome");}
        if(pessoaVo.idade == undefined || pessoaVo.idade == null){throw new CampoObrigatorioError(acao, "idade");}
        if(pessoaVo.login == undefined || pessoaVo.login == null || pessoaVo.login.trim() == ""){throw new CampoObrigatorioError(acao, "login");}
        if(pessoaVo.senha == undefined || pessoaVo.senha == null || pessoaVo.senha.trim() == ""){throw new CampoObrigatorioError(acao, "senha");}
        if(pessoaVo.status == undefined || pessoaVo.status == null || pessoaVo.status < 1){throw new CampoObrigatorioError(acao, "status")}
        if(alteracao && (pessoaVo.codigoPessoa == undefined || pessoaVo.codigoPessoa == null || pessoaVo.codigoPessoa < 1)){throw new CampoObrigatorioError(acao, "codigoPessoa")}
    }
}

export default PessoaBe;