import React, { useState, createContext, useEffect } from "react";
import { api } from "../Services/api";

export const UfContext = createContext({});

export const UfProvider = ({ children }) => {
  const [listaUfRenderizada, setListaUfRenderizada] = useState([]);
  const [codigoFormUf, setCodigoFormUf] = useState("");
  const [nomeFormUf, setNomeFormUf] = useState("");
  const [siglaFormUf, setSiglaFormUf] = useState("");
  const [statusFormUf, setStatusFormUf] = useState("");

  const pegarTodasUfs = async () => {
    try {
      const { data } = await api.get("/uf");
      setListaUfRenderizada(data);
    } catch (error) {
      console.log(error);
    }
  };

  const pesquisarComParametrosSiglaNomeCodigoUF = async (pesquisaUf) => {
    const filtroPesquisa = pesquisaUf.toUpperCase();
    const filtroNumero = isNaN(filtroPesquisa);
    try {
      if (filtroNumero === false) {
        const { data } = await api.get(`/uf?codigoUF=${filtroPesquisa}`);
        setListaUfRenderizada([data]);
      } else {
        if (filtroPesquisa.length === 2) {
          const { data } = await api.get(`/uf?sigla=${filtroPesquisa}`);
          setListaUfRenderizada([data]);
        } else {
          const { data } = await api.get(`/uf?nome=${filtroPesquisa}`);
          setListaUfRenderizada([data]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const pesquisarPorStatus = async (status) => {
    try {
      if (status) {
        const { data } = await api.get(`/uf?status=${status}`);
        setListaUfRenderizada(data);
      }
      if (status === 0) {
        pegarTodasUfs();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UfContext.Provider
      value={{
        pegarTodasUfs,
        listaUfRenderizada,

        pesquisarComParametrosSiglaNomeCodigoUF,
        pesquisarPorStatus,

        codigoFormUf,
        nomeFormUf,
        siglaFormUf,
        statusFormUf,
        setCodigoFormUf,
        setNomeFormUf,
        setSiglaFormUf,
        setStatusFormUf,
      }}
    >
      {children}
    </UfContext.Provider>
  );
};
