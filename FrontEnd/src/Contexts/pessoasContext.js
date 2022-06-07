import React, { useState, createContext } from "react";
import { api } from "../Services/api";

export const pessoaContext = createContext({});

export const PessoaProvider = ({ children }) => {
  const [modalDetalheEndereco, setModalDetalheEndereco] = useState(false);
  const [listaEnderecos, setListaEnderecos] = useState([]);

  const [listaPessoas, setListaPessoas] = useState([]);
  const [modalDetalhePessoa, setModalDetalhePessoa] = useState(true);

  const listarTodasPessoas = async () => {
    try {
      const { data } = await api.get("/pessoa");
      setListaPessoas(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <pessoaContext.Provider
      value={{
        modalDetalheEndereco,
        setModalDetalheEndereco,
        modalDetalhePessoa,
        setModalDetalhePessoa,

        listaEnderecos,
        setListaEnderecos,

        listarTodasPessoas,
        listaPessoas,
        setListaPessoas,
      }}
    >
      {children}
    </pessoaContext.Provider>
  );
};
