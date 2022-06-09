import React, { useContext, useEffect, useState } from "react"
import { Field, Form, Formik, ErrorMessage } from "formik";
import { UfContext } from "../../Contexts/ufContext";
import { pessoaContext } from "../../Contexts/pessoasContext";
import { api } from "../../Services/api";
import '../style.css'

const FormEditarEndereco = () => {
  const {listaUfRenderizada, pegarTodasUfs} = useContext(UfContext)
  const {
    setListaEnderecos, 
    pessoaEditar, 
    enderecoEditar,
    setPessoaEditar,
    setEnderecoEditar
   } = useContext(pessoaContext)
    const [municipiosSelect, setMunicipiosSelect] = useState([])
    const [bairrosSelect, setBairrosSelect] = useState([])
    
    useEffect(()=>(
      infoPessoaEditar
    ),[])
      
    const infoPessoaEditar = async () => {
      await pegarTodasUfs()
      try {
        const { data } = await api.get(`/pessoa?codigoPessoa=${pessoaEditar.codigoPessoa}`);
        setPessoaEditar(data)
      } catch (error) {
        console.log(error);
      }
    }
  
    const gerarMunicipios = async (codigoUF) => {
      try {
        const { data } = await api.get(`/municipio?codigoUF=${codigoUF}`);
        setMunicipiosSelect(data)
      } catch (error) {
        console.log(error);
      }
    }
  
    const gerarBairros = async (codigoMunicipio) => {
      try {
        const { data } = await api.get(`/bairro?codigoMunicipio=${codigoMunicipio}`);
        setBairrosSelect(data)
      } catch (error) {
        console.log(error);
      }
    }
  
    const registrarEndereco = (values,  { resetForm }) => {
      const enderecoEditavel = {
        codigoEndereco: enderecoEditar.codigoEndereco,
        codigoPessoa: pessoaEditar.codigoPessoa,
        bairro: enderecoEditar.bairro,
        cep: values.cep,
        codigoBairro: values.codigoBairro,
        complemento: values.complemento,
        nomeRua: values.nomeRua,
        numero: values.numero,
      }
      
      setEnderecoEditar(null)
      setListaEnderecos(listaEnderecos => [...listaEnderecos, enderecoEditavel])
      resetForm({ values: ''})
    };

  return(
      <div className="mt-10 flex flex-col  items-center shadow-2xl px-4 py-4 bg-gray-700">
                <h1 className="font-sans text-2xl font-bold text-white mb-5">
                  EDITAR ENDEREÇO
                </h1>
                <div className="flex">
                  <Formik
                    onSubmit={registrarEndereco}
                    initialValues={{
                      nomeRua: enderecoEditar.nomeRua,
                      numero: enderecoEditar.numero,
                      complemento: enderecoEditar.complemento,
                      cep: enderecoEditar.cep,
                      codigoUF: enderecoEditar.bairro.municipio.uf.codigoUF,
                      codigoMunicipio: enderecoEditar.bairro.municipio.codigoMunicipio,
                      codigoBairro: enderecoEditar.bairro.codigoBairro
                    }}
                  >
                    {({ errors, touched, isValid, handleChange, handleBlur, resetForm }) => (
                      <Form className="flex items-end gap-5">
                        {/* 1ª C0LUNA */}
                        <div >
                          {/* RUA */}
                          <div className="flex flex-col">
                            <div>
                              <p className="text-white font-bold">Rua</p>
                              <Field
                                name="nomeRua"
                                type="text"
                                className=" rounded-lg  appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                              />
                            </div>
                            <span className="spanValidateForm">
                              <ErrorMessage name="nomeRua" />
                            </span>
                          </div>
                          {/* NÚMERO */}
                          <div className="flex flex-col">
                            <div>
                            <p className="text-white font-bold">Número</p>
                              <Field
                                name="numero"
                                type="text"
                                className=" rounded-lg  appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                              />
                            </div>
                              <span className="spanValidateForm">
                                <ErrorMessage name="numero" />
                              </span>
                          </div>
                          {/* COMPLEMENTO */}
                          <div className="flex flex-col">
                            <div>
                            <p className="text-white font-bold">Complemento</p>
                              <Field
                                name="complemento"
                                type="text"
                                className=" rounded-lg  appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                              />
                            </div>
                              <span className="spanValidateForm">
                                <ErrorMessage name="complemento" />
                              </span>
                          </div>
                        </div>
                        {/* 2ª C0LUNA */}
                        <div>
                          <div className="flex flex-col">
                            <div>
                            <p className="text-white font-bold">UF</p>
                            {listaUfRenderizada ?
                            <Field
                              onClick={(e) => gerarMunicipios(parseInt(e.target.value))}
                              component="select"
                              name="codigoUF"
                              className="cursor-pointer rounded-lg border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                            >
                                  <option>SELECIONE</option>
                                {listaUfRenderizada.map((uf)=>(
                                  <option   key={uf.codigoUF} value={uf.codigoUF} >{uf.nome}</option>
                                ))}
                            </Field>
                              : null}
                            </div>
                            <span className="spanValidateForm">
                              <ErrorMessage name="codigoUF" />
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <div>
                            <p className="text-white font-bold">Município</p>
                            <Field
                              onClick={(e) => gerarBairros(e.target.value)}
                              component="select"
                              name="codigoMunicipio"
                              className="cursor-pointer rounded-lg border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                            >
                                <option>SELECIONE</option>
                              {municipiosSelect.map((uf)=>(
                                <option  key={uf.codigoMunicipio} value={parseInt(uf.codigoMunicipio)} >{uf.nome}</option>
                              ))}
                            </Field>
                            </div>
                            <span className="spanValidateForm">
                              <ErrorMessage name="codigoMunicipio" />
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <div>
                            <p className="text-white font-bold">Bairro</p>
                            <Field
                              component="select"
                              name="codigoBairro"
                              className="cursor-pointer rounded-lg border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                            >
                                <option>SELECIONE</option>
                              {bairrosSelect.map((bairro)=>(
                                <option  key={bairro.codigoBairro} value={parseInt(bairro.codigoBairro)} >{bairro.nome}</option>
                              ))}
                            </Field>
                            </div>
                            <span className="spanValidateForm">
                              <ErrorMessage name="codigoBairro" />
                            </span>
                          </div>
                        </div>
                        {/* 3ª C0LUNA */}
                        <div className="flex flex-col">
                          <div className="flex flex-col mb-5">
                            <div>
                            <p className="text-white font-bold">CEP</p>
                              <Field
                                name="cep"
                                type="text"
                                className=" rounded-lg  appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                              />
                            </div>
                              <span className="spanValidateForm">
                                <ErrorMessage name="cep" />
                              </span>
                          </div>
                          <button
                            type="submit"
                            className="font-bold uppercase rounded-lg  appearance-none border  py-2.5 px-4 bg-white text-gray-700  shadow-sm text-base hover:bg-gray-900 hover:text-white">
                            ADICIONAR
                          </button>
                          <span className="spanValidateForm">
                          </span>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
      </div>
  )
}

export default FormEditarEndereco