import React, { useState, createContext } from "react";
import {
  listarTodosMunicipios,
  pegarTodasUfs,
} from "../Components/Utils/listaMunicipios";

export const municipioContext = createContext({});

export const MunicipioProvider = ({ children }) => {
  const [listaMunicipiosRenderizada, setListaMunicipiosRenderizada] = useState(
    []
  );
  const [municipioAtual, setMunicipioAtual] = useState();
  const [municipios, setMunicipios] = useState([]);
  const [listaUf, setListaUf] = useState([]);

  const pegarTodosMunicipios = async () => {
    try {
      const municipios = await listarTodosMunicipios();
      setListaMunicipiosRenderizada(municipios);
      setMunicipios(municipios);
      const ufsFiltro = await pegarTodasUfs();
      setListaUf(ufsFiltro);
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
        municipioAtual,
        setMunicipioAtual,
        listaUf,
        municipios,
        setMunicipios,
      }}
    >
      {children}
    </municipioContext.Provider>
  );
};
