import React, { useContext, useEffect, useState } from "react";
import { bairroContext } from "../../Contexts/bairroContext";
import { api } from "../../Services/api";
import { codigoMunicipioParaBairro } from "../Utils/listaBairro";

const ListaBAIRRO = () => {
  const {setBairroAtual, 
    bairros, 
    setBairros,
    listaMunicipios,
    pegarTodosBairros } = useContext(bairroContext)
  const [pesquisaBairro, setPesquisaBairro] = useState(0)

  useEffect(()=> { 
    pegarTodosBairros()
  },[])

  const deletarBairro = async (bairro) => {
    try {
      await api.delete(`/bairro/${bairro.id}`);
    } catch (error) {
      console.log(error);
    }
  }

  const alterarStatus = async (bairro) => {
    try {
      if(bairro.status === 1){
        const { data } = await api.put(`/bairro`,{
          codigoMunicipio: bairro.codigoMunicipio,
          codigoBairro: bairro.codigoBairro,
          nome: bairro.nome,
          status: 2
        });
        const bairrosComMunicipio = await codigoMunicipioParaBairro(data)
        setBairros(bairrosComMunicipio)
      }
      if(bairro.status === 2){
        const { data } = await api.put(`/bairro`,{
          codigoMunicipio: bairro.codigoMunicipio,
          codigoBairro: bairro.codigoBairro,
          nome: bairro.nome,
          status: 1
        });
        const bairrosComMunicipio = await codigoMunicipioParaBairro(data)
        setBairros(bairrosComMunicipio)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const filtrarPorMunicipioCodigoBairro = async () => {
    const filtroPesquisa = pesquisaBairro.toUpperCase();
    const filtroNumero = isNaN(filtroPesquisa);
    try {
      if (filtroNumero === false) {
        const { data } = await api.get(`/bairro?codigoBairro=${filtroPesquisa}`);
        const resultadoFiltro = await codigoMunicipioParaBairro([data])
        setBairros(resultadoFiltro);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const pesquisarPorCodigoMunicipio = async (codigoMunicipio) => {
    const { data } = await api.get(`/bairro?codigoMunicipio=${codigoMunicipio}`);
    const resultadoFiltro = await codigoMunicipioParaBairro(data)
    setBairros(resultadoFiltro);
  }

  const pesquisarPorStatus = async (status) => {
    try {
      if (status) {
        const { data } = await api.get(`/bairro?status=${status}`);
        const resultadoFiltro = await codigoMunicipioParaBairro(data)
        setBairros(resultadoFiltro);
      }
    } catch (error) {
      console.log(error);
    }
  };

    return (
      <div className="w-full sm:px-6">
          <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
              <div className="sm:flex items-center justify-center">
                  <p className="text-center sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">BAIRROS CADASTRADOS</p>
              </div>
          </div>
          <p className="mt-5 sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Listar Por Filtros</p>
        <div className="flex gap-10">
          <div className="flex justify-start items-center py-2 relative w-2/6">
            <input
            type="text"
            onChange={(e) => setPesquisaBairro(e.target.value)}
            className="text-sm leading-none text-left text-gray-600 px-4 py-3 border rounded border-gray-300  outline-none w-full"
            placeholder="Pesquise pelo Código do Bairro."
            />
            <button onClick={()=>filtrarPorMunicipioCodigoBairro(pesquisaBairro)} className="absolute right-3 z-10 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          <div className="cursor-pointer flex justify-start items-center py-2 relative w-3/5">
            <div className="relative ">
              <select onClick={(e)=>pesquisarPorCodigoMunicipio(e.target.value)} className="block appearance-none w-full bg-transparent border border-gray-200  py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                <option className="text-gray-600" value={0}>Pesquisar por Municípios</option>
                {listaMunicipios.map((uf)=> (
                  <option key={uf.codigoMunicipio} value={uf.codigoMunicipio}>{uf.nome}</option>
                ))}
              </select>
              <div className="pointer-events-none  absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
          <div className="cursor-pointer flex justify-start items-center py-2 relative w-1/3">
            <div className="relative ">
              <select onClick={(e)=>pesquisarPorStatus(e.target.value)} className="block appearance-none w-full bg-transparent border border-gray-200  py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                <option className="text-gray-600" value={0}>Pesquise por Status</option>
                <option value={1}>ATIVADO</option>
                <option value={2}>DESATIVADO</option>
              </select>
              <div className="pointer-events-none  absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
        </div>
          {bairros ? 
          <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
              <table className="w-full whitespace-nowrap">
                  <thead>
                      <tr className="h-16 w-full text-sm leading-none text-gray-800">
                          <th className="font-normal text-left pl-4">CODIGO</th>
                          <th className="font-normal text-left pl-12">NOME</th>
                          <th className="font-normal text-left pl-12">MUNICIPIO</th>
                          <th className="font-normal text-left pl-12">STATUS</th>
                          <th className="font-normal text-left pl-20">AÇÕES</th>
                      </tr>
                  </thead>
                  <tbody className="w-full">
                    {bairros.map((bairro)=>(
                      bairro.status === 1 ?
                      <tr key={bairro.codigoBairro} className=" pr-8 h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100   border-l-8 border-green-500">
                          <td className="pl-4">
                              <p className="font-medium">{bairro.codigoBairro}</p>
                          </td>
                          <td className="pl-12">
                              <button title={'Clique para EDITAR'} className="font-medium hover:text-orange-500 cursor-pointer">
                                {bairro.nome}
                              </button>
                          </td>
                          <td className="pl-12">
                              <button title={'Clique para EDITAR'} className="font-medium hover:text-orange-500 cursor-pointer">
                                {bairro.municipio}
                              </button>
                          </td>
                          <td className="pl-12">
                              <button 
                              title={'Clique para DESATIVAR'} 
                              className="font-medium hover:text-orange-500 cursor-pointer"
                              onClick={() => alterarStatus(bairro)}
                              >
                                ATIVADO
                              </button>
                          </td>
                          <td className="pl-20 ">
                              <div className="flex items-center gap-2">
                                <button 
                                  title={'Clique para EDITAR'} 
                                  onClick={() => setBairroAtual(bairro)}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer text-orange-500 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </button>
                                <button  
                                onClick={() => deletarBairro(bairro)}
                                title={'Clique para EXCLUIR'}>
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                          </td>                          
                      </tr>
                      :
                      <tr key={bairro.codigoBairro} className="pl-8 h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100   border-r-8 border-red-500">
                          <td className="pl-4">
                              <p className="font-medium">{bairro.codigoBairro}</p>
                          </td>
                          <td className="pl-12">
                              <button title={'Clique para EDITAR'} className="font-medium hover:text-orange-500 cursor-pointer">
                                {bairro.nome}
                              </button>
                          </td>
                          <td className="pl-12">
                              <button title={'Clique para EDITAR'} className="font-medium hover:text-orange-500 cursor-pointer">
                                {bairro.municipio}
                              </button>
                          </td>
                          <td className="pl-12">
                              <button 
                              onClick={() => alterarStatus(bairro)}
                              title={'Clique para ATIVAR'} 
                              className="font-medium hover:text-orange-500 cursor-pointer"
                              >
                                DESATIVADO
                              </button>
                          </td>
                          <td className="pl-20 ">
                              <div className="flex items-center gap-2">
                                <button title='Clique para EDITAR' onClick={() => setBairroAtual(bairro)}>
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer text-orange-500 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </button>
                                <button 
                                  onClick={() => deletarBairro(bairro)}
                                  title='Clique para EXCLUIR'>
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                          </td>                          
                      </tr>
                    ))}
                  </tbody>
              </table>
          </div>
          : <p>Não há Bairros Cadastrados</p>}
      </div>
    );
}

export default ListaBAIRRO;

