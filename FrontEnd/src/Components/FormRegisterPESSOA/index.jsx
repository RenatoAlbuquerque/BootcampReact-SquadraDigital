import React from "react";
import "../style.css";
import { Field, Form, Formik, ErrorMessage } from "formik";
import schema from "./registerFormSchema";
import BtnSalvar from "../BtnSalvar";

const FormRegisterPESSOA = () => {
  const registrarPessoa = async (values, actions) => {
    values.status = parseInt(values.status)
    console.log(values);
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
            validationSchema={schema}
            onSubmit={registrarPessoa}
            initialValues={{
              nome: "",
              sobrenome: "",
              status: "",
              login: "",
              senha: "",
              idade: 0,
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
                  <BtnSalvar />
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
            // onSubmit={handleRegister}
            initialValues={{
              rua: "",
              numero: "",
              complemento: "",
            }}
          >
            {({ errors, touched, isValid, handleChange, handleBlur }) => (
              <Form className="flex items-end gap-5">
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

                <div>
                  <div className="flex flex-col">
                    <div>
                    <p className="text-white font-bold">UF</p>
                    <Field
                      component="select"
                      name="uf"
                      className="cursor-pointer rounded-lg border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                    >
                      <option>SELECIONE</option>
                      <option value={1}>ATIVADO</option>
                      <option value={2}>DESATIVADO</option>
                    </Field>
                    </div>
                    <span className="spanValidateForm">
                      <ErrorMessage name="login" />
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <div>
                    <p className="text-white font-bold">Município</p>
                    <Field
                      component="select"
                      name="municipio"
                      className="cursor-pointer rounded-lg border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                    >
                      <option>SELECIONE</option>
                      <option value={1}>ATIVADO</option>
                      <option value={2}>DESATIVADO</option>
                    </Field>
                    </div>
                    <span className="spanValidateForm">
                      <ErrorMessage name="municipio" />
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <div>
                    <p className="text-white font-bold">Bairro</p>
                    <Field
                      component="select"
                      name="bairro"
                      className="cursor-pointer rounded-lg border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                    >
                      <option>SELECIONE</option>
                      <option value={1}>ATIVADO</option>
                      <option value={2}>DESATIVADO</option>
                    </Field>
                    </div>
                    <span className="spanValidateForm">
                      <ErrorMessage name="login" />
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
      {/* FORM LISTA DE ENDEREÇOS */}
    </div>
  );
};

export default FormRegisterPESSOA;
