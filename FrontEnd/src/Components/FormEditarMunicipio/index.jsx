import React, { useContext, useEffect } from "react";
import "../style.css";
import { Field, Form, Formik, ErrorMessage } from "formik";
import schema from "./registerFormSchema";
import BtnSalvar from "../BtnSalvar";
import { api } from "../../Services/api";
import { UfContext } from "../../Contexts/ufContext";
import { municipioContext } from "../../Contexts/municipioContext";

const FormEditarMunicipio = () => {
  const {pegarTodasUfs, listaUfRenderizada} = useContext(UfContext)
  const {municipioAtual, setMunicipioAtual, pegarTodosMunicipios} = useContext(municipioContext)
  
  useEffect(()=> {
    pegarTodasUfs()
  },[])

  const enviarRegistroDeMunicipio = async (values, actions) => {
    values.codigoUF = parseInt(values.codigoUF)
    values.nome = values.nome.toUpperCase()
    values.status = parseInt(values.status)
    try {
      await api.put('/municipio', {
        codigoUF: municipioAtual.codigoUF,
        codigoMunicipio: municipioAtual.codigoMunicipio,
        nome: values.nome,
        status: values.status
      })
      setMunicipioAtual(null)
      pegarTodosMunicipios()
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      {municipioAtual && (
        <div className="mt-4">
          <div className="flex flex-col  items-center shadow-2xl px-4 py-4 bg-gray-700">
            <h1 className="font-sans text-4xl font-bold text-white mb-10">
              EDITAR MUNICÍPIO
            </h1>
            <div>
              <Formik
                validationSchema={schema}
                onSubmit={enviarRegistroDeMunicipio}
                initialValues={{
                  codigoUF: municipioAtual.codigoUF,
                  nome: municipioAtual.nome,
                  status: municipioAtual.status,
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
                        <p className="text-white font-bold">UF</p>
                        <Field
                          component="select"
                          name="codigoUF"
                          className="cursor-pointer rounded-lg border border-gray-300 w-full py-2.5 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                        >
                          <option>SELECIONE</option>
                          {listaUfRenderizada ? 
                            listaUfRenderizada.map((uf)=>(
                              <option 
                              key={uf.codigoUF} 
                              value={parseInt(uf.codigoUF)}
                              >
                                {uf.nome}
                              </option>
                            ))
                          : null}
                        </Field>
                      </div>
                        <span className="spanValidateForm">
                          <ErrorMessage name="idUF" />
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
                      <BtnSalvar type="submit"/>
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

export default FormEditarMunicipio;
