import React, { useContext, useEffect, useState } from "react";
import { municipioContext } from "../../Contexts/municipioContext";
import { api } from "../../Services/api";
import { codigoUfParaSigla } from "../Utils/listaMunicipios";

const ListaMUNICIPIO = () => {
  const {setMunicipioAtual,
    listaUf, 
    municipios,
    setMunicipios, 
    pegarTodosMunicipios} = useContext(municipioContext)
  const [pesquisaMunicipio, setPesquisaMunicipio] = useState(0)

  useEffect(()=> { 
    pegarTodosMunicipios()
  },[])

  const alterarStatus = async (mun) => {
    try {
      if(mun.status === 1){
        const { data } = await api.put(`/municipio`,{
          codigoMunicipio: mun.codigoMunicipio,
          codigoUF: mun.codigoUF,
          nome: mun.nome,
          status: 2
        });
        const municipiosComSigla = await codigoUfParaSigla(data)
        setMunicipios(municipiosComSigla)
      }
      if(mun.status === 2){
        const { data } = await api.put(`/municipio`,{
          codigoMunicipio: mun.codigoMunicipio,
          codigoUF: mun.codigoUF,
          nome: mun.nome,
          status: 1
        });
        const municipiosComSigla = await codigoUfParaSigla(data)
        setMunicipios(municipiosComSigla)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const filtrarPorNomeCodigoMunicipio = async () => {
    const filtroPesquisa = pesquisaMunicipio.toUpperCase();
    const filtroNumero = isNaN(filtroPesquisa);
    try {
      if (filtroNumero === false) {
        const { data } = await api.get(`/municipio?codigoMunicipio=${filtroPesquisa}`);
        const resultadoFiltro = await codigoUfParaSigla([data])
        setMunicipios(resultadoFiltro);
      } else {
        const { data } = await api.get(`/municipio?nome=${filtroPesquisa}`);
        const resultadoFiltro = await codigoUfParaSigla(data)
        setMunicipios(resultadoFiltro);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const pesquisarPorCodigoUf = async (codigoUF) => {
    const { data } = await api.get(`/municipio?codigoUF=${codigoUF}`);
    const resultadoFiltro = await codigoUfParaSigla(data)
    setMunicipios(resultadoFiltro);
  }

  const pesquisarPorStatus = async (status) => {
    try {
      if (status) {
        const { data } = await api.get(`/municipio?status=${status}`);
        const resultadoFiltro = await codigoUfParaSigla(data)
        setMunicipios(resultadoFiltro);
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="w-full sm:px-6">
      <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
        <div className="sm:flex items-center justify-center">
          <p className="text-center sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
            MUNIC??PIOS CADASTRADOS
          </p>
        </div>
      </div>
      <p className="mt-5 sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
        Listar Por Filtros
      </p>
        <div className="flex gap-10">
          <div className="flex justify-start items-center py-2 relative w-2/6">
            <input
              type="text"
              onChange={(e) => setPesquisaMunicipio(e.target.value)}
              className="text-sm leading-none text-left text-gray-600 px-4 py-3 border rounded border-gray-300  outline-none w-full"
              placeholder="Pesquise por Nome ou C??digo do Munic??pio."
            />
            <button onClick={()=>filtrarPorNomeCodigoMunicipio(pesquisaMunicipio)} className="absolute right-3 z-10 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          <div className="cursor-pointer flex justify-start items-center py-2 relative w-3/5">
            <div className="relative ">
              <select onClick={(e)=>pesquisarPorCodigoUf(e.target.value)} className="block appearance-none w-full bg-transparent border border-gray-200  py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                <option 
                  className="text-gray-600" 
                  value={0}
                >
                  Pesquisar por UF
                </option>
                {listaUf.map((uf)=> (
                  <option key={uf.codigoUF} value={uf.codigoUF}>{uf.nome}</option>
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
      {municipios ? (
        <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
          <table className="w-full whitespace-nowrap">
              <thead>
                  <tr className="h-16 w-full text-sm leading-none text-gray-800">
                      <th className="font-normal text-left pl-4">CODIGO</th>
                      <th className="font-normal text-left pl-12">NOME</th>
                      <th className="font-normal text-left pl-12">UF</th>
                      <th className="font-normal text-left pl-12">STATUS</th>
                      <th className="font-normal text-left pl-20">A????ES</th>
                  </tr>
              </thead>
              <tbody className="w-full">
                {municipios.map((municipio)=>(
                  municipio.status === 1 ?(
                  <tr key={municipio.codigoMunicipio} className=" pr-8 h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100   border-l-8 border-green-500">
                      <td className="pl-4">
                        <p className="font-medium">
                          {municipio.codigoMunicipio}
                        </p>
                      </td>
                      <td className="pl-12">
                        <button title={'Clique para EDITAR'} className="font-medium hover:text-orange-500 cursor-pointer">
                          {municipio.nome}
                        </button>
                      </td>
                      <td className="pl-12">
                          <button
                            title={'Clique para EDITAR'} 
                            className="font-medium hover:text-orange-500 cursor-pointer"
                          >
                            {municipio.sigla}
                          </button>
                      </td>
                      <td className="pl-12">
                          <button 
                          title={'Clique para DESATIVAR'} 
                          className="font-medium hover:text-orange-500 cursor-pointer"
                          onClick={() => alterarStatus(municipio)}
                          >
                            ATIVADO
                          </button>
                      </td>
                      <td className="pl-20 ">
                          <div className="flex items-center gap-2">
                            <button title={'Clique para EDITAR'} onClick={() => setMunicipioAtual(municipio)}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer text-orange-500 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                          </div>
                      </td>                          
                  </tr>
                  ):(
                  <tr key={municipio.codigoMunicipio} className="pl-8 h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100   border-r-8 border-red-500">
                      <td className="pl-4">
                          <p className="font-medium ml-1">
                            {municipio.codigoMunicipio}
                          </p>
                      </td>
                      <td className="pl-12">
                          <button title={'Clique para EDITAR'} className="font-medium hover:text-orange-500 cursor-pointer">
                            {municipio.nome}
                          </button>
                      </td>
                      <td className="pl-12">
                          <button title={'Clique para EDITAR'} className="font-medium hover:text-orange-500 cursor-pointer">
                            {municipio.sigla}
                          </button>
                      </td>
                      <td className="pl-12">
                          <button 
                            onClick={() => alterarStatus(municipio)}
                            title={'Clique para ATIVAR'} 
                            className="font-medium hover:text-orange-500 cursor-pointer"
                          >
                            DESATIVADO
                          </button>
                      </td>
                      <td className="pl-20 ">
                          <div className="flex items-center gap-2">
                            <button title={'Clique para EDITAR'} onClick={() => setMunicipioAtual(municipio)}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer text-orange-500 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                          </div>
                      </td>                          
                  </tr>
                  )
                ))}
              </tbody>
          </table>
        </div>
      )
      : <p>N??o h?? munic??pios cadastrados</p>}
    </div>
  );
}

export default ListaMUNICIPIO;

