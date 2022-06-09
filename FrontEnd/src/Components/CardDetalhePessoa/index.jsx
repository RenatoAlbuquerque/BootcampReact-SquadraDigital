import React, { useContext, useEffect, useState } from 'react';
import '../style.css'
import {pessoaContext} from '../../Contexts/pessoasContext'
import { api } from '../../Services/api';

const CardDetalhePessoa = ({infoModalPessoa}) => {
  const {setModalDetalhePessoa} = useContext(pessoaContext);
  const [infoPessoaModal,setInfoPessoaModal]= useState({});

useEffect(()=> (
	listarUmaPessoa
),[])


const listarUmaPessoa = async () => {
	try {
		const { data } = await api.get(`/pessoa?codigoPessoa=${infoModalPessoa.codigoPessoa}`);
		setInfoPessoaModal(data)
	} catch (error) {
		console.log(error);
	}
};

  return (
    <div className="backdrop">
      <div className="py-8 w-full">
        <div className="lg:flex items-center justify-center w-full">
          <div className=" mb-7 bg-white p-6 shadow rounded">
            <div className="flex items-center border-b border-gray-200 pb-6">
              <div className='pr-10'>
                <p className="text-sm leading-normal text-gray-500">
                  Cod.
                </p>
                <p className="text-xl text-center font-medium leading-5 text-gray-800 pr-3">
									{infoPessoaModal.codigoPessoa}
                </p>
              </div>
              <div className="flex items-start justify-between w-full">
                <div className="pl-3 w-full">
                  <p className="text-xl font-medium leading-5 text-gray-800">
										{infoPessoaModal.nome} {infoPessoaModal.sobrenome} - <span>{infoPessoaModal.status === 1 ? 'ATIVADO' : 'DESATIVADO'}</span>
									</p>
                  <p className="text-sm leading-normal pt-2 text-gray-500">Login: {infoPessoaModal.login} | Senha: {infoPessoaModal.senha} | Idade: {infoPessoaModal.idade}</p>
                </div>
                <button onClick={() => setModalDetalhePessoa(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
            </div>
            <p className="text-x text-center font-medium leading-5 text-gray-800">ENDEREÇOS CADASTRADOS</p>
							{infoPessoaModal.enderecos ? (
								<table className="w-full whitespace-nowrap">
									{infoPessoaModal.enderecos.map((endereco) => (
										<tbody className="w-full" key={`${endereco.numero}${endereco.cep}`}>
											<tr className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-300 border-b border-t border-gray-100">
													<td className="pl-4 cursor-pointer gap-2">
															<div className="flex items-center">
																	<div className="pl-4">
																			<p className="text-xs leading-3 text-gray-600 pt-2">Rua</p>
																			<p className="mt-2 font-medium">{endereco.nomeRua}</p>
																	</div>
															</div>
															<div className="flex items-center">
																	<div className="pl-4">
																			<p className="text-xs leading-3 text-gray-600 pt-2">Complemento</p>
																			<p className="mt-2 font-medium">{endereco.complemento}</p>
																	</div>
															</div>
													</td>
													<td className="pl-4 cursor-pointer gap-2">
															<div className="flex items-center">
																	<div className="pl-4">
																			<p className="text-xs leading-3 text-gray-600 pt-2">Número</p>
																			<p className="mt-2 font-medium">{endereco.numero}</p>
																	</div>
															</div>
															<div className="flex items-center">
																	<div className="pl-4">
																			<p className="text-xs leading-3 text-gray-600 pt-2">Bairro</p>
																			<p className="mt-2 font-medium">{endereco.bairro.nome}</p>
																	</div>
															</div>
													</td>
													<td className="pl-4 cursor-pointer gap-2">
															<div className="flex items-center">
																	<div className="pl-4">
																			<p className="text-xs leading-3 text-gray-600 pt-2">Cidade</p>
																			<p className="mt-2 font-medium">{endereco.bairro.municipio.nome}</p>
																	</div>
															</div>
															<div className="flex items-center">
																	<div className="pl-4">
																			<p className="text-xs leading-3 text-gray-600 pt-2">UF</p>
																			<p className="mt-2 font-medium">{endereco.bairro.municipio.uf.nome}</p>
																	</div>
															</div>
													</td>
													<td className="flex flex-col cursor-pointer gap-2 mt-3">
															<div className="flex items-center">
																	<div>
																			<p className="text-xs leading-3 text-gray-600 pt-2">CEP</p>
																			<p className="mt-2 font-medium">{endereco.cep}</p>
																	</div>
															</div>
													</td>
											</tr>
										</tbody>
									))}
								</table>
								): <p>NÃO HÁ ENDEREÇOS CADASTRADOS</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardDetalhePessoa;