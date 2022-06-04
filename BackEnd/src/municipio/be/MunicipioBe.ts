import AbstractBe from "../../framework/be/AbstractBe";
import CampoObrigatorioError from "../../framework/exceptions/CampoObrigatorioError";
import RegistroJaExisteError from "../../framework/exceptions/RegistroJaExisteError";
import MunicipioDao from "../dao/MunicipioDao";
import MunicipioVo from "../vo/MunicipioVo";

class MunicipioBe extends AbstractBe
{
    private municipioDao : MunicipioDao = new MunicipioDao(this.conexao);

    constructor(conexao : any)
    {
        super(conexao);
    }

    public async incluirMunicipio(municipioVo : MunicipioVo)
    {
        this.validarCampos(municipioVo, "incluir município", false);
        await this.verificarSeExisteMunicipio(municipioVo, "incluir", "município");
        await this.municipioDao.incluirMunicipio(municipioVo);
        let registros = await this.municipioDao.pesquisarMunicipio(new MunicipioVo());
        return registros;
    }

    public async alterarMunicipio(municipioVo : MunicipioVo)
    {
        this.validarCampos(municipioVo, "alterar município", true);
        await this.verificarSeExisteMunicipio(municipioVo, "alterar", "município");
        await this.municipioDao.alterarMunicipio(municipioVo);
        let registros = await this.municipioDao.pesquisarMunicipio(new MunicipioVo());
        return registros;
    }

    public async verificarSeExisteMunicipio(municipioVo : MunicipioVo, acao : string, modulo : string)
    {
        let municipioVoFiltroPesquisa = new MunicipioVo();
        municipioVoFiltroPesquisa.nome = municipioVo.nome;
        municipioVoFiltroPesquisa.codigoUF = municipioVo.codigoUF;
        let registros = await this.municipioDao.pesquisarMunicipio(municipioVoFiltroPesquisa);
        if( (registros!= undefined && ((registros.length != undefined && registros.length > 0 && registros[0].codigoMunicipio != municipioVo.codigoMunicipio)  || (registros.codigoMunicipio != undefined && registros.codigoMunicipio > 0 && registros.codigoMunicipio != municipioVo.codigoMunicipio))))
        {
            throw new RegistroJaExisteError(acao, modulo, "o nome " + municipioVo.nome, 404);
        }
    }

    public async pesquisarMunicipio(municipioVoFiltroPesquisa : MunicipioVo)
    {
        let registros = await this.municipioDao.pesquisarMunicipio(municipioVoFiltroPesquisa);
        if(registros.codigoMunicipio != undefined && municipioVoFiltroPesquisa.codigoMunicipio == 0) //REGRA: ADICIONAR EM UMA LISTA SE A PESQUISA NÃO POR PELA PK
        {
            let lista = [];
            lista.push(registros);
            registros = lista;
        }
        return registros;
    }

    private validarCampos(municipioVo : MunicipioVo, acao : string, alteracao : boolean)
    {
        if(municipioVo == null || municipioVo == undefined){throw new CampoObrigatorioError(acao, "o JSON ");}
        if(municipioVo.nome == undefined || municipioVo.nome == null || municipioVo.nome.trim() == ""){throw new CampoObrigatorioError(acao, "nome")}
        if(municipioVo.status == undefined || municipioVo.status == null || municipioVo.status < 1){throw new CampoObrigatorioError(acao, "status")}
        if(municipioVo.codigoUF == undefined || municipioVo.codigoUF == null || municipioVo.codigoUF < 1){throw new CampoObrigatorioError(acao, "codigoUF")}
        if(alteracao && (municipioVo.codigoMunicipio == undefined || municipioVo.codigoMunicipio == null || municipioVo.codigoMunicipio < 1)){throw new CampoObrigatorioError(acao, "codigoMunicipio")}
    }
}

export default MunicipioBe;