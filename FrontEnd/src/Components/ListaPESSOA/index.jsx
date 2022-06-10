import React, { useContext, useEffect, useState } from "react";
import { pessoaContext } from "../../Contexts/pessoasContext";
import CardDetalhePessoa from "../CardDetalhePessoa";
import { useNavigate } from "react-router-dom";
import { api } from "../../Services/api";


const ListaPESSOA = () => {
  const {listarTodasPessoas,
    listaPessoas,
    setListaPessoas, 
    modalDetalhePessoa, 
    setModalDetalhePessoa,
    setPessoaEditar} = useContext(pessoaContext)
  const [infoModalPessoa, setInfoModalPessoa] = useState({})
  const navigate = useNavigate()
  const [pesquisaCodigoPessoaLogin, setPesquisaCodigoPessoaLogin] = useState([])

  useEffect(()=>{
    listarTodasPessoas()
  },[])

  const editarPessoaEndereco = (pessoa) => {
    setPessoaEditar(pessoa)
    navigate('/pessoa')
  }

  const abrirModalDetalhe = (pessoaInfo) => {
    setModalDetalhePessoa(true)
    setInfoModalPessoa(pessoaInfo)
  }

  const pesquisarPorStatus = async (status) => {
    try {
      if (status) {
        const { data } = await api.get(`/pessoa?status=${status}`);
        setListaPessoas(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filtrarPorCodigoPessoaLogin = async () => {
    const filtroPesquisa = pesquisaCodigoPessoaLogin
    const filtroNumero = isNaN(filtroPesquisa);
    try {
      if (filtroNumero === false) {
        const { data } = await api.get(`/pessoa?codigoPessoa=${parseInt(filtroPesquisa)}`);
        setListaPessoas([data]);
      }else{
        const { data } = await api.get(`/pessoa?login=${filtroPesquisa}`);
        setListaPessoas(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="w-full sm:px-6 flex justify-center my-10">
        <div className="w-4/5">
          <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
              <div className="sm:flex items-center justify-center text-center">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">LISTA DE PESSOAS</p>
              </div>
          </div>
          <p className="mt-5 sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
        Listar Por Filtros
      </p>
        <div className="flex gap-10">
          <div className="flex justify-start items-center py-2 relative w-2/6">
            <input
              type="text"
              onChange={(e) => setPesquisaCodigoPessoaLogin(e.target.value)}
              className="text-sm leading-none text-left text-gray-600 px-4 py-3 border rounded border-gray-300  outline-none w-full"
              placeholder="Pesquise por Código da Pessoa ou Login."
            />
            <button onClick={()=>filtrarPorCodigoPessoaLogin(pesquisaCodigoPessoaLogin)} className="absolute right-3 z-10 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
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
          <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
            {listaPessoas ? (
              <table className="w-full whitespace-nowrap">
                <tbody className="w-full">
                  {listaPessoas.map((pessoa)=>(
                    <tr key={pessoa.codigoPessoa} className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-300 border-b border-t border-gray-100">
                      <td className="pl-4 cursor-pointer gap-2">
                        <div className="flex items-center">
                          <div className="pl-4">
                            <p className="text-xs leading-3 text-gray-600 pt-2">Nome</p>
                            <p className="mt-2 font-medium">{pessoa.nome}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="pl-4">
                              <p className="text-xs leading-3 text-gray-600 pt-2">Sobrenome</p>
                              <p className="mt-2 font-medium">{pessoa.sobrenome}</p>
                          </div>
                        </div>
                      </td>
                      <td className="pl-4 cursor-pointer gap-2">
                        <div className="flex items-center">
                            <div className="pl-4">
                                <p className="text-xs leading-3 text-gray-600 pt-2">idade</p>
                                <p className="mt-2 font-medium">{pessoa.idade}</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="pl-4">
                                <p className="text-xs leading-3 text-gray-600 pt-2">status</p>
                                <p className="mt-2 font-medium">{pessoa.status === 1 ? "ATIVADO" : "DESATIVADO"}</p>
                            </div>
                        </div>
                      </td>
                      <td className="pl-4 cursor-pointer gap-2">
                          <div className="flex items-center">
                              <div className="pl-4">
                                  <p className="text-xs leading-3 text-gray-600 pt-2">login</p>
                                  <p className="mt-2 font-medium">{pessoa.login}</p>
                              </div>
                          </div>
                          <div className="flex items-center">
                              <div className="pl-4">
                                  <p className="text-xs leading-3 text-gray-600 pt-2">senha</p>
                                  <p className="mt-2 font-medium">{pessoa.senha}</p>
                              </div>
                          </div>
                      </td>
                      <td className="p-4 flex flex-col cursor-pointer gap-5">
                          <div className="flex items-center">
                              <button onClick={() => abrirModalDetalhe(pessoa)}>
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="green" strokeWidth="2">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" />
                                  </svg>
                              </button>
                          </div>
                          <div className="flex items-center">
                              <button onClick={() => editarPessoaEndereco(pessoa)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="orange" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                          </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ): null}
          </div>
        </div>
      </div>
      {modalDetalhePessoa === true ? <CardDetalhePessoa infoModalPessoa={infoModalPessoa} /> : null}
    </>

  )
}

export default ListaPESSOA;

