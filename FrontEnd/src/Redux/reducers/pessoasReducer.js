import { createAction, createReducer } from "@reduxjs/toolkit";
const INITIAL_STATE = [];

export const addPessoa = createAction("ADD_PESSOA");
export const renderPessoas = createAction("RENDER_PESSOAS");

export default createReducer(INITIAL_STATE, {
  [addPessoa.type]: (state, action) => [...state, action.payload],
  [renderPessoas.type]: (state, action) => [action.payload],
});
