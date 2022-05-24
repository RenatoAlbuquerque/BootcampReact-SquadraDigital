import { createAction, createReducer } from "@reduxjs/toolkit";
const INITIAL_STATE = [];

export const addMunicipio = createAction("ADD_MUNICIPIO");
export const renderMunicipios = createAction("RENDER_MUNICIPIOS");

export default createReducer(INITIAL_STATE, {
  [addMunicipio.type]: (state, action) => [...state, action.payload],
  [renderMunicipios.type]: (state, action) => [action.payload],
});
