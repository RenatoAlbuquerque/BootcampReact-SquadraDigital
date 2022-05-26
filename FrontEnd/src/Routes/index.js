import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageUf from "../Pages/PagUf";
import PagMunicipio from "../Pages/PagMunicipio";
import PagBairro from "../Pages/PagBairro";
import PagPessoa from "../Pages/PagPessoa";

const Rotas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<PageUf />} />
        <Route path="/municipio" element={<PagMunicipio />} />
        <Route path="/bairro" element={<PagBairro />} />
        <Route path="/pessoa" element={<PagPessoa />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Rotas;
