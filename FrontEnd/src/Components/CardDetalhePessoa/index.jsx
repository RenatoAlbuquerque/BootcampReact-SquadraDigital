import React, { useContext } from 'react';
import '../style.css'
import {pessoaContext} from '../../Contexts/pessoasContext'

const CardDetalhePessoa = () => {
  const {setModalDetalhePessoa} = useContext(pessoaContext);
  const {
    listaEnderecos,
} = useContext(pessoaContext);

  return (
    <div className="backdrop">
      <div className="py-8 w-4/5">
        <div className="lg:flex items-center justify-center w-full">
          <div className="lg:w-4/12 lg:mr-7 lg:mb-0 mb-7 bg-white p-6 shadow rounded">
            <div className="flex items-center border-b border-gray-200 pb-6">
              <div className='pr-10'>
                <p className="text-sm leading-normal text-gray-500">
                  Cod.
                </p>
                <p className="text-xl text-center font-medium leading-5 text-gray-800 pr-3">
                  1
                </p>
              </div>
              <div className="flex items-start justify-between w-full">
                <div className="pl-3 w-full">
                  <p className="text-xl font-medium leading-5 text-gray-800">Renato Albuquerque</p>
                  <p className="text-sm leading-normal pt-2 text-gray-500">Login: Login1 | Senha: senha1 | Idade: 12</p>
                </div>
                <button onClick={() => setModalDetalhePessoa(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
            </div>
            <p className="text-x text-center font-medium leading-5 text-gray-800">ENDEREÇOS CADASTRADOS</p>
            <table className="w-full whitespace-nowrap">
									<tbody className="w-full">
										{/* {listaEnderecos.map((endereco)=>( */}
											<tr className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-300 border-b border-t border-gray-100">
													<td className="pl-4 cursor-pointer gap-2">
															<div className="flex items-center">
																	<div className="pl-4">
																			<p className="text-xs leading-3 text-gray-600 pt-2">Rua</p>
																			<p className="mt-2 font-medium">rua</p>
																	</div>
															</div>
															<div className="flex items-center">
																	<div className="pl-4">
																			<p className="text-xs leading-3 text-gray-600 pt-2">Complemento</p>
																			<p className="mt-2 font-medium">complemento</p>
																	</div>
															</div>
													</td>
													<td className="pl-4 cursor-pointer gap-2">
															<div className="flex items-center">
																	<div className="pl-4">
																			<p className="text-xs leading-3 text-gray-600 pt-2">Número</p>
																			<p className="mt-2 font-medium">numero</p>
																	</div>
															</div>
															<div className="flex items-center">
																	<div className="pl-4">
																			<p className="text-xs leading-3 text-gray-600 pt-2">Bairro</p>
																			<p className="mt-2 font-medium">nome bairro</p>
																	</div>
															</div>
													</td>
													<td className="pl-4 cursor-pointer gap-2">
															<div className="flex items-center">
																	<div className="pl-4">
																			<p className="text-xs leading-3 text-gray-600 pt-2">Cidade</p>
																			<p className="mt-2 font-medium">municipio</p>
																	</div>
															</div>
															<div className="flex items-center">
																	<div className="pl-4">
																			<p className="text-xs leading-3 text-gray-600 pt-2">UF</p>
																			<p className="mt-2 font-medium">nomeuf</p>
																	</div>
															</div>
													</td>
													<td className="flex flex-col cursor-pointer gap-2 mt-3">
															<div className="flex items-center">
																	<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="orange" strokeWidth="2">
																			<path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
																	</svg>
															</div>
                              <div className="flex items-center">
																	<div>
																			<p className="text-xs leading-3 text-gray-600 pt-2">CEP</p>
																			<p className="mt-2 font-medium">54759-080</p>
																	</div>
															</div>
													</td>
											</tr>
										{/* ))} */}
									</tbody>
							</table>



          </div>
        </div>
      </div>
    </div>
  )
}

export default CardDetalhePessoa;