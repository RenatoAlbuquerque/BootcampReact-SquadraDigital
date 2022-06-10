import React, { useState, createContext } from "react";
import { api } from "../Services/api";

export const pessoaContext = createContext({});

export const PessoaProvider = ({ children }) => {
  const [listaEnderecos, setListaEnderecos] = useState([]);
  const [listaPessoas, setListaPessoas] = useState([]);
  const [modalDetalheEndereco, setModalDetalheEndereco] = useState(false);
  const [modalDetalhePessoa, setModalDetalhePessoa] = useState(false);
  const [pessoaEditar, setPessoaEditar] = useState(null);

  const [enderecoEditar, setEnderecoEditar] = useState(null);
  const [enderecoEditadoAtual, setEnderecoEditadoAtual] = useState(false);

  const [modalEditarEnderecoAtual, setModalEditarenderecoAtual] =
    useState(false);
  const [enderecoEnvio, setEnderecoEnvio] = useState([]);

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

        pessoaEditar,
        setPessoaEditar,

        enderecoEditar,
        setEnderecoEditar,

        modalEditarEnderecoAtual,
        setModalEditarenderecoAtual,

        enderecoEnvio,
        setEnderecoEnvio,

        enderecoEditadoAtual,
        setEnderecoEditadoAtual,
      }}
    >
      {children}
    </pessoaContext.Provider>
  );
};
