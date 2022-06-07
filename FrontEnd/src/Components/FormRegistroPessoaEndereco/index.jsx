import React, { useContext, useEffect, useState } from "react";
import "../style.css";
import { Field, Form, Formik, ErrorMessage } from "formik";
import schemaPessoa from "./registerFormSchemaPessoa";
import schemaEndereco from "./registerFormSchemaEndereco";
import BtnSalvar from "../BtnSalvar";
import { UfContext } from "../../Contexts/ufContext";
import { api } from "../../Services/api";
import { pessoaContext } from "../../Contexts/pessoasContext";

const FormRegistroPessoaEndereco = () => {
  const {listaUfRenderizada, pegarTodasUfs} = useContext(UfContext)
  const {setListaEnderecos} = useContext(pessoaContext)
  const [municipiosSelect, setMunicipiosSelect] = useState([])
  const [bairrosSelect, setBairrosSelect] = useState([])

  
  useEffect(()=>(
    pegarTodasUfs
  ),[])

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

  const registrarPessoa = async (values, actions) => {
    values.status = parseInt(values.status)
    console.log(values);
  };

  const registrarEndereco = async (values,  { resetForm }) => {
    const [uf] = listaUfRenderizada?.filter((uf) => uf.codigoUF === parseInt(values.codigoUF))
    const [municipio] = municipiosSelect?.filter((municipio) => municipio.codigoMunicipio === parseInt(values.codigoMunicipio))
    const [bairro] = bairrosSelect?.filter((bairro) => bairro.codigoBairro === parseInt(values.codigoBairro))
    const payload = {
      uf: uf.sigla,
      nomeUf: uf.nome,
      municipio: municipio.nome,
      codigoBairro: parseInt(values.codigoBairro),
      nomeBairro: bairro.nome,
      rua: values.rua,
      numero: parseInt(values.numero),
      complemento: values.complemento,
    }
    
    setListaEnderecos(listaEnderecos => [...listaEnderecos, payload])
    resetForm({ values: ''})
  };


  return (
    <div className="mt-4">
      {/* FORM CRIAR PESSOA */}
      <div className="flex flex-col  items-center shadow-2xl px-4 py-4 bg-gray-700">
        <h1 className="font-sans text-4xl font-bold text-white mb-10">
          CRIAR PESSOA
        </h1>
        <div className="flex">
          <Formik
            validationSchema={schemaPessoa}
            onSubmit={registrarPessoa}
            initialValues={{
              nome: "",
              sobrenome: "",
              status: "",
              login: "",
              senha: "",
              idade: "",
            }}
          >
            {({ errors, touched, isValid, handleChange, handleBlur }) => (
              <Form className="flex items-end gap-5">
                <div >
                  <div className="flex flex-col">
                    <div>
                      <p className="text-white font-bold">Nome</p>
                      <Field
                        name="nome"
                        type="text"
                        className=" rounded-lg  appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                      />
                    </div>
                    <span className="spanValidateForm">
                      <ErrorMessage name="nome" />
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <div>
                    <p className="text-white font-bold">Sobrenome</p>
                      <Field
                        name="sobrenome"
                        type="text"
                        className=" rounded-lg  appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                      />
                    </div>
                      <span className="spanValidateForm">
                        <ErrorMessage name="sobrenome" />
                      </span>
                  </div>
                </div>

                <div>     
                  <div className="flex flex-col">
                    <div>
                      <p className="text-white font-bold">Login</p>
                      <Field
                        name="login"
                        type="text"
                        className=" rounded-lg  appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                      />
                    </div>
                    <span className="spanValidateForm">
                      <ErrorMessage name="login" />
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <div>
                    <p className="text-white font-bold">Senha</p>
                      <Field
                        name="senha"
                        type="text"
                        className=" rounded-lg  appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                      />
                    </div>
                      <span className="spanValidateForm">
                        <ErrorMessage name="senha" />
                      </span>
                  </div>
                </div>

                <div>                  
                  <div className="flex flex-col">
                    <div>
                      <p className="text-white font-bold">Idade</p>
                      <Field
                        name="idade"
                        type="number"
                        className=" rounded-lg  appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                      />
                    </div>
                      <span className="spanValidateForm">
                        <ErrorMessage name="idade" />
                      </span>    
                  </div>
                  <div className="flex flex-col">
                    <div>
                      <p className="text-white font-bold">Status</p>
                      <Field
                        component="select"
                        name="status"
                        className="cursor-pointer rounded-lg border border-gray-300 w-full py-2.5 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                      >
                        <option>SELECIONE</option>
                        <option value={1}>ATIVADO</option>
                        <option value={2}>DESATIVADO</option>
                      </Field>
                    </div>
                      <span className="spanValidateForm">
                        <ErrorMessage name="status" />
                      </span>
                  
                  </div>
                </div>

                <div className="flex flex-col">
                  <BtnSalvar type="submit"/>
                  <span className="spanValidateForm">
                  </span>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      {/* FORM CRIAR ENDEREÇO */}
      <div className="mt-10 flex flex-col  items-center shadow-2xl px-4 py-4 bg-gray-700">
        <h1 className="font-sans text-2xl font-bold text-white mb-5">
          CRIAR ENDEREÇO
        </h1>
        <div className="flex">
          <Formik
            validationSchema={schemaEndereco}
            onSubmit={registrarEndereco}
            initialValues={{
              rua: "",
              numero: "",
              complemento: "",
              codigoUF: ""
            }}
          >
            {({ errors, touched, isValid, handleChange, handleBlur }) => (
              <Form className="flex items-end gap-5">
                {/* 1ª C0LUNA */}
                <div >
                  {/* RUA */}
                  <div className="flex flex-col">
                    <div>
                      <p className="text-white font-bold">Rua</p>
                      <Field
                        name="rua"
                        type="text"
                        className=" rounded-lg  appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                      />
                    </div>
                    <span className="spanValidateForm">
                      <ErrorMessage name="rua" />
                    </span>
                  </div>
                  {/* NÚMERO */}
                  <div className="flex flex-col">
                    <div>
                    <p className="text-white font-bold">Número</p>
                      <Field
                        name="numero"
                        type="number"
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

                <div className="flex flex-col">
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
    </div>
  );
};

export default FormRegistroPessoaEndereco;
