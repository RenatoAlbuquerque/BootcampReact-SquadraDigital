import { createAction, createReducer } from "@reduxjs/toolkit";
const INITIAL_STATE = [];

export const addBairro = createAction("ADD_BAIRRO");
export const renderBairros = createAction("RENDER_BAIRROS");

export default createReducer(INITIAL_STATE, {
  [addBairro.type]: (state, action) => [...state, action.payload],
  [renderBairros.type]: (state, action) => [action.payload],
});
