import React, { useContext, useEffect } from "react";
import "../style.css";
import { Field, Form, Formik, ErrorMessage } from "formik";
import BtnSalvar from "../BtnSalvar";
import { api } from "../../Services/api";
import { bairroContext } from "../../Contexts/bairroContext";
import { municipioContext } from "../../Contexts/municipioContext";


const FormEditarBairro = () => {
  const {listaMunicipiosRenderizada, pegarTodosMunicipios} = useContext(municipioContext)
  const {bairroAtual, setBairroAtual, pegarTodosBairros} = useContext(bairroContext)
  useEffect(()=> {
    pegarTodosMunicipios()
  },[])

  

  const enviarAlteracaoDeBairro = async (values, actions) => {
    values.codigoMunicipio = parseInt(values.codigoMunicipio)
    values.nome = values.nome.toUpperCase()
    values.status = parseInt(values.status)
    try {
      await api.put('/bairro', {
        codigoMunicipio: bairroAtual.codigoMunicipio,
        codigoBairro: bairroAtual.codigoBairro,
        nome: values.nome,
        status: values.status
      })
      setBairroAtual(null)
      pegarTodosBairros()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {bairroAtual && (
        <div className="mt-4">
          <div className="flex flex-col  items-center shadow-2xl px-4 py-4 bg-gray-700">
            <h1 className="font-sans text-4xl font-bold text-white mb-10">
              EDITAR BAIRRO
            </h1>
            <div>
              <Formik
                onSubmit={enviarAlteracaoDeBairro}
                initialValues={{
                  codigoMunicipio: bairroAtual.codigoMunicipio,
                  nome: bairroAtual.nome,
                  status: bairroAtual.status,
                }}
              >
                {({ errors, touched, isValid, handleChange, handleBlur }) => (
                  <Form className="flex items-end gap-5">
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
                        <p className="text-white font-bold">Município</p>
                        <Field
                          component="select"
                          name="codigoMunicipio"
                          className="cursor-pointer rounded-lg border border-gray-300 w-full py-2.5 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                        >
                          <option>SELECIONE</option>
                          {listaMunicipiosRenderizada ? 
                            listaMunicipiosRenderizada.map((uf)=>(
                              <option 
                              key={uf.codigoMunicipio} 
                              value={parseInt(uf.codigoMunicipio)}
                              >
                                {uf.nome}
                              </option>
                            ))
                          : null}
                        </Field>
                      </div>
                        <span className="spanValidateForm">
                          <ErrorMessage name="codigoMunicipio" />
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
                    <div className="flex flex-col">
                      <BtnSalvar />
                      <span className="spanValidateForm">
                        </span>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormEditarBairro;
