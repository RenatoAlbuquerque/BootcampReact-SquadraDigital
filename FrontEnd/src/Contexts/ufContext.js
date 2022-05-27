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
  return (
    <UfContext.Provider
      value={{
        pegarTodasUfs,
        listaUfRenderizada,

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
