import React, { useState, createContext } from "react";
import {
  listarTodosBairros,
  pegarTodosMunicipios,
} from "../Components/Utils/listaBairro";

export const bairroContext = createContext({});

export const BairroProvider = ({ children }) => {
  const [listaBairroRenderizada, setListaBairrosRenderizada] = useState([]);
  const [bairroAtual, setBairroAtual] = useState();
  const [bairros, setBairros] = useState([]);
  const [listaMunicipios, setListaMunicipios] = useState([]);

  const pegarTodosBairros = async () => {
    try {
      const bairros = await listarTodosBairros();
      setListaBairrosRenderizada(bairros);
      setBairros(bairros);
      const municipiosFiltro = await pegarTodosMunicipios();
      setListaMunicipios(municipiosFiltro);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <bairroContext.Provider
      value={{
        pegarTodosBairros,
        listaBairroRenderizada,
        setListaBairrosRenderizada,
        bairroAtual,
        setBairroAtual,
        bairros,
        setBairros,
        listaMunicipios,
        setListaMunicipios,
      }}
    >
      {children}
    </bairroContext.Provider>
  );
};
