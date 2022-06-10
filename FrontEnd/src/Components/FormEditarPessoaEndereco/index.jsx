import React, { useContext, useEffect, useState } from "react";
import "../style.css";
import { Field, Form, Formik, ErrorMessage } from "formik";
import BtnSalvar from "../BtnSalvar";
import { UfContext } from "../../Contexts/ufContext";
import { api } from "../../Services/api";
import { pessoaContext } from "../../Contexts/pessoasContext"; 
import { useNavigate } from 'react-router-dom';
import FormEditarEndereco from "../FormEditarEndereco";
import schemaEndereco from "./registerFormSchemaEndereco";

const FormEditarPessoaEndereco = () => {
  const {listaUfRenderizada, pegarTodasUfs} = useContext(UfContext)
  const {listaEnderecos, 
    setListaEnderecos, 
    pessoaEditar, 
    enderecoEditar,
    setPessoaEditar } = useContext(pessoaContext)
  const [municipiosSelect, setMunicipiosSelect] = useState([])
  const [bairrosSelect, setBairrosSelect] = useState([])
  const navigate = useNavigate()
  const [msg, setMsg] = useState(false)
  
  useEffect(()=>{
    const infoPessoaEditar = async () => {
      await pegarTodasUfs()
        try {
          const { data } = await api.get(`/pessoa?codigoPessoa=${pessoaEditar.codigoPessoa}`);
          setPessoaEditar(data)
          if(!enderecoEditar){
            setListaEnderecos(data.enderecos)
          }
        } catch (error) {
          console.log(error);
        }
    }
    infoPessoaEditar()
},[])
    
  

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



  const editarPessoa = async (values, { resetForm }) => {
    values.status = parseInt(values.status)
    const alterarListaEnderecoEnvio = listaEnderecos
      const infoEditarPessoa = {
        codigoPessoa: pessoaEditar.codigoPessoa,
        nome: values.nome,
        sobrenome: values.sobrenome,
        idade: values.idade,
        login: values.login,
        senha: values.senha,
        status: values.status,
        enderecos: alterarListaEnderecoEnvio
      }
      try {
          if(!enderecoEditar){
          await api.put("/pessoa",infoEditarPessoa)
          resetForm({ values: ''})
          setPessoaEditar(null)
          navigate('/pessoaslista')
        }else{
          setMsg(true)
        }
      } catch (error) {
        console.log(error);
      }
    
  };

  const registrarEndereco = (values,  { resetForm }) => {
    const [uf] = listaUfRenderizada?.filter((uf) => uf.codigoUF === parseInt(values.codigoUF))
    const [municipio] = municipiosSelect?.filter((municipio) => municipio.codigoMunicipio === parseInt(values.codigoMunicipio))
    const [bairro] = bairrosSelect?.filter((bairro) => bairro.codigoBairro === parseInt(values.codigoBairro))
    const enderecoLista = {
      codigoPessoa: pessoaEditar.codigoPessoa ? pessoaEditar.codigoPessoa : null,
      uf: uf.sigla,
      nomeUf: uf.nome,
      municipio: municipio.nome,
      codigoBairro: parseInt(values.codigoBairro),
      nomeBairro: bairro.nome,
      nomeRua: values.nomeRua.toUpperCase(),
      numero: values.numero,
      complemento: values.complemento.toUpperCase(),
      cep: values.cep
    }

    setListaEnderecos(listaEnderecos => [...listaEnderecos, enderecoLista])
    resetForm({ values: ''})
  };



  return (
    <>
      {pessoaEditar && (
        <div className="mt-4">
      {/* FORM EDITAR PESSOA */}
          <div className="flex flex-col  items-center shadow-2xl px-4 py-4 bg-gray-700">
            <h1 className="font-sans text-4xl font-bold text-white mb-10">
              EDITAR PESSOA
            </h1>
            <div className="flex">
              <Formik
                onSubmit={editarPessoa}
                initialValues={{
                  nome: pessoaEditar.nome,
                  sobrenome: pessoaEditar.sobrenome,
                  status: pessoaEditar.status,
                  login: pessoaEditar.login,
                  senha: pessoaEditar.senha,
                  idade: pessoaEditar.idade,
                  enderecos: pessoaEditar.enderecos
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
      {/* FORM EDITAR / ENDEREÇO */}
        {!enderecoEditar ? (
          <div className="mt-10 flex flex-col  items-center shadow-2xl px-4 py-4 bg-gray-700">
            <h1 className="font-sans text-2xl font-bold text-white mb-5">
              CRIAR ENDEREÇO
            </h1>
            <div className="flex">
              <Formik
                validationSchema={schemaEndereco}
                onSubmit={registrarEndereco}
                initialValues={{
                  nomeRua: "",
                  numero: "",
                  complemento: "",
                  cep: "",
                  codigoUF: ""
                }}
              >
                {() => (
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
        ):(
          <>
            {msg === true ? <p className="font-sans text-center text-lg font-bold text-red-600 mb-5">Para salvar, conclua a alteração do Endereço!!</p> : null}

            <FormEditarEndereco/>
          </>
        )}
        </div>
      )}
    </>
    
  );
};

export default FormEditarPessoaEndereco;
