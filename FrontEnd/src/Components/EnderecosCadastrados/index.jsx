import React,{useContext, useState} from "react";
import { pessoaContext } from "../../Contexts/pessoasContext";
import CardDetalheEndereco from '../CardDetalheEndereco'

const EnderecosCadastrados = () => {
	const {
			modalDetalheEndereco, 
			setModalDetalheEndereco,
			listaEnderecos,
			setListaEnderecos
	} = useContext(pessoaContext);
	const [infoModalEndereco, setInfoModalEndereco] = useState({})

	const removerEndereco = (enderecoAtual) => {
		const novaLista = listaEnderecos.filter((endereco) => endereco !== enderecoAtual)
		setListaEnderecos(novaLista)
	}

	const abrirModalDetalheEndereco = (endereco) => {
		setModalDetalheEndereco(true)
		setInfoModalEndereco(endereco)
	}
	
	return (
		<>
			<div className="w-full sm:px-6">
					<div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
							<div className="sm:flex items-center justify-center">
									<p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">ENDEREÇOS A SEREM CADASTRADOS</p>
							</div>
					</div>
					<div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
						{listaEnderecos ? (
							<table className="w-full whitespace-nowrap">
									<tbody className="w-full">
										{listaEnderecos.map((endereco)=>(
											<tr key={endereco.index} className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-300 border-b border-t border-gray-100">
													<td className="pl-4 cursor-pointer gap-2">
															<div className="flex items-center">
																	<div className="pl-4">
																			<p className="text-xs leading-3 text-gray-600 pt-2">Rua</p>
																			<p className="mt-2 font-medium">{endereco.rua}</p>
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
																			<p className="mt-2 font-medium">{endereco.nomeBairro}</p>
																	</div>
															</div>
													</td>
													<td className="pl-4 cursor-pointer gap-2">
															<div className="flex items-center">
																	<div className="pl-4">
																			<p className="text-xs leading-3 text-gray-600 pt-2">Cidade</p>
																			<p className="mt-2 font-medium">{endereco.municipio}</p>
																	</div>
															</div>
															<div className="flex items-center">
																	<div className="pl-4">
																			<p className="text-xs leading-3 text-gray-600 pt-2">UF</p>
																			<p className="mt-2 font-medium">{endereco.nomeUf}</p>
																	</div>
															</div>
													</td>
													<td className="p-4 flex flex-col cursor-pointer gap-5">
															<div className="flex items-center">
																	<button onClick={() => abrirModalDetalheEndereco(endereco)}>
																			<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="green" strokeWidth="2">
																					<path strokeLinecap="round" strokeLinejoin="round" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" />
																			</svg>
																	</button>
															</div>
															<div className="flex items-center">
																	<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="orange" strokeWidth="2">
																			<path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
																	</svg>
															</div>
															<div className="flex items-center">
																<button onClick={() => removerEndereco(endereco)}>
																	<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="red" strokeWidth="2">
																			<path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
			{modalDetalheEndereco === true ? <CardDetalheEndereco endereco={infoModalEndereco} /> : null}
		</>
	);
}

export default EnderecosCadastrados;
