import { createAction, createReducer } from "@reduxjs/toolkit";
const INITIAL_STATE = [];

export const addUf = createAction("ADD_UF");
export const renderUfs = createAction("RENDER_UFS");

export default createReducer(INITIAL_STATE, {
  [addUf.type]: (state, action) => [...state, action.payload],
  [renderUfs.type]: (state, action) => [action.payload],
});
