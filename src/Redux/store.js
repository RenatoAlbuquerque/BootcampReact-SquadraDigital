import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import ufsReducer from "./reducers/ufsReducer";
import municipiosReducer from "./reducers/municipiosReducer";
import bairrosReducer from "./reducers/bairrosReducer";
import pessoasReducer from "./reducers/pessoasReducer";

export default configureStore({
  reducer: {
    ufs: ufsReducer,
    municipios: municipiosReducer,
    bairros: bairrosReducer,
    pessoas: pessoasReducer,
  },
});
