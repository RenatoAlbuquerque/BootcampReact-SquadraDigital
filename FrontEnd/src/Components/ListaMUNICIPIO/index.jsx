import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMunicipios } from "../../Redux/apiActions";
import { api } from "../../Services/api";

const ListaMUNICIPIO = () => {
  //renderizando 4x =====> OBSERVAR ERRO
  const listMUN = useSelector((state)=>state.municipios[0])
  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(getAllMunicipios())
  },[])

  const deleteMun = async (mun) => {
    try {
      await api.delete(`/municipio/${mun.id}`);
      dispatch(getAllMunicipios())
    } catch (error) {
      console.log(error);
    }
  }

  const updateStatus = async (mun) => {
    try {
      if(mun.status === 1){
        await api.put(`/municipio/${mun.id}`,{
          nome: mun.nome,
          idUF: mun.idUF,
          status: 2
        });
      }
      if(mun.status === 2){
        await api.put(`/municipio/${mun.id}`,{
          nome: mun.nome,
          idUF: mun.idUF,
          status: 1
        });
      }
      dispatch(getAllMunicipios())
    } catch (error) {
      console.log(error);
    }
  }

    return (
            <div className="w-full sm:px-6">
                <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
                    <div className="sm:flex items-center justify-center">
                        <p className="text-center sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">MUNICÍPIOS CADASTRADOS</p>
                    </div>
                </div>
                {listMUN ? 
                <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
                    <table className="w-full whitespace-nowrap">
                        <thead>
                            <tr className="h-16 w-full text-sm leading-none text-gray-800">
                                <th className="font-normal text-left pl-4">CODIGO</th>
                                <th className="font-normal text-left pl-12">NOME</th>
                                <th className="font-normal text-left pl-12">UF</th>
                                <th className="font-normal text-left pl-12">STATUS</th>
                                <th className="font-normal text-left pl-20">AÇÕES</th>
                            </tr>
                        </thead>
                        <tbody className="w-full">
                          {listMUN.map((obj)=>(
                            obj.status === 1 ?
                            <tr key={obj.id} className=" pr-8 h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100   border-l-8 border-green-500">
                                <td className="pl-4">
                                    <p className="font-medium">{obj.id}</p>
                                </td>
                                <td className="pl-12">
                                    <button title={'Clique para EDITAR'} className="font-medium hover:text-orange-500 cursor-pointer">{obj.nome}</button>
                                </td>
                                <td className="pl-12">
                                    <button title={'Clique para EDITAR'} className="font-medium hover:text-orange-500 cursor-pointer">{obj.idUF}</button>
                                </td>
                                <td className="pl-12">
                                    <button 
                                    title={'Clique para DESATIVAR'} 
                                    className="font-medium hover:text-orange-500 cursor-pointer"
                                    onClick={() => updateStatus(obj)}
                                    >
                                      ATIVADO
                                    </button>
                                </td>
                                <td className="pl-20 ">
                                    <div className="flex items-center gap-2">
                                      <button title={'Clique para EDITAR'}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer text-orange-500 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                      </button>
                                      <button  
                                      onClick={() => deleteMun(obj)}
                                      title={'Clique para EXCLUIR'}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                      </button>
                                    </div>
                                </td>                          
                            </tr>
                            :
                            <tr key={obj.id} className="pl-8 h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100   border-r-8 border-red-500">
                                <td className="pl-4">
                                    <p className="font-medium ml-1">{obj.id}</p>
                                </td>
                                <td className="pl-12">
                                    <button title={'Clique para EDITAR'} className="font-medium hover:text-orange-500 cursor-pointer">{obj.nome}</button>
                                </td>
                                <td className="pl-12">
                                    <button title={'Clique para EDITAR'} className="font-medium hover:text-orange-500 cursor-pointer">{obj.idUF}</button>
                                </td>
                                <td className="pl-12">
                                    <button 
                                    onClick={() => updateStatus(obj)}
                                    title={'Clique para ATIVAR'} 
                                    className="font-medium hover:text-orange-500 cursor-pointer"
                                    >
                                      DESATIVADO
                                    </button>
                                </td>
                                <td className="pl-20 ">
                                    <div className="flex items-center gap-2">
                                      <button title={'Clique para EDITAR'}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer text-orange-500 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                      </button>
                                      <button 
                                        onClick={() => deleteMun(obj)}
                                        title={'Clique para EXCLUIR'}>
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
                : 'não tem nada'}
            </div>
    );
}

export default ListaMUNICIPIO;

