import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageUf from "../Pages/PageUf";
import PageMun from "../Pages/PageMun";
import PageBai from "../Pages/PageBai";

const Rotas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<PageUf />} />
        <Route path="/municipio" element={<PageMun />} />
        <Route path="/bairro" element={<PageBai />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Rotas;
