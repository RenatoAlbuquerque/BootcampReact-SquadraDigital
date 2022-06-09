import React, { useContext, useEffect, useState } from "react";
import { pessoaContext } from "../../Contexts/pessoasContext";
import CardDetalhePessoa from "../CardDetalhePessoa";
import { useNavigate } from "react-router-dom";


const ListaPESSOA = () => {
  const {listarTodasPessoas,
    listaPessoas, 
    modalDetalhePessoa, 
    setModalDetalhePessoa,
    setPessoaEditar} = useContext(pessoaContext)
  const [infoModalPessoa, setInfoModalPessoa] = useState({})
  const navigate = useNavigate()

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

  return (
    <>
      <div className="w-full sm:px-6 flex justify-center my-10">
        <div className="w-4/5">
          <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
              <div className="sm:flex items-center justify-center text-center">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">LISTA DE PESSOAS</p>
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

