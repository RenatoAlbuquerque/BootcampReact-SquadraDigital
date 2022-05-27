import React, { useState, createContext } from "react";
import { api } from "../Services/api";

export const pessoaContext = createContext({});

export const PessoaProvider = ({ children }) => {
  const [modalDetalheEndereco, setModelDetalheEndereco] = useState(false);
  const pegarTodosBairros = async () => {
    try {
      const { data } = await api.get("/bairro");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <pessoaContext.Provider
      value={{
        modalDetalheEndereco,
        setModelDetalheEndereco,
      }}
    >
      {children}
    </pessoaContext.Provider>
  );
};
