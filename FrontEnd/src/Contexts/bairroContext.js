import React, { useState, createContext } from "react";
import { api } from "../Services/api";

export const bairroContext = createContext({});

export const BairroProvider = ({ children }) => {
  const [listaBairroRenderizada, setListaBairrosRenderizada] = useState([]);
  const [codigoFormBairro, setCodigoFormBairro] = useState("");
  const [nomeFormBairro, setNomeFormBairro] = useState("");
  const [siglaFormBairro, setSiglaFormBairro] = useState("");
  const [statusFormBairro, setStatusFormBairro] = useState("");

  const pegarTodosBairros = async () => {
    try {
      const { data } = await api.get("/bairro");
      setListaBairrosRenderizada(data);
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

        codigoFormBairro,
        nomeFormBairro,
        siglaFormBairro,
        statusFormBairro,
        setCodigoFormBairro,
        setNomeFormBairro,
        setSiglaFormBairro,
        setStatusFormBairro,
      }}
    >
      {children}
    </bairroContext.Provider>
  );
};
