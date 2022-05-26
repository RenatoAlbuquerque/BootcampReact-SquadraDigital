import { api } from "../../Services/api";
import { renderUfs } from "../reducers/ufsReducer";
import { renderMunicipios } from "../reducers/municipiosReducer";
import { renderBairros } from "../reducers/bairrosReducer";
import { renderPessoas } from "../reducers/pessoasReducer";

export const pegarTodasUfs = () => {
  return (dispatch) => {
    api
      .get("/uf")
      .then((res) => {
        dispatch(renderUfs(res.data));
      })
      .catch(console.log);
  };
};

export const getAllMunicipios = () => {
  return (dispatch) => {
    api
      .get("/municipio")
      .then((res) => {
        dispatch(renderMunicipios(res.data));
      })
      .catch(console.log);
  };
};

export const getAllBairros = () => {
  return (dispatch) => {
    api
      .get("/bairro")
      .then((res) => {
        dispatch(renderBairros(res.data));
      })
      .catch(console.log);
  };
};

export const getAllPessoas = () => {
  return (dispatch) => {
    api
      .get("/pessoa")
      .then((res) => {
        dispatch(renderPessoas(res.data));
      })
      .catch(console.log);
  };
};
