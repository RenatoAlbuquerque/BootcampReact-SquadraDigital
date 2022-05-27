import React, { useState, createContext } from "react";
import { api } from "../Services/api";

export const municipioContext = createContext({});

export const MunicipioProvider = ({ children }) => {
  const [listaMunicipiosRenderizada, setListaMunicipiosRenderizada] = useState(
    []
  );
  const [codigoFormMunicipio, setCodigoFormMunicipio] = useState("");
  const [nomeFormMunicipio, setNomeFormMunicipio] = useState("");
  const [siglaFormMunicipio, setSiglaFormMunicipio] = useState("");
  const [statusFormMunicipio, setStatusFormMunicipio] = useState("");

  const pegarTodosMunicipios = async () => {
    try {
      const { data } = await api.get("/municipio");
      setListaMunicipiosRenderizada(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <municipioContext.Provider
      value={{
        pegarTodosMunicipios,
        listaMunicipiosRenderizada,
        setListaMunicipiosRenderizada,

        codigoFormMunicipio,
        nomeFormMunicipio,
        siglaFormMunicipio,
        statusFormMunicipio,
        setCodigoFormMunicipio,
        setNomeFormMunicipio,
        setSiglaFormMunicipio,
        setStatusFormMunicipio,
      }}
    >
      {children}
    </municipioContext.Provider>
  );
};
