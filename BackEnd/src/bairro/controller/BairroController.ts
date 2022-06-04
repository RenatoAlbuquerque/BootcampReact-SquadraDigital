import {Request, Response} from 'express';
import BairroBe from '../be/BairroBe';
import BairroVo from '../vo/BairroVo';
import Conexao from "../../framework/banco/Conexao";
import AbstractError from '../../framework/exceptions/AbstractError';
import NumeroFormatoInvalidoError from '../../framework/exceptions/NumeroFormatoInvalidoError';

class BairroController
{

    public async incluirBairro(request: Request, response : Response)
    {
        try
        {
            let conexao = await Conexao.abrirConexao();
            let bairroBe : BairroBe = new BairroBe(conexao);
            let bairro : any = request.body;
            let registros = await bairroBe.incluirBairro(bairro);
            await Conexao.commit();
            return response.status(200).json(registros);
        }
        catch(error)
        {
            console.error(error);
            await Conexao.rollback();
            let codigoErro : number = error instanceof AbstractError ? error.status : 404;
            return response.status(codigoErro).json(error instanceof AbstractError ? error : {status: 404, mensagem : "Não foi possível incluir bairro."});
        }
        finally
        {
            await Conexao.fecharConexao();
        }
    }

    public async alterarBairro(request: Request, response : Response)
    {
        try
        {
            let conexao = await Conexao.abrirConexao();
            let bairroBe : BairroBe = new BairroBe(conexao);
            let bairro : any = request.body;
            let registros = await bairroBe.alterarBairro(bairro);
            await Conexao.commit();
            return response.status(200).json(registros);
        }
        catch(error)
        {
            console.error(error);
            await Conexao.rollback();
            let codigoErro : number = error instanceof AbstractError ? error.status : 404;
            return response.status(codigoErro).json(error instanceof AbstractError ? error : {status: 404, mensagem : "Não foi possível alterar bairro."});
        }
        finally
        {
            await Conexao.fecharConexao();
        }
    }

    public async pesquisarBairro(request: Request, response : Response)
    {
        try
        {
            let conexao = await Conexao.abrirConexao();
            let bairroBe : BairroBe = new BairroBe(conexao);
            let {codigoBairro} = request.query;
            let {codigoMunicipio} = request.query;
            let {status} = request.query;
            let {nome} = request.query;
            let bairroVoFiltroPesquisa : BairroVo = new BairroVo();
            let registros = null;
            if(codigoBairro != undefined)
            {
                if(isNaN(parseInt(''+codigoBairro))) {throw new NumeroFormatoInvalidoError("consultar", "bairro", "codigoBairro", ""+codigoBairro, 404);}
                bairroVoFiltroPesquisa.codigoBairro = parseInt(''+codigoBairro);
            }
            if(codigoMunicipio != undefined)
            {
                if(isNaN(parseInt(''+codigoMunicipio))) {throw new NumeroFormatoInvalidoError("consultar", "bairro", "codigoMunicipio", ""+codigoBairro, 404);}
                bairroVoFiltroPesquisa.codigoMunicipio = parseInt(''+codigoMunicipio);
            }
            if(nome != undefined)
            {
                bairroVoFiltroPesquisa.nome = ""+nome;
            }
            if(status != undefined)
            {
                if(isNaN(parseInt(''+status))) {throw new NumeroFormatoInvalidoError("consultar", "bairro", "status", ""+status, 404);}
                bairroVoFiltroPesquisa.status = parseInt(''+status);
            }
            registros = await bairroBe.pesquisarBairro(bairroVoFiltroPesquisa);
            return response.status(200).json(registros);
        }
        catch(error)
        {
            console.error(error);
            let codigoErro : number = error instanceof AbstractError ? error.status : 404;
            return response.status(codigoErro).json(error instanceof AbstractError ? error : {status: 404, mensagem : "Não foi possível consultar bairro."});
        }
        finally
        {
            await Conexao.fecharConexao();
        }
    }
}



export default BairroController;