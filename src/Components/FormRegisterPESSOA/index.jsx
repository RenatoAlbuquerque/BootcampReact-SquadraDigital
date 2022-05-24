import React from "react";
import "../style.css";
import { Field, Form, Formik, ErrorMessage } from "formik";
import schema from "./registerFormSchema";
import SaveBtn from "../BtnSave";

const FormRegisterPESSOA = () => {
  const handleRegister = async (values, actions) => {
    console.log(values);
  };

  return (
    <div className="mt-4">
      <div className="flex flex-col  items-center shadow-2xl px-4 py-4 bg-gray-700">
        <h1 className="font-sans text-4xl font-bold text-white mb-10">
          CRIAR PESSOA
        </h1>
        <div>
          <Formik
            validationSchema={schema}
            onSubmit={handleRegister}
            initialValues={{
              nome: "",
              sobrenome: "",
              status: "",
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
                  <SaveBtn />
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

export default FormRegisterPESSOA;
